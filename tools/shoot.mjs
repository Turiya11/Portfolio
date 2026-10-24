// Dev helper: drive headless Chrome over the DevTools protocol (no installs) to take
// screenshots with a real mouse hover.
// Usage: node tools/shoot.mjs <url> <out-prefix> [width] [height] [step...]
//   step: "hover:<css selector>" | "wait:<ms>" | "shot:<name>" | "js:<expression>"
import { spawn } from "node:child_process"
import { writeFileSync, mkdtempSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"

const [url, prefix, w = "1440", h = "900", ...steps] = process.argv.slice(2)
const chrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
const port = 9300 + Math.floor(Math.random() * 400)
const proc = spawn(chrome, [
    "--headless=new",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${mkdtempSync(join(tmpdir(), "shoot-"))}`,
    `--window-size=${w},${h}`,
    "--hide-scrollbars",
    "about:blank",
])
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

let target
for (let i = 0; i < 50 && !target; i++) {
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
    new Promise((res) => {
        const i = ++id
        pending.set(i, (m) => res(m.result))
        ws.send(JSON.stringify({ id: i, method, params }))
    })
const evalJs = async (expr) => (await send("Runtime.evaluate", { expression: expr, awaitPromise: true, returnByValue: true }))?.result?.value

await send("Emulation.setDeviceMetricsOverride", { width: +w, height: +h, deviceScaleFactor: 1, mobile: +w < 700 })
await send("Page.enable")
await send("Page.navigate", { url })
await sleep(2500)

for (const step of steps) {
    const [kind, ...rest] = step.split(":")
    const arg = rest.join(":")
    if (kind === "wait") await sleep(+arg)
    if (kind === "js") console.log(arg, "=>", JSON.stringify(await evalJs(arg)))
    if (kind === "hover") {
        const p = await evalJs(`(()=>{const b=document.querySelector(${JSON.stringify(arg)}).getBoundingClientRect();return [b.left+b.width/2,b.top+b.height/2]})()`)
        await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: p[0], y: p[1] })
    }
    if (kind === "shot") {
        const { data } = await send("Page.captureScreenshot", { format: "png" })
        const file = `${prefix}-${arg}.png`
        writeFileSync(file, Buffer.from(data, "base64"))
        console.log("saved", file)
    }
}
ws.close()
proc.kill()
