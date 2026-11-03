// "About": the archive. A filing drawer you scroll through: each glass folder slides up over the last,
// and the older tabs stay in a row at the top so you can flip back.
// Edit the content below. `photo`, `image` and `cover` are image paths or links.
import { butterflyArt } from "./butterflies.js"

const CONTENT = {
    eyebrow: "about me",
    heading: "The archive",
    intro: "I'm Turiya, a product designer in Pune. The case studies are up there. This is the rest of it: the song on repeat, the films and shows I rewatch and the paintings I've made.",
    hint: "scroll to flip through",
    card: [
        ["Collection", "Turiya Joshi"],
        ["Kept in", "Pune, India"],
        ["Fuelled by", "chai"],
        ["Condition", "slightly sentimental"],
    ],
    // {words} get a highlighter stroke; {words|sunset} also make that sticker jump when you point at them
    hello: {
        title: "Hello world!",
        photo: "assets/images/about/turiya.webp",
        alt: "Turiya, smiling, in a pink sleeveless top",
        lead: "I'm a User Experience Design student with a passion for understanding people and solving meaningful problems through thoughtful design.",
        work: "My work spans the UX process—from {research} and {ideation} to {prototyping} and {usability testing}—with a focus on creating intuitive digital experiences that truly connect with users.",
        beyond: "Beyond design, you'll often find me chasing {sunsets|sunset}, {starry skies|stars}, getting my hands messy with {pottery|pot}, or {painting|palette} whenever inspiration strikes.",
        belief: "I believe creativity isn't confined to a screen—it's something that shapes the way I observe, empathize, and design.",
    },
    // parked until the real moments are ready (see FOLDERS).
    // date is yyyy-mm-dd. sticker: heart | star | sun | flower. `link` (optional) makes the note a door to somewhere
    moments: [
        { date: "2023-06-01", sticker: "star", title: "My first real brief", text: "Playful posters for the Texol canteen. They're still up in the factory.", note: "someone still reads these!", link: ["Where it started", "#journey"] },
        { date: "2024-01-14", sticker: "heart", title: "[A day you never want to forget]", text: "[Two lines: where you were, who was there, why it stayed with you.]", note: "[a little note to yourself]" },
        { date: "2025-02-03", sticker: "sun", title: "Started at Encora", text: "Designing biomedical data views that clinicians could read at a glance.", note: "data, but make it kind", link: ["Read the case study", "work/encora/"] },
        { date: "2025-08-21", sticker: "flower", title: "[Another top moment]", text: "[A trip, a person, a win, a very good chai.]", note: "[a little note to yourself]" },
        { date: "2026-03-02", sticker: "star", title: "Joined SSK Technologies", text: "2000+ ITSM screens for 3TFlow, end to end. The biggest thing I've worked on so far.", note: "2000 screens!!", link: ["See 3TFlow", "work/3tflow/"] },
    ],
    // src plays Apple's 30-second preview, and `link` goes to the whole song. Without a src, a little stand-in tune plays so the record still works
    song: {
        title: "Fool",
        artist: "Djo",
        year: "2022",
        note: "I love the quirky vibe of it",
        src: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/a5/dc/20/a5dc2035-8ef5-de2c-12d7-ae34fcfe8130/mzaf_838732338826686117.plus.aac.p.m4a",
        cover: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/9d/58/bb/9d58bb3a-c6b5-4c3d-fbba-50872d2712f4/5056494917336.jpg/600x600bb.jpg",
        link: ["Hear the whole song", "https://music.apple.com/us/album/fool/1632447652?i=1632447908"],
    },
    // `seen` (a number, drawn as tally marks) and `note` are optional. Posters load from TMDB
    films: [
        { title: "The Office", kind: "Show", by: "Greg Daniels", year: "2005–2013", poster: "https://image.tmdb.org/t/p/w500/7DJKHzAi83BmQrWLrYYOqcoKfhR.jpg" },
        { title: "The Big Bang Theory", kind: "Show", by: "Chuck Lorre & Bill Prady", year: "2007–2019", poster: "https://image.tmdb.org/t/p/w500/euKFiO5M125rpngFRBbSW83beeI.jpg" },
        { title: "Jerry Maguire", kind: "Film", by: "Cameron Crowe", year: "1996", poster: "https://image.tmdb.org/t/p/w500/lABvGN7fDk5ifnwZoxij6G96t2w.jpg" },
        { title: "The Holiday", kind: "Film", by: "Nancy Meyers", year: "2006", poster: "https://image.tmdb.org/t/p/w500/h1ITOpvJN3Tw4Sy60w2QTfYMvdd.jpg" },
        { title: "The Truman Show", kind: "Film", by: "Peter Weir", year: "1998", poster: "https://image.tmdb.org/t/p/w500/vuza0WqY239yBXOadKlGwJsZJFE.jpg" },
        { title: "People We Meet on Vacation", kind: "Film", by: "Brett Haley", year: "2026", poster: "https://image.tmdb.org/t/p/w500/peG6482ALJQ9Tbvv2P38BquVk0f.jpg" },
        { title: "La La Land", kind: "Film", by: "Damien Chazelle", year: "2016", poster: "https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg" },
    ],
    // my own work. `w` and `h` keep each picture's shape; `wide` lets it take a full row on phones
    instagram: "slyyarts",
    paintings: [
        { image: "assets/images/about/paintings/reading.webp", w: 792, h: 1108, alt: "A girl seen from behind in a blue shirt and jeans, with a red bag, reading a yellow book" },
        { image: "assets/images/about/paintings/temple-dusk.webp", w: 1224, h: 1002, wide: true, alt: "A temple tower and its reflection in still water under a stormy orange sunset" },
        { image: "assets/images/about/paintings/looking-away.webp", w: 776, h: 1044, alt: "A charcoal sketch of a woman with long dark hair, turned away, hands clasped behind her" },
        { image: "assets/images/about/paintings/live-wires.webp", w: 1166, h: 1172, alt: "An ink drawing of an electric pole and its tangled wires against yellow watercolour clouds" },
        { image: "assets/images/about/paintings/ankle-deep.webp", w: 1054, h: 1182, alt: "A watercolour of a little girl in a white dress standing in the waves" },
    ],
}

