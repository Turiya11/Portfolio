// Renders the Co-Pilot cockpit demos in cockpit.html (cp-cockpit, cp-ergonomics, cp-emergency) frame by frame in headless Chrome,
// then encodes them with encode.swift, like render.mjs does for the screen scenes. Needs the site running on :4175.
// Run: node cockpit.mjs            all three (cp-cockpit-card is cp-cockpit without captions, for the home card)
//      node cockpit.mjs cp-cockpit only that one
import { spawn, execFileSync } from "node:child_process"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync, copyFileSync, existsSync, statSync, readdirSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { fileURLToPath } from "node:url"

const here = (p) => fileURLToPath(new URL(p, import.meta.url))
const FPS = 30
const ids = ["cp-cockpit", "cp-ergonomics", "cp-emergency", "cp-cockpit-card"].filter((i) => !process.argv[2] || i === process.argv[2])
const outDir = here("../../../assets/video/work/")
if (!existsSync(here(".encode"))) execFileSync("swiftc", ["-O", here("encode.swift"), "-o", here(".encode")], { stdio: "inherit" })

const chrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
const port = 9300 + Math.floor(Math.random() * 400)
const proc = spawn(chrome, ["--headless=new", `--remote-debugging-port=${port}`, `--user-data-dir=${mkdtempSync(join(tmpdir(), "cockpit-"))}`, "--hide-scrollbars", "about:blank"], { stdio: "ignore" })
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
for (const sid of ids) {
    await send("Emulation.setDeviceMetricsOverride", { width: 1600, height: 900, deviceScaleFactor: 1, mobile: false })
    await send("Page.navigate", { url: "http://localhost:4175/tools/work/video/cockpit.html" })
    await sleep(1500)
    const duration = await evalJs(`loadScene(${JSON.stringify(sid)})`)
    const frames = Math.ceil(duration * FPS)
    const dir = here(`.frames/${sid}/`)
    rmSync(dir, { recursive: true, force: true })
    mkdirSync(dir, { recursive: true })
    for (let f = 0; f < frames; f++) {
        await evalJs(`seek(${f / FPS})`)
        const { data } = await send("Page.captureScreenshot", { format: "jpeg", quality: 92 })
        writeFileSync(join(dir, String(f).padStart(5, "0") + ".jpg"), Buffer.from(data, "base64"))
    }
    const out = join(outDir, sid + ".mp4")
    execFileSync(here(".encode"), [dir, out, String(FPS), "3400000"], { stdio: "ignore" })
    copyFileSync(join(dir, "00000.jpg"), join(outDir, sid + ".jpg"))
    console.log(`${sid}  ${duration.toFixed(1)}s  ${(statSync(out).size / 1e6).toFixed(2)}MB`)
}
ws.close()
proc.kill()
rmSync(here(".frames"), { recursive: true, force: true })
for (const f of readdirSync(outDir)) if (f.includes(".sb-")) rmSync(join(outDir, f))
