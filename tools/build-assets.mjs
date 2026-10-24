// Renders tools/build-assets.html in headless Chrome and saves the generated images into assets/.
// Usage (with the dev server running on :4174):  node tools/build-assets.mjs
import { execFileSync } from "node:child_process"
import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { tmpdir } from "node:os"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const chrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

const html = execFileSync(
    chrome,
    [
        "--headless=new",
        "--disable-gpu",
        "--virtual-time-budget=30000",
        `--user-data-dir=${join(tmpdir(), "turiya-asset-chrome")}`,
        "--dump-dom",
        "http://localhost:4174/tools/build-assets.html",
    ],
    { maxBuffer: 1024 * 1024 * 200, stdio: ["ignore", "pipe", "ignore"] }
).toString()

const json = html.match(/<pre id="out">([\s\S]*?)<\/pre>/)?.[1]
if (!json || json === "pending") throw new Error("asset page did not finish")
const out = JSON.parse(json.replace(/&quot;/g, '"').replace(/&amp;/g, "&"))

mkdirSync(join(root, "assets", "images"), { recursive: true })
for (const [name, url] of Object.entries(out)) {
    if (typeof url !== "string") continue
    const buf = Buffer.from(url.split(",")[1], "base64")
    writeFileSync(join(root, "assets", name), buf)
    console.log(`${name}  ${(buf.length / 1024).toFixed(0)} KB`)
}
console.log("window size", out.windowSize)