// to bring the calendar back, add this folder to the list (and renumber the TJ·00n labels):
// { id: "ab-moments", tab: "moments", no: "TJ·001", title: "Days I kept", hint: "tap a circled day", tint: "#ffb9c9" },
const FOLDERS = [
    { id: "ab-hello", tab: "hello", no: "TJ·001", title: CONTENT.hello.title, hint: "nice to meet you", tint: "#ffb9c9", titleInBody: true },
    { id: "ab-repeat", tab: "on repeat", no: "TJ·002", title: "On repeat", hint: "drop the needle", tint: "#8f7bea" },
    { id: "ab-films", tab: "on rewatch", no: "TJ·003", title: "Films and shows I rewatch", hint: "drag the strip", tint: "#7cc2f6" },
    { id: "ab-wall", tab: "the wall", no: "TJ·004", title: "On my wall", hint: "step closer to any of them", tint: "#ffd2a8" },
]

const TAPE = ["#f5c518", "#ff9eb5", "#7cc2f6", "#c4e727", "#b9a8ff"]
const clamp = (v, a, b) => Math.min(b, Math.max(a, v))
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c])
const root = document.getElementById("about")
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches

/* ------------------------------ drawn stand-ins (and doodles) ------------------------------ */

const STICKER = {
    heart: `<path d="M12 20.5C5.5 15.8 3 12.6 3 9a4.7 4.7 0 0 1 9-1.9A4.7 4.7 0 0 1 21 9c0 3.600-2.500 6.800-9 11.500Z" fill="#ff9eb5"/>`,
    star: `<path d="m12 3 2.700 5.800 6.300.8-4.600 4.300 1.200 6.200-5.600-3.100-5.600 3.100 1.200-6.200L3 9.600l6.300-.8Z" fill="#f5c518"/>`,
    sun: `<circle cx="12" cy="12" r="4.600" fill="#ffb27a"/><path d="M12 2.500v3M12 18.500v3M2.500 12h3M18.500 12h3M5.300 5.300l2.100 2.100M16.600 16.600l2.100 2.100M18.700 5.300l-2.100 2.100M7.400 16.600l-2.100 2.100" stroke="#ffb27a" stroke-width="2" stroke-linecap="round" fill="none"/>`,
    flower: `<g fill="#b9a8ff"><circle cx="12" cy="6.500" r="3.700"/><circle cx="17.500" cy="11" r="3.700"/><circle cx="15.300" cy="17.300" r="3.700"/><circle cx="8.700" cy="17.300" r="3.700"/><circle cx="6.500" cy="11" r="3.700"/></g><circle cx="12" cy="12.500" r="2.600" fill="#f5c518"/>`,
}
const sticker = (k) => `<svg class="ab-sticker" viewBox="0 0 24 24" aria-hidden="true">${STICKER[k] || STICKER.star}</svg>`

// a wobbly hand-drawn ring; pathLength lets CSS draw it in
const RING = `<svg class="ab-ring" viewBox="0 0 48 48" aria-hidden="true"><path pathLength="1" d="M26 5C15 3.500 5 10.500 4.500 23c-.5 12 9 20.500 20.500 20 11-.5 19-9 18.500-20C43 12 35 4.500 22 6"/></svg>`

// rewatches as pencil tally marks
const tally = (n) => {
    let d = ""
    let x = 2
    for (let i = 1; i <= n; i++) {
        if (i % 5 === 0) {
            d += `M${x - 25} 19 ${x - 1} 3`
            x += 7
        } else {
            d += `M${x} ${2 + (i % 2)} ${x + (i % 3) - 1} 20`
            x += 6
        }
    }
    return `<svg class="ab-tally" width="${x}" height="22" viewBox="0 0 ${x} 22" role="img" aria-label="seen ${n} times"><path d="${d}"/></svg>`
}

const tape = (i, rot = -4) => `<span class="ab-tape" style="--tape:${TAPE[i % TAPE.length]};--rot:${rot}deg" aria-hidden="true"></span>`

