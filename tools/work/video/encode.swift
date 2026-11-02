// Encodes a folder of numbered JPEG frames into an H.264 .mp4 that plays in every browser (no ffmpeg on this machine).
// Build: swiftc -O encode.swift -o .encode
// Run:   .encode <framesDir> <out.mp4> <fps> <bitrate>
import AVFoundation
import AppKit

let args = CommandLine.arguments
guard args.count >= 5 else { fatalError("usage: encode <framesDir> <out.mp4> <fps> <bitrate>") }
let dir = URL(fileURLWithPath: args[1])
let out = URL(fileURLWithPath: args[2])
let fps = Int32(args[3])!
let bitrate = Int(args[4])!

let files = try FileManager.default.contentsOfDirectory(at: dir, includingPropertiesForKeys: nil)
    .filter { $0.pathExtension == "jpg" }
    .sorted { $0.lastPathComponent < $1.lastPathComponent }
guard let first = NSImage(contentsOf: files[0])?.representations.first else { fatalError("no frames") }
// H.264 needs even dimensions
let w = first.pixelsWide & ~1
let h = first.pixelsHigh & ~1

try? FileManager.default.removeItem(at: out)
let writer = try AVAssetWriter(outputURL: out, fileType: .mp4)
writer.shouldOptimizeForNetworkUse = true // moov atom first, so the video starts while it downloads
let input = AVAssetWriterInput(mediaType: .video, outputSettings: [
    AVVideoCodecKey: AVVideoCodecType.h264,
    AVVideoWidthKey: w,
    AVVideoHeightKey: h,
    AVVideoCompressionPropertiesKey: [
        AVVideoAverageBitRateKey: bitrate,
        AVVideoProfileLevelKey: AVVideoProfileLevelH264HighAutoLevel,
        AVVideoMaxKeyFrameIntervalKey: Int(fps) * 2,
    ],
])
input.expectsMediaDataInRealTime = false
let adaptor = AVAssetWriterInputPixelBufferAdaptor(assetWriterInput: input, sourcePixelBufferAttributes: [
    kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA,
    kCVPixelBufferWidthKey as String: w,
    kCVPixelBufferHeightKey as String: h,
])
writer.add(input)
writer.startWriting()
writer.startSession(atSourceTime: .zero)

let space = CGColorSpace(name: CGColorSpace.sRGB)!
for (i, file) in files.enumerated() {
    while !input.isReadyForMoreMediaData { usleep(2000) }
    autoreleasepool {
        guard let src = CGImageSourceCreateWithURL(file as CFURL, nil), let img = CGImageSourceCreateImageAtIndex(src, 0, nil) else { fatalError("bad frame \(file)") }
        var pb: CVPixelBuffer?
        CVPixelBufferPoolCreatePixelBuffer(nil, adaptor.pixelBufferPool!, &pb)
        let buf = pb!
        CVPixelBufferLockBaseAddress(buf, [])
        let ctx = CGContext(data: CVPixelBufferGetBaseAddress(buf), width: w, height: h, bitsPerComponent: 8, bytesPerRow: CVPixelBufferGetBytesPerRow(buf), space: space, bitmapInfo: CGImageAlphaInfo.premultipliedFirst.rawValue | CGBitmapInfo.byteOrder32Little.rawValue)!
        ctx.draw(img, in: CGRect(x: 0, y: 0, width: w, height: h))
        CVPixelBufferUnlockBaseAddress(buf, [])
        adaptor.append(buf, withPresentationTime: CMTime(value: CMTimeValue(i), timescale: fps))
    }
}
input.markAsFinished()
let done = DispatchSemaphore(value: 0)
writer.finishWriting { done.signal() }
done.wait()
if writer.status != .completed { fatalError("encode failed: \(String(describing: writer.error))") }
print("encoded \(files.count) frames \(w)x\(h) → \(out.lastPathComponent)")
