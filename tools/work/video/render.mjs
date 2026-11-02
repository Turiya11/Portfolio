// Renders the interaction videos in scenes.mjs: real screens + a scripted pointer, drawn frame by frame in Chrome,
// then encoded to H.264 by encode.swift. Needs the site running on :4175 (see README).
// Run: node render.mjs            every scene
//      node render.mjs kg-query   only the scenes whose id starts with this
import { spawn, execFileSync } from "node:child_process"
import { mkdirSync, mkdtempSync, readdirSync, rmSync, writeFileSync, copyFileSync, existsSync, statSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { fileURLToPath } from "node:url"
import { scenes } from "./scenes.mjs"

const here = (p) => fileURLToPath(new URL(p, import.meta.url))
const FPS = 30
const only = process.argv[2]
const list = scenes.filter((s) => !only || s.id.startsWith(only))
const outDir = here("../../../assets/video/work/")
mkdirSync(outDir, { recursive: true })

if (!existsSync(here(".encode"))) execFileSync("swiftc", ["-O", here("encode.swift"), "-o", here(".encode")], { stdio: "inherit" })

const chrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
const port = 9300 + Math.floor(Math.random() * 400)
const proc = spawn(chrome, ["--headless=new", `--remote-debugging-port=${port}`, `--user-data-dir=${mkdtempSync(join(tmpdir(), "render-"))}`, "--hide-scrollbars", "about:blank"], { stdio: "ignore" })
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

let target
for (let i = 0; i < 60 && !target; i++) {
    await sleep(150)
    try {
        target = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find((t) => t.type === "page")
    } catch {}
}
const ws = new WebSocket(target.webSocketDebuggerUrl)
await new Promise((r) => (ws.onopen = r))
let id = 0
const pending = new Map()
ws.onmessage = (e) => {
    const m = JSON.parse(e.data)
    if (m.id && pending.has(m.id)) pending.get(m.id)(m)
}
const send = (method, params = {}) =>
    new Promise((res, rej) => {
        const i = ++id
        pending.set(i, (m) => (m.error ? rej(new Error(m.error.message)) : res(m.result)))
        ws.send(JSON.stringify({ id: i, method, params }))
    })
const evalJs = async (expression) => {
    const r = await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true })
    if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text)
    return r.result.value
}

await send("Page.enable")

for (const scene of list) {
    const started = Date.now()
    await send("Emulation.setDeviceMetricsOverride", { width: scene.W, height: scene.H, deviceScaleFactor: 1, mobile: false })
    // a fresh page per scene: a long batch on one page can lose the stage partway through
    await send("Page.navigate", { url: "http://localhost:4175/tools/work/video/stage.html" })
    await sleep(800)
    const duration = await evalJs(`loadScene(${JSON.stringify(scene)})`)
    const frames = Math.ceil(duration * FPS)
    const dir = here(`.frames/${scene.id}/`)
    rmSync(dir, { recursive: true, force: true })
    mkdirSync(dir, { recursive: true })
    for (let f = 0; f < frames; f++) {
        await evalJs(`seek(${f / FPS})`)
        const { data } = await send("Page.captureScreenshot", { format: "jpeg", quality: 92 })
        writeFileSync(join(dir, String(f).padStart(5, "0") + ".jpg"), Buffer.from(data, "base64"))
    }
    const out = join(outDir, scene.id + ".mp4")
    execFileSync(here(".encode"), [dir, out, String(FPS), String(scene.bitrate)], { stdio: "ignore" })
    copyFileSync(join(dir, "00000.jpg"), join(outDir, scene.id + ".jpg"))
    rmSync(dir, { recursive: true, force: true })
    console.log(`${scene.id}  ${duration.toFixed(1)}s  ${(statSync(out).size / 1e6).toFixed(2)}MB  (${((Date.now() - started) / 1000).toFixed(0)}s)`)
}
ws.close()
proc.kill()
rmSync(here(".frames"), { recursive: true, force: true })
// AVAssetWriter can leave sandbox temp copies next to the output
for (const f of readdirSync(outDir)) if (f.includes(".sb-")) rmSync(join(outDir, f))