// the cut-outs stuck around the photo in Hello world!
const CUTOUT = {
    wireframe: `<svg viewBox="0 0 130 150"><rect x="14" y="6" width="78" height="138" rx="13" fill="#1d1932"/><rect x="20" y="13" width="66" height="124" rx="8" fill="#fff"/><rect x="28" y="23" width="50" height="34" rx="4" fill="#d7cff3"/><path d="m28 57 15-17 11 11 9-8 15 14" fill="#8f7bea"/><circle cx="66" cy="33" r="4" fill="#fff"/><path d="M28 68h50M28 77h34" stroke="#b9b5cc" stroke-width="4" stroke-linecap="round"/><rect x="28" y="88" width="23" height="23" rx="4" fill="#ff9eb5"/><rect x="55" y="88" width="23" height="23" rx="4" fill="#bbdafe"/><rect x="28" y="118" width="50" height="11" rx="5.500" fill="#5a46c6"/><g transform="rotate(9 96 92)"><path d="M70 66h52v46l-11 11H70Z" fill="#f5c518"/><path d="M122 112h-11v11Z" fill="#c99c05"/><path d="M78 78c9-3 19 3 34-1M78 90c9-3 16 3 30-1M78 102c6-2 10 1 18 0" fill="none" stroke="#6b5206" stroke-width="2.200" stroke-linecap="round"/></g></svg>`,
    sunset: `<svg viewBox="0 0 120 150"><defs><linearGradient id="ab-dusk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a46c6"/><stop offset=".42" stop-color="#ff7fa3"/><stop offset=".72" stop-color="#ffb27a"/></linearGradient></defs><path d="M8 142V60a52 52 0 0 1 104 0v82Z" fill="url(#ab-dusk)"/><circle cx="60" cy="92" r="23" fill="#fff0b8"/><path d="M8 94h104v48H8Z" fill="#3a2f8f"/><path d="M36 104h48M44 114h32M28 124h30M72 126h22" stroke="#ffc48a" stroke-width="4" stroke-linecap="round"/><path d="M26 44c5-5 9-5 13-1 4-4 8-4 12 0M72 30c4-4 7-4 10-1 3-3 6-3 9 0" fill="none" stroke="#1d1932" stroke-width="2.400" stroke-linecap="round"/></svg>`,
    stars: `<svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="56" fill="#27306f"/><path d="M78 26a30 30 0 1 0 18 44 25 25 0 0 1-18-44Z" fill="#f5c518"/><g fill="#fff0b8"><path d="m28 22 3 8 8 3-8 3-3 8-3-8-8-3 8-3Z"/><path d="m92 80 2.500 6 6 2.500-6 2.500-2.500 6-2.500-6-6-2.500 6-2.500Z"/><path d="m34 80 2 5 5 2-5 2-2 5-2-5-5-2 5-2Z"/></g><g fill="#fff"><circle cx="58" cy="18" r="1.800"/><circle cx="96" cy="50" r="1.800"/><circle cx="16" cy="58" r="1.600"/><circle cx="62" cy="100" r="2"/><circle cx="44" cy="44" r="1.500"/></g></svg>`,
    pot: `<svg viewBox="0 0 130 140"><ellipse cx="65" cy="124" rx="56" ry="13" fill="#8a86a8"/><ellipse cx="65" cy="120" rx="56" ry="13" fill="#c9c6dc"/><path d="M46 22h38c-2 9 1 15 8 24 11 15 13 32 6 48-4 10-11 18-17 24H49c-6-6-13-14-17-24-7-16-5-33 6-48 7-9 10-15 8-24Z" fill="#d9825b"/><path d="M33 66c11-7 20 6 32 0s21-7 32 0c2 9 2 18-1 27-11-6-20 6-31 1s-21-7-31-1c-3-9-3-18-1-27Z" fill="#fff0b8"/><path d="M41 72l5 8M56 72l5 8M71 70l5 8M85 72l5 8" stroke="#d9825b" stroke-width="3" stroke-linecap="round"/><ellipse cx="65" cy="22" rx="19" ry="5" fill="#a85a39"/><path d="M84 40c5 8 13 14 15 28 1 8-5 8-6 1-2-11-8-17-13-25Z" fill="#a85a39" opacity=".55"/></svg>`,
    palette: `<svg viewBox="0 0 150 120"><path fill-rule="evenodd" d="M70 8c38-3 72 18 72 50 0 22-20 26-35 25-13-1-20 5-17 15 3 11-9 17-24 15C32 109 6 88 8 58 10 30 36 11 70 8Zm-34 62a11 9 0 1 0 0 18 11 9 0 1 0 0-18Z" fill="#edcfa6"/><circle cx="46" cy="42" r="10" fill="#ff7fa3"/><circle cx="76" cy="28" r="10" fill="#f5c518"/><circle cx="107" cy="36" r="10" fill="#7cc2f6"/><circle cx="122" cy="62" r="9" fill="#5a46c6"/><circle cx="72" cy="66" r="9" fill="#9ccf3b"/><g transform="rotate(38 80 70)"><rect x="76" y="-4" width="8" height="74" rx="4" fill="#1d1932"/><rect x="75" y="70" width="10" height="11" fill="#b9b5cc"/><path d="M75 81h10c2 11-1 19-5 25-4-6-7-14-5-25Z" fill="#ff7fa3"/></g></svg>`,
}
const cutout = (k, r, d) => `<span class="ab-cut ab-cut--${k}" data-cut="${k}" style="--r:${r}deg;--d:${d}s" aria-hidden="true">${CUTOUT[k]}</span>`
const said = (s) => esc(s).replace(/\{([^}|]+)(?:\|([^}]+))?\}/g, (_, words, k) => `<span class="ab-said${k ? ` ab-said--${k}` : ""}"${k ? ` data-for="${k}"` : ""}>${words}</span>`)

/* ------------------------------ the folders ------------------------------ */

const DAYS = ["M", "T", "W", "T", "F", "S", "S"]
const parse = (s) => {
    const [y, m, d] = s.split("-").map(Number)
    return { y, m: m - 1, d, month: new Date(y, m - 1, d).toLocaleDateString("en-GB", { month: "long" }), full: new Date(y, m - 1, d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) }
}

const insta = (cls) => `<a class="${cls}" href="https://www.instagram.com/${esc(CONTENT.instagram)}/" target="_blank" rel="noopener">all by me. more at <b>@${esc(CONTENT.instagram)}</b></a>`

const hello = () => {
    const h = CONTENT.hello
    return `
  <div class="ab-hello">
    <h3 class="ab-hello__title" id="ab-hello-t">${esc(h.title)}</h3>
    <div class="ab-hello__frame">
      <span class="ab-hello__sky" aria-hidden="true"></span>
      <i class="ab-hello__line ab-hello__line--t"></i><i class="ab-hello__line ab-hello__line--b"></i><i class="ab-hello__line ab-hello__line--l"></i><i class="ab-hello__line ab-hello__line--r"></i>
      <span class="ab-hello__me"><img src="${esc(h.photo)}" alt="${esc(h.alt)}" width="1100" height="1061" /></span>
      ${cutout("wireframe", -9, 0.15)}
      ${cutout("pot", 5, 0.75)}
    </div>
    <div class="ab-hello__cell ab-hello__cell--lead"><span class="ab-hello__no" aria-hidden="true">(01)</span><p>${said(h.lead)}</p></div>
    <div class="ab-hello__cell ab-hello__cell--work"><span class="ab-hello__no" aria-hidden="true">(02)</span><p>${said(h.work)}</p></div>
    <div class="ab-hello__cell ab-hello__cell--beyond"><span class="ab-hello__no" aria-hidden="true">(03)</span><p>${said(h.beyond)}</p></div>
    <div class="ab-hello__loves">
      ${cutout("sunset", -7, 0.3)}
      ${cutout("stars", 9, 0.45)}
      ${cutout("palette", -5, 0.6)}
    </div>
    <div class="ab-hello__cell ab-hello__cell--belief"><span class="ab-hello__no" aria-hidden="true">(04)</span><p>${said(h.belief)}</p></div>
  </div>`
}

const moments = () => `
  <div class="ab-cal-wrap">
    <div class="ab-cal" aria-label="Calendar of top moments">
      <div class="ab-cal__rings" aria-hidden="true">${"<i></i>".repeat(9)}</div>
      <div class="ab-cal__pile" aria-hidden="true"></div>
      <div class="ab-cal__page"></div>
    </div>
    <div class="ab-cal__nav">
      <button class="ab-arrow" type="button" data-step="-1" aria-label="Earlier moment">${arrow(-1)}</button>
      <p class="ab-cal__count" aria-live="polite"></p>
      <button class="ab-arrow" type="button" data-step="1" aria-label="Later moment">${arrow(1)}</button>
    </div>
  </div>
  <svg class="ab-thread" aria-hidden="true"><path/></svg>
  <div class="ab-note"></div>`

