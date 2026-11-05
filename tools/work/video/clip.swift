// Helpers for the real footage (Pip on Quest, explainers), since this machine has no ffmpeg.
// Build: swiftc -O clip.swift -o .clip
// .clip info <video>                             prints duration and size
// .clip stills <video> <outDir> <everySeconds>   writes a JPEG every N seconds (to find clip ranges)
// .clip trim <video> <out.mp4> <start> <duration> trims and re-encodes (web-ready, no audio)
// .clip compress <video> <out.mp4> <bitrate>     re-encodes the video track at a target bitrate, for clips that are too heavy to autoplay
import AVFoundation
import AppKit

let a = CommandLine.arguments
let asset = AVURLAsset(url: URL(fileURLWithPath: a[2]))
let sem = DispatchSemaphore(value: 0)

func secs(_ s: Double) -> CMTime { CMTime(seconds: s, preferredTimescale: 600) }

switch a[1] {
case "info":
    Task {
        let d = try await asset.load(.duration)
        let v = try await asset.loadTracks(withMediaType: .video).first!
        let size = try await v.load(.naturalSize)
        let audio = try await asset.loadTracks(withMediaType: .audio).count
        print(String(format: "%.1fs %dx%d audio:%d", d.seconds, Int(size.width), Int(size.height), audio))
        sem.signal()
    }
    sem.wait()
case "stills":
    let outDir = URL(fileURLWithPath: a[3]); let every = Double(a[4])!
    try FileManager.default.createDirectory(at: outDir, withIntermediateDirectories: true)
    Task {
        let d = try await asset.load(.duration).seconds
        let gen = AVAssetImageGenerator(asset: asset)
        gen.appliesPreferredTrackTransform = true
        gen.maximumSize = CGSize(width: 1600, height: 1600)
        gen.requestedTimeToleranceBefore = .zero
        gen.requestedTimeToleranceAfter = .zero
        var t = 0.0
        while t < d {
            // the last moments of a clip may have no frame; skip them instead of waiting forever
            if let (img, _) = try? await gen.image(at: secs(t)) {
                let rep = NSBitmapImageRep(cgImage: img)
                let data = rep.representation(using: .jpeg, properties: [.compressionFactor: 0.7])!
                try data.write(to: outDir.appendingPathComponent(String(format: "%07.2f.jpg", t)))
            }
            t += every
        }
        sem.signal()
    }
    sem.wait()
case "trim":
    let out = URL(fileURLWithPath: a[3]); let start = Double(a[4])!; let dur = Double(a[5])!
    try? FileManager.default.removeItem(at: out)
    // video only: the clips autoplay muted on the page
    Task {
        let v = try await asset.loadTracks(withMediaType: .video).first!
        let comp = AVMutableComposition()
        let track = comp.addMutableTrack(withMediaType: .video, preferredTrackID: kCMPersistentTrackID_Invalid)!
        try track.insertTimeRange(CMTimeRange(start: secs(start), duration: secs(dur)), of: v, at: .zero)
        track.preferredTransform = try await v.load(.preferredTransform)
        let e2 = AVAssetExportSession(asset: comp, presetName: AVAssetExportPreset1920x1080)!
        e2.outputURL = out
        e2.outputFileType = .mp4
        e2.shouldOptimizeForNetworkUse = true
        await e2.export()
        if e2.status != .completed { fatalError("trim failed: \(String(describing: e2.error))") }
        print("trimmed", out.lastPathComponent)
        sem.signal()
    }
    sem.wait()
case "compress":
    let out = URL(fileURLWithPath: a[3]); let bitrate = Int(a[4])!
    try? FileManager.default.removeItem(at: out)
    Task {
        let v = try await asset.loadTracks(withMediaType: .video).first!
        let size = try await v.load(.naturalSize)
        let reader = try AVAssetReader(asset: asset)
        let output = AVAssetReaderTrackOutput(track: v, outputSettings: [kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA])
        reader.add(output)
        let writer = try AVAssetWriter(outputURL: out, fileType: .mp4)
        writer.shouldOptimizeForNetworkUse = true
        let input = AVAssetWriterInput(mediaType: .video, outputSettings: [
            AVVideoCodecKey: AVVideoCodecType.h264,
            AVVideoWidthKey: Int(size.width),
            AVVideoHeightKey: Int(size.height),
            AVVideoCompressionPropertiesKey: [AVVideoAverageBitRateKey: bitrate, AVVideoProfileLevelKey: AVVideoProfileLevelH264HighAutoLevel],
        ])
        input.expectsMediaDataInRealTime = false
        writer.add(input)
        reader.startReading()
        writer.startWriting()
        writer.startSession(atSourceTime: .zero)
        while let sample = output.copyNextSampleBuffer() {
            while !input.isReadyForMoreMediaData { usleep(2000) }
            input.append(sample)
        }
        input.markAsFinished()
        await writer.finishWriting()
        if writer.status != .completed { fatalError("compress failed: \(String(describing: writer.error))") }
        print("compressed", out.lastPathComponent)
        sem.signal()
    }
    sem.wait()
default:
    fatalError("unknown command")
}
