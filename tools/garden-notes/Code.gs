// Receives notes from the garden form and adds each one as a row in this Google Sheet.
// Paste this into the sheet's Extensions > Apps Script. Setup steps are in the site's README.
// Anyone can send a note, but only people you share the sheet with can read them.

const MAX_NOTE = 200
const MAX_NAME = 40
const MAX_PER_HOUR = 60 // the web address is public, so this stops a bot from flooding the sheet

function doPost(e) {
    const p = (e && e.parameter) || {}
    if (p.website) return reply(true) // the hidden field only bots fill in: pretend it worked

    const note = clean(p.note, MAX_NOTE)
    if (!note) return reply(false)

    const cache = CacheService.getScriptCache()
    const sent = Number(cache.get("sent")) || 0
    if (sent >= MAX_PER_HOUR) return reply(false)
    cache.put("sent", String(sent + 1), 3600)

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0]
    if (sheet.getLastRow() === 0) {
        sheet.appendRow(["Date", "Note", "Name or company"])
        sheet.setFrozenRows(1)
    }
    sheet.appendRow([new Date(), plainText(note), plainText(clean(p.name, MAX_NAME))])
    return reply(true)
}

const clean = (value, max) => String(value || "").trim().slice(0, max)

// Sheets runs anything starting with these characters as a formula, and a visitor's note must never run.
const plainText = (text) => (/^[=+\-@\t\r]/.test(text) ? `'${text}` : text)

const reply = (ok) => ContentService.createTextOutput(JSON.stringify({ ok })).setMimeType(ContentService.MimeType.JSON)