function arrow(dir) {
    return `<svg viewBox="0 0 34 20" width="30" height="18" aria-hidden="true"><path d="${dir > 0 ? "M2 11c9-2 19-2 29-1M23 3c3 3 5 5 8 7-3 2-6 4-8 7" : "M32 11c-9-2-19-2-29-1M11 3c-3 3-5 5-8 7 3 2 6 4 8 7"}"/></svg>`
}

const repeat = () => {
    const s = CONTENT.song
    return `
  <div class="ab-deck">
    <div class="ab-deck__plinth">
      <div class="ab-platter">
        <button class="ab-vinyl" type="button" aria-label="Play or pause the record, or drag it to scratch">
          <span class="ab-vinyl__disc"><span class="ab-vinyl__label"><b>${esc(s.artist)}</b><i></i></span></span>
          <span class="ab-vinyl__sheen" aria-hidden="true"></span>
        </button>
      </div>
      <svg class="ab-arm" viewBox="0 0 120 320" aria-hidden="true">
        <circle cx="86" cy="42" r="30" class="ab-arm__base"/>
        <circle cx="86" cy="42" r="13" class="ab-arm__pin"/>
        <path class="ab-arm__rod" d="M86 42 88 218c0 14-7 24-22 36"/>
        <path class="ab-arm__rod2" d="M86 42 88 218c0 14-7 24-22 36"/>
        <path class="ab-arm__head" d="m72 240-22 25 12 11 24-24Z"/>
        <path class="ab-arm__weight" d="M78 8h17v16H78Z"/>
      </svg>
      <span class="ab-deck__light" aria-hidden="true"></span>
      <button class="ab-play" type="button" aria-pressed="false" aria-label="Play ${esc(s.title)}">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path class="i-play" d="M8 5.500c0-1 1-1.500 1.900-1l9 5.800c.8.500.8 1.800 0 2.300l-9 5.800c-.9.500-1.900 0-1.900-1Z"/><path class="i-pause" d="M7 5h3.400v14H7ZM13.600 5H17v14h-3.400Z"/></svg>
      </button>
      <span class="ab-notes" aria-hidden="true"><i>♪</i><i>♫</i><i>♪</i></span>
    </div>
    <p class="ab-scrawl ab-scrawl--deck" aria-hidden="true">
      <svg viewBox="0 0 70 50" width="62" height="44"><path d="M4 8c20-6 44 4 56 32M50 34c4 3 7 5 10 7 1-4 2-7 2-11"/></svg>
      press play. grab the record to scratch it
    </p>
  </div>
  <div class="ab-sleeve-wrap">
    <div class="ab-sleeve">
      ${tape(0, -6)}
      <div class="ab-sleeve__art">${s.cover ? `<img src="${esc(s.cover)}" alt="" loading="lazy" />` : `<svg viewBox="0 0 200 200" aria-hidden="true"><rect width="200" height="200" fill="#e7e4ef"/>${[[64, 56, 52], [140, 28, 44], [122, 92, 36], [58, 134, 62], [150, 170, 50]].map(([x, y, r]) => [1, 0.76, 0.52, 0.28].map((k) => `<circle cx="${x}" cy="${y}" r="${r * k}" fill="#3e62ad" opacity=".42"/>`).join("")).join("")}</svg>`}</div>
    </div>
    <div class="ab-track">
      <p class="ab-mono">Now in the archive · ${esc(s.year)}</p>
      <h4>${esc(s.title)}</h4>
      <p class="ab-track__by">${esc(s.artist)}</p>
      <div class="ab-track__bar" aria-hidden="true"><span></span></div>
      <p class="ab-mono ab-track__time">0:00</p>
      <p class="ab-hand">${esc(s.note)}</p>
      ${s.link ? `<a class="ab-link" href="${esc(s.link[1])}" target="_blank" rel="noopener">${esc(s.link[0])} <span aria-hidden="true">→</span></a>` : ""}
    </div>
  </div>`
}

const films = () => `
  <div class="ab-strip" tabindex="0" role="listbox" aria-label="Films and shows I rewatch, use left and right arrows">
    <div class="ab-strip__reel">
      ${CONTENT.films
          .map(
              (f, i) => `<button class="ab-frame-film" type="button" role="option" aria-selected="false" aria-label="${esc(f.title)}" data-i="${i}">
              <span class="ab-frame-film__art"><img src="${esc(f.poster)}" alt="${esc(f.title)} poster" loading="lazy" draggable="false" /></span>
            </button>`
          )
          .join("")}
    </div>
  </div>
  <div class="ab-ticket-row">
    <div class="ab-ticket"></div>
    <div class="ab-film-nav">
      <button class="ab-arrow" type="button" data-step="-1" aria-label="Previous one">${arrow(-1)}</button>
      <button class="ab-arrow" type="button" data-step="1" aria-label="Next one">${arrow(1)}</button>
    </div>
  </div>
  <p class="ab-mono ab-credit">Posters from <a href="https://www.themoviedb.org/" target="_blank" rel="noopener">TMDB</a></p>`

const wall = () => `
  <div class="ab-wall">
    ${CONTENT.paintings
        .map(
            (p, i) => `<figure class="ab-piece${p.wide ? " ab-piece--wide" : ""}" style="--i:${i}">
            <span class="ab-piece__beam" aria-hidden="true"></span>
            <span class="ab-piece__wire" aria-hidden="true"></span>
            <button class="ab-piece__frame" type="button" data-i="${i}" aria-haspopup="dialog" aria-label="View this painting closer: ${esc(p.alt)}">
              <span class="ab-piece__art" style="aspect-ratio:${p.w} / ${p.h}"><img src="${esc(p.image)}" alt="${esc(p.alt)}" width="${p.w}" height="${p.h}" loading="lazy" /></span>
              <span class="ab-piece__glare" aria-hidden="true"></span>
            </button>
          </figure>`
        )
        .join("")}
    <svg class="ab-bench" viewBox="0 0 180 60" aria-hidden="true"><path d="M6 20c56-3 112-3 168 0-1 3-1 6 0 9-56 2-112 2-168 0 1-3 1-6 0-9ZM26 29l-6 28M154 29l6 28M36 29l-3 19M144 29l3 19"/></svg>
    <span class="ab-floor" aria-hidden="true"></span>
    ${insta("ab-insta")}
  </div>`

const BODIES = { hello, moments, repeat, films, wall }

function render() {
    root.innerHTML = `
      <svg width="0" height="0" style="position:absolute" aria-hidden="true">
        <filter id="ab-pencil"><feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" seed="4"/><feDisplacementMap in="SourceGraphic" scale="5"/></filter>
      </svg>
      <div class="ab-sky" aria-hidden="true">
        <i></i><i></i><i></i>
        ${[1, 3, 5].map((k, i) => `<span style="--img:url(../assets/images/cloud-${k}.webp);left:${[4, 58, 26][i]}%;top:${[8, 34, 68][i]}%;width:${[420, 360, 480][i]}px"></span>`).join("")}
      </div>
      <header class="ab-head">
        <div class="ab-head__copy">
          <p class="ab-eyebrow">${esc(CONTENT.eyebrow)}</p>
          <h2 id="about-title">${esc(CONTENT.heading)}</h2>
          <p class="ab-intro">${esc(CONTENT.intro)}</p>
          <p class="ab-scrawl ab-scrawl--down">
            ${esc(CONTENT.hint)}
            <svg viewBox="0 0 60 70" width="44" height="52" aria-hidden="true"><path pathLength="1" d="M34 3C10 16 6 36 28 40c14 2 16-12 4-14-12-1-16 16-6 40M16 56c3 4 6 8 10 11 3-3 7-7 10-12"/></svg>
          </p>
        </div>
        <dl class="ab-card">
          ${tape(1, 5)}
          <p class="ab-card__no">Accession card · TJ·000</p>
          ${CONTENT.card.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}
        </dl>
      </header>
      <div class="ab-drawer">
        ${FOLDERS.map((f, i) => {
            const key = f.id.slice(3)
            return `<span class="ab-anchor" id="${f.id}"></span>
          <article class="ab-folder ab-folder--${key}" style="--i:${i};--tint:${f.tint};--n:${FOLDERS.length}" aria-labelledby="${f.id}-t">
            <div class="ab-folder__glass"></div>
            <svg class="ab-folder__pencil" aria-hidden="true"><path class="ab-edge"/><path class="ab-ink"/></svg>
            <a class="ab-tab" href="#${f.id}"><span class="ab-mono">0${i + 1}</span> ${esc(f.tab)}${key === "repeat" ? `<span class="ab-tab__eq" aria-hidden="true"><i></i><i></i><i></i></span>` : ""}</a>
            <div class="ab-folder__in">
              <header class="ab-folder__head">
                <p class="ab-mono">${esc(f.no)}</p>
                ${f.titleInBody ? "" : `<h3 id="${f.id}-t">${esc(f.title)}</h3>`}
                <p class="ab-hand">${esc(f.hint)}</p>
              </header>
              <div class="ab-body ab-body--${key}">${BODIES[key]()}</div>
            </div>
          </article>`
        }).join("")}
      </div>
      <dialog class="pj-dialog ab-lightbox" aria-label="Painting, up close">
        <button class="pj-dialog__close" type="button" aria-label="Close">×</button>
        <div class="ab-lightbox__body"></div>
      </dialog>`
    // a butterfly has settled on the middle frame
    root.querySelector(".ab-piece:nth-of-type(3) .ab-piece__wire").insertAdjacentHTML("afterend", `<span class="ab-perch" aria-hidden="true">${butterflyArt(30, 20, { flap: 2.6 })}</span>`)
}

render()

/* ------------------------------ the drawer: one glass shape with its tab, a pencil line around it, sticky stacking ------------------------------ */

const STICK = 72 // clears the fixed nav
const TAB_H = 42
const PEEK = 62 // how much of the next folder's tab shows at the bottom of the screen
const folders = [...root.querySelectorAll(".ab-folder")]
const anchors = [...root.querySelectorAll(".ab-anchor")]

// folder outline: rounded body, with the tab rising out of the top edge at x..x+w
function outline(W, H, x, w, t = TAB_H, r = 26) {
    const c = 14 // curve into and out of the tab
    const top = t
    return [
        `M0 ${top + r}`,
        x <= r ? `L0 ${top + r}` : `Q0 ${top} ${r} ${top} L${x - c} ${top}`,
        x <= r ? `C0 ${top * 0.5} 0 ${r * 0.4} ${r} 0` : `C${x} ${top} ${x} 0 ${x + c} 0`,
        `L${x + w - c} 0`,
        `C${x + w} 0 ${x + w} ${top} ${x + w + c} ${top}`,
        `L${W - r} ${top} Q${W} ${top} ${W} ${top + r}`,
        `L${W} ${H - r} Q${W} ${H} ${W - r} ${H}`,
        `L${r} ${H} Q0 ${H} 0 ${H - r} Z`,
    ].join(" ")
}

function layoutDrawer() {
    const vh = innerHeight
    const mobile = innerWidth < 900
    folders.forEach((f) => (f.style.minHeight = ""))
    // every folder the same height, so the one behind never pokes out below
    const want = mobile ? 0 : clamp(vh - STICK - PEEK, 520, 880)
    const natural = Math.max(...folders.map((f) => f.offsetHeight))
    const height = mobile ? 0 : Math.max(want, natural)
    folders.forEach((f, i) => {
        if (height) f.style.minHeight = `${height}px`
        const H = f.offsetHeight
        const W = f.offsetWidth
        // a folder taller than the screen scrolls to its bottom edge first, then sticks
        f.style.setProperty("--stick", `${Math.min(STICK, vh - H - 14)}px`)
        const tab = f.querySelector(".ab-tab")
        const d = outline(W, H, tab.offsetLeft, tab.offsetWidth)
        f.querySelector(".ab-folder__glass").style.clipPath = `path("${d}")`
        const svg = f.querySelector(".ab-folder__pencil")
        svg.setAttribute("width", W)
        svg.setAttribute("height", H)
        svg.setAttribute("viewBox", `0 0 ${W} ${H}`)
        svg.querySelectorAll("path").forEach((p) => p.setAttribute("d", d))
        anchors[i].style.scrollMarginTop = `${STICK}px` // a tab always lands on the top of its folder
    })
    onScroll()
    drawThread()
}

// as the next folder slides over, the one beneath sinks back and fades, so only the sky shows through at rest
let scrollRaf = 0
function onScroll() {
    scrollRaf = 0
    const vh = innerHeight
    let active = 0
    folders.forEach((f, i) => {
        const r = f.getBoundingClientRect()
        if (r.top < vh * 0.55) active = i
        // 0 while the next folder is below the screen, 1 once it has reached its stick point
        const next = folders[i + 1]
        const stop = next ? parseFloat(next.style.getPropertyValue("--stick")) : 0
        const cover = next ? clamp(1 - (next.getBoundingClientRect().top - stop) / (vh - stop), 0, 1) : 0
        f.style.setProperty("--cover", cover.toFixed(3))
        f.classList.toggle("is-buried", cover >= 1)
        if (r.top < vh * 0.72) f.classList.add("is-in")
    })
    if (root.dataset.at !== String(active)) {
        root.dataset.at = active
        folders.forEach((f, i) => f.classList.toggle("is-current", i === active))
    }
}
addEventListener("scroll", () => (scrollRaf ||= requestAnimationFrame(onScroll)), { passive: true })

root.addEventListener("click", (e) => {
    const tab = e.target.closest(".ab-tab")
    if (!tab) return
    e.preventDefault()
    document.querySelector(tab.getAttribute("href")).scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" })
})

/* ------------------------------ hello: point at a word and its sticker jumps ------------------------------ */

const helloEl = root.querySelector(".ab-hello")
const jump = (e, on) => {
    const k = e.target.closest?.("[data-for]")?.dataset.for
    if (k) helloEl.querySelector(`[data-cut="${k}"]`).classList.toggle("is-said", on)
}
helloEl.addEventListener("pointerover", (e) => jump(e, true))
helloEl.addEventListener("pointerout", (e) => jump(e, false))

/* ------------------------------ the calendar (parked: only runs while its folder is in FOLDERS) ------------------------------ */

const calPage = root.querySelector(".ab-cal__page")
const note = root.querySelector(".ab-note")
const count = root.querySelector(".ab-cal__count")
const thread = root.querySelector(".ab-thread")
const kept = CONTENT.moments.map((m) => ({ ...m, ...parse(m.date) }))
let at = kept.length - 1
let tearing = 0

function monthGrid(m) {
    const lead = (new Date(m.y, m.m, 1).getDay() + 6) % 7 // Monday first
    const total = new Date(m.y, m.m + 1, 0).getDate()
    const marks = kept.filter((k) => k.y === m.y && k.m === m.m)
    let cells = `<span></span>`.repeat(lead)
    for (let d = 1; d <= total; d++) {
        const hit = marks.find((k) => k.d === d)
        cells += hit
            ? `<button class="ab-day is-kept" type="button" data-i="${kept.indexOf(hit)}" aria-label="${esc(hit.full)}: ${esc(hit.title)}"><span>${d}</span>${RING}${sticker(hit.sticker)}</button>`
            : `<span class="ab-day">${d}</span>`
    }
    return `
      <div class="ab-cal__top"><h4>${esc(m.month)}</h4><p class="ab-mono">${m.y}</p></div>
      <div class="ab-cal__dow" aria-hidden="true">${DAYS.map((d) => `<span>${d}</span>`).join("")}</div>
      <div class="ab-cal__grid">${cells}</div>`
}

function showNote(m) {
    note.classList.remove("is-on")
    void note.offsetWidth
    note.innerHTML = `
      <div class="ab-polaroid">
        ${tape(at + 1, -7)}
        <div class="ab-polaroid__art">${m.photo ? `<img src="${esc(m.photo)}" alt="" loading="lazy" />` : `<svg viewBox="0 0 24 24" aria-hidden="true">${STICKER[m.sticker]}</svg>`}</div>
        <p class="ab-hand">${esc(m.note)}</p>
      </div>
      <div class="ab-note__text">
        <p class="ab-mono">${esc(m.full)}</p>
        <h4>${esc(m.title)}</h4>
        <p>${esc(m.text)}</p>
        ${m.link ? `<a class="ab-link" href="${esc(m.link[1])}">${esc(m.link[0])} <span aria-hidden="true">→</span></a>` : ""}
      </div>`
    note.classList.add("is-on")
}

function setMoment(i, instant) {
    const prev = kept[at]
    at = (i + kept.length) % kept.length
    const m = kept[at]
    count.textContent = `kept day ${at + 1} of ${kept.length}`
    showNote(m)
    const sameMonth = prev.y === m.y && prev.m === m.m
    if (instant || sameMonth || reduced) {
        calPage.innerHTML = monthGrid(m)
        calPage.querySelector(`[data-i="${at}"]`)?.classList.add("is-open")
        drawThread()
        return
    }
    // tear off the page: an old copy flips up over the rings while the new month waits underneath
    clearTimeout(tearing)
    calPage.parentElement.querySelectorAll(".ab-cal__torn").forEach((n) => n.remove())
    const torn = calPage.cloneNode(true)
    torn.className = "ab-cal__page ab-cal__torn"
    torn.setAttribute("aria-hidden", "true")
    calPage.parentElement.append(torn)
    calPage.innerHTML = monthGrid(m)
    thread.classList.remove("is-on")
    tearing = setTimeout(() => {
        torn.remove()
        calPage.querySelector(`[data-i="${at}"]`)?.classList.add("is-open")
        drawThread()
    }, 620)
}

// a dashed pencil line from the circled day to the polaroid
function drawThread() {
    if (!calPage) return
    const day = calPage.querySelector(`.ab-day[data-i="${at}"]`)
    const pic = note.querySelector(".ab-polaroid")
    if (!day || !pic || innerWidth < 900) return thread.classList.remove("is-on")
    const box = thread.parentElement.getBoundingClientRect()
    const a = day.getBoundingClientRect()
    const b = pic.getBoundingClientRect()
    const x1 = a.right - box.left + 2
    const y1 = a.top + a.height / 2 - box.top
    const x2 = b.left - box.left - 6
    const y2 = b.top + b.height * 0.35 - box.top
    thread.setAttribute("width", box.width)
    thread.setAttribute("height", box.height)
    // leaves the ring upwards, loops over the page, lands on the polaroid
    thread.firstElementChild.setAttribute("d", `M${x1} ${y1 - 8}C${x1 + 60} ${y1 - 120} ${x2 - 110} ${y2 - 120} ${x2} ${y2}`)
    thread.classList.add("is-on")
}

if (calPage) {
    root.querySelector(".ab-body--moments").addEventListener("click", (e) => {
        const day = e.target.closest(".ab-day.is-kept")
        if (day) return setMoment(+day.dataset.i)
        const btn = e.target.closest(".ab-arrow")
        if (btn) setMoment(at + +btn.dataset.step)
    })
    setMoment(at, true)
}

/* ------------------------------ the record player ------------------------------ */

const disc = root.querySelector(".ab-vinyl__disc")
const vinyl = root.querySelector(".ab-vinyl")
const playBtn = root.querySelector(".ab-play")
const deck = root.querySelector(".ab-deck")
const bar = root.querySelector(".ab-track__bar span")
const clock = root.querySelector(".ab-track__time")
const RPM = 200 // degrees a second: 33⅓ rpm
let playing = false
let angle = 0
let speed = 0 // 0..1 of full speed: the platter spins up and winds down
let spinRaf = 0
let lastT = 0
let audio = null
let synth = null
const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`

// stand-in until a real song is added: a soft music-box loop, plus the crackle every record gets
function makeSynth() {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const out = ctx.createGain()
    out.gain.value = 0
    out.connect(ctx.destination)
    // crackle
    const len = ctx.sampleRate * 4
    const buf = ctx.createBuffer(1, len, ctx.sampleRate)
    const data = buf.getChannelData(0)
    for (let i = 0; i < len; i++) data[i] = (Math.random() - 0.5) * 0.012 + (Math.random() < 0.00035 ? (Math.random() - 0.5) * 0.55 : 0)
    const hiss = ctx.createBufferSource()
    hiss.buffer = buf
    hiss.loop = true
    hiss.connect(out)
    hiss.start()
    if (CONTENT.song.src) return { ctx, out, tune: false }
    // tune
    const NOTES = [392, 493.88, 587.33, 659.25, 587.33, 493.88, 440, 523.25, 659.25, 783.99, 659.25, 523.25, 349.23, 440, 523.25, 659.25, 523.25, 440, 392, 493.88, 587.33, 493.88, 392, 293.66]
    const beat = 0.34
    let step = 0
    let next = ctx.currentTime + 0.1
    const tick = () => {
        while (next < ctx.currentTime + 0.5) {
            const f = NOTES[step % NOTES.length]
            const o = ctx.createOscillator()
            const g = ctx.createGain()
            o.type = "sine"
            o.frequency.value = f
            g.gain.setValueAtTime(0.0001, next)
            g.gain.exponentialRampToValueAtTime(0.16, next + 0.012)
            g.gain.exponentialRampToValueAtTime(0.0001, next + 1.3)
            o.connect(g).connect(out)
            o.start(next)
            o.stop(next + 1.35)
            step++
            next += beat
        }
    }
    const timer = setInterval(tick, 120)
    tick()
    return { ctx, out, tune: true, timer, startedAt: ctx.currentTime, loop: NOTES.length * beat }
}

function setPlaying(on) {
    if (on === playing) return
    playing = on
    deck.classList.toggle("is-playing", on)
    root.classList.toggle("is-playing", on)
    playBtn.setAttribute("aria-pressed", String(on))
    playBtn.setAttribute("aria-label", `${on ? "Pause" : "Play"} ${CONTENT.song.title}`)
    if (on) {
        synth ||= makeSynth()
        synth.ctx.resume()
        synth.out.gain.setTargetAtTime(0.7, synth.ctx.currentTime, 0.4)
        if (CONTENT.song.src) {
            audio ||= Object.assign(new Audio(CONTENT.song.src), { loop: true, preservesPitch: false, volume: 0.8 })
            audio.playbackRate = 0.6
            audio.play().catch(() => setPlaying(false))
        }
    } else {
        if (synth) synth.out.gain.setTargetAtTime(0, synth.ctx.currentTime, 0.25)
        setTimeout(() => !playing && synth?.ctx.suspend(), 900)
    }
    if (!spinRaf) (lastT = 0), (spinRaf = requestAnimationFrame(spin))
}

function spin(now) {
    const dt = lastT ? Math.min(0.05, (now - lastT) / 1000) : 0
    lastT = now
    if (!grab) {
        speed += ((playing ? 1 : 0) - speed) * Math.min(1, dt * (playing ? 2.2 : 1.6))
        if (speed < 0.003 && !playing) speed = 0
        angle += RPM * speed * dt
    }
    disc.style.transform = `rotate(${angle.toFixed(2)}deg)`
    if (audio) {
        // the song slides up to pitch as the platter gets going, and sags as it slows
        if (!grab && playing) audio.playbackRate = clamp(0.6 + 0.4 * speed, 0.6, 1)
        if (!playing && speed < 0.3 && !audio.paused) audio.pause()
        if (audio.duration) {
            bar.style.transform = `scaleX(${(audio.currentTime / audio.duration).toFixed(4)})`
            clock.textContent = `${fmt(audio.currentTime)} / ${fmt(audio.duration)}`
        }
    } else if (synth?.tune) {
        const t = (synth.ctx.currentTime - synth.startedAt) % synth.loop
        bar.style.transform = `scaleX(${(t / synth.loop).toFixed(4)})`
        clock.textContent = `${fmt(t)} · stand-in tune`
    }
    spinRaf = playing || speed > 0 || grab ? requestAnimationFrame(spin) : 0
}

// grab the record: drag it round to scratch (a real song seeks with it), or just click to play / pause
let grab = null
vinyl.addEventListener("pointerdown", (e) => {
    const r = vinyl.getBoundingClientRect()
    const cx = r.left + r.width / 2
    const cy = r.top + r.height / 2
    grab = { cx, cy, last: Math.atan2(e.clientY - cy, e.clientX - cx), moved: 0 }
    vinyl.setPointerCapture(e.pointerId)
    if (!spinRaf) (lastT = 0), (spinRaf = requestAnimationFrame(spin))
})
vinyl.addEventListener("pointermove", (e) => {
    if (!grab) return
    const a = Math.atan2(e.clientY - grab.cy, e.clientX - grab.cx)
    let d = a - grab.last
    if (d > Math.PI) d -= Math.PI * 2
    if (d < -Math.PI) d += Math.PI * 2
    grab.last = a
    grab.moved += Math.abs(d)
    angle += (d * 180) / Math.PI
    if (audio?.duration) audio.currentTime = clamp(audio.currentTime + (d / (Math.PI * 2)) * 1.8, 0, audio.duration)
})
const drop = () => {
    if (!grab) return
    const click = grab.moved < 0.06
    grab = null
    if (click) setPlaying(!playing)
}
vinyl.addEventListener("pointerup", drop)
vinyl.addEventListener("pointercancel", () => (grab = null))
vinyl.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        setPlaying(!playing)
    }
})
playBtn.addEventListener("click", () => setPlaying(!playing))

// the song keeps going while you flip through the other folders; it stops when you leave the archive
new IntersectionObserver(([e]) => !e.isIntersecting && setPlaying(false)).observe(root.querySelector(".ab-drawer"))

/* ------------------------------ the film strip ------------------------------ */

const strip = root.querySelector(".ab-strip")
const reel = root.querySelector(".ab-strip__reel")
const frames = [...reel.children]
const ticket = root.querySelector(".ab-ticket")
let film = -1

function setFilm(i, scroll = true) {
    i = clamp(i, 0, frames.length - 1)
    if (i === film) return
    film = i
    frames.forEach((b, k) => {
        b.classList.toggle("is-on", k === i)
        b.setAttribute("aria-selected", String(k === i))
    })
    const f = CONTENT.films[i]
    ticket.innerHTML = `
      <div class="ab-ticket__stub"><p class="ab-mono">Admit one</p><b>${String(i + 1).padStart(2, "0")}</b></div>
      <div class="ab-ticket__main">
        <h4>${esc(f.title)}</h4>
        <p class="ab-ticket__by">${esc(f.kind)} · ${esc(f.by)} · ${esc(f.year)}</p>
        ${f.note ? `<p class="ab-hand">${esc(f.note)}</p>` : ""}
      </div>
      ${f.seen ? `<div class="ab-ticket__seen"><p class="ab-mono">Seen</p>${tally(f.seen)}</div>` : ""}`
    if (scroll) {
        const b = frames[i]
        strip.scrollTo({ left: b.offsetLeft - (strip.clientWidth - b.offsetWidth) / 2, behavior: reduced ? "auto" : "smooth" })
    }
}

// drag with a mouse; touch keeps native scrolling
let drag = null
strip.addEventListener("pointerdown", (e) => {
    if (e.pointerType !== "mouse") return
    drag = { x: e.clientX, left: strip.scrollLeft, moved: 0 }
})
addEventListener("pointermove", (e) => {
    if (!drag) return
    const dx = e.clientX - drag.x
    drag.moved = Math.max(drag.moved, Math.abs(dx))
    if (drag.moved > 4) strip.classList.add("is-dragging")
    strip.scrollLeft = drag.left - dx
})
addEventListener("pointerup", () => {
    if (!drag) return
    setTimeout(() => strip.classList.remove("is-dragging"))
    drag = null
})
strip.addEventListener("click", (e) => {
    if (strip.classList.contains("is-dragging")) return
    const b = e.target.closest(".ab-frame-film")
    if (b) setFilm(+b.dataset.i)
})
strip.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault()
        setFilm(film + (e.key === "ArrowRight" ? 1 : -1))
    }
})
root.querySelector(".ab-film-nav").addEventListener("click", (e) => {
    const btn = e.target.closest(".ab-arrow")
    if (btn) setFilm(film + +btn.dataset.step)
})
// whichever frame is nearest the middle is the one on the ticket
let stripRaf = 0
strip.addEventListener(
    "scroll",
    () => {
        stripRaf ||= requestAnimationFrame(() => {
            stripRaf = 0
            const mid = strip.scrollLeft + strip.clientWidth / 2
            let best = 0
            let gap = Infinity
            frames.forEach((b, i) => {
                const d = Math.abs(b.offsetLeft + b.offsetWidth / 2 - mid)
                if (d < gap) (gap = d), (best = i)
            })
            setFilm(best, false)
        })
    },
    { passive: true }
)

/* ------------------------------ the wall ------------------------------ */

const lightbox = root.querySelector(".ab-lightbox")
const lightboxBody = lightbox.querySelector(".ab-lightbox__body")
let opener = null
const wallEl = root.querySelector(".ab-wall")
wallEl.addEventListener("click", (e) => {
    const frame = e.target.closest(".ab-piece__frame")
    if (!frame) return
    const p = CONTENT.paintings[+frame.dataset.i]
    opener = frame
    lightboxBody.innerHTML = `
      <div class="ab-lightbox__art"><img src="${esc(p.image)}" alt="${esc(p.alt)}" /></div>
      <div class="ab-lightbox__label">
        ${insta("ab-link")}
      </div>`
    lightbox.showModal()
})
lightbox.querySelector(".pj-dialog__close").addEventListener("click", () => lightbox.close())
lightbox.addEventListener("click", (e) => e.target === lightbox && lightbox.close())
lightbox.addEventListener("close", () => {
    lightboxBody.innerHTML = ""
    opener?.focus()
})
// the glare on the picture glass slides with the pointer
if (matchMedia("(hover: hover)").matches && !reduced) {
    wallEl.addEventListener("pointermove", (e) => {
        const frame = e.target.closest(".ab-piece__frame")
        if (!frame) return
        const r = frame.getBoundingClientRect()
        frame.style.setProperty("--gx", `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`)
    })
}

/* ------------------------------ go ------------------------------ */

setFilm(2, false)
function centreStrip() {
    const b = frames[film]
    strip.scrollLeft = b.offsetLeft - (strip.clientWidth - b.offsetWidth) / 2
}
new ResizeObserver(() => {
    layoutDrawer()
    centreStrip()
}).observe(root.querySelector(".ab-drawer"))
let lastH = innerHeight
addEventListener("resize", () => {
    // ignore the small height jumps of mobile browser toolbars
    if (Math.abs(innerHeight - lastH) < 120) return
    lastH = innerHeight
    layoutDrawer()
})
layoutDrawer()
centreStrip()
document.fonts?.ready.then(layoutDrawer)

new IntersectionObserver(
    (entries) => {
        for (const e of entries) if (e.isIntersecting) e.target.classList.add("is-in")
    },
    { threshold: 0.3 }
).observe(root.querySelector(".ab-head"))
