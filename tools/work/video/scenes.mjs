// One entry per video on the work pages: real screens from Figma/Framer plus a scripted pointer.
// Every click lands on a real control. Lumi's taps and destinations come from the prototype links in its Figma file.
// Steps: move/click/tap [x, y] in screen pixels · ring [x, y, w, h] hover highlight · hold seconds ·
//        to "shot" next screen · swipe [x0, y0, x1, y1] · z camera zoom (at [x, y] sets its centre) · zoomOut after a screen change.
const SITE = "/assets/images/"
const VIDEO = "/tools/work/video/shots/"

/* ---------------- KG Hub: desktop, 1440 × 960, from the "KG Hub 2026 · Hi-fi" Figma page ---------------- */

const kgShots = {
    a1: SITE + "kg/a1-query.jpg",
    a2: SITE + "kg/a2-results.jpg",
    b1: SITE + "kg/b1-map.jpg",
    b2: SITE + "kg/b2-compare.jpg",
    c1: SITE + "kg/c1-insight.jpg",
    d4: SITE + "kg/d4-collab.jpg",
    d5: SITE + "kg/d5-share.jpg",
}
const kg = (id, first, steps) => ({ id, kind: "desktop", fw: 1440, fh: 960, W: 1440, H: 960, bitrate: 2400000, accent: "#6B3FD4", shots: kgShots, first, steps })

const kgScenes = [
    kg("kg-query", "a1", [
        { move: [500, 396], z: 1.2, ring: [69, 370, 862, 53], hold: 0.8 },
        { move: [597, 603], ring: [542, 589, 110, 28], hold: 0.5 },
        { move: [603, 655], ring: [543, 641, 139, 28], hold: 0.5 },
        { move: [1351, 563], at: [1100, 563], z: 1.2, ring: [1333, 548, 36, 30], hold: 0.5 },
        { click: [1220, 862], ring: [1029, 842, 383, 40], hold: 0.35, to: "a2", zoomOut: true },
    ]),
    kg("kg-graph", "a2", [
        { move: [480, 466], z: 1.3, at: [520, 420], ring: [448, 434, 64, 64], round: true, hold: 0.6 },
        { move: [360, 366], ring: [330, 336, 60, 60], round: true, hold: 0.5 },
        { move: [320, 266], ring: [296, 242, 48, 48], round: true, hold: 0.5 },
        { move: [1354, 368], z: 1.12, at: [1100, 368], ring: [1101, 268, 319, 130], hold: 0.45 },
        { click: [1354, 368], to: "b1", zoomOut: true },
    ]),
    kg("kg-paths", "b1", [
        { move: [160, 575], z: 1.2, at: [300, 600], ring: [20, 521, 279, 103], hold: 0.7 },
        { move: [160, 693], ring: [20, 640, 279, 102], hold: 0.5 },
        { move: [800, 456], z: 1.2, at: [780, 460], ring: [774, 446, 52, 20], hold: 0.6 },
        { move: [1250, 260], at: [1100, 300], z: 1.2, ring: [1081, 224, 339, 72], hold: 0.7 },
        { click: [849, 90], z: 1, ring: [785, 74, 127, 33], hold: 0.3, to: "b2" },
    ]),
    kg("kg-compare", "b2", [
        { move: [200, 215], z: 1.12, at: [400, 300], ring: [24, 160, 340, 110], hold: 0.55 },
        { move: [550, 215], ring: [380, 160, 340, 110], hold: 0.55 },
        { move: [905, 215], ring: [736, 160, 340, 110], hold: 0.55 },
        { move: [425, 421], z: 1.2, at: [600, 460], ring: [392, 388, 66, 66], round: true, hold: 0.5 },
        { move: [959, 421], ring: [926, 388, 66, 66], round: true, hold: 0.5 },
        { move: [1020, 790], z: 1.15, at: [800, 720], ring: [24, 766, 1052, 48], hold: 0.8 },
        { click: [1270, 866], ring: [1121, 846, 299, 40], hold: 0.3 },
    ]),
    kg("kg-save", "a2", [
        { move: [998, 148], z: 1.15, at: [950, 220], ring: [940, 132, 116, 32], hold: 0.4 },
        { click: [998, 148], to: "c1", zoomOut: true },
        { move: [720, 178], ring: [408, 156, 624, 44], hold: 0.6 },
        { move: [523, 408], z: 1.2, at: [700, 430], ring: [423, 353, 200, 109], hold: 0.6 },
        { move: [417, 532], ring: [408, 520, 624, 26], hold: 0.5 },
        { click: [972, 874], z: 1.15, at: [720, 760], ring: [913, 854, 119, 40], hold: 0.3 },
    ]),
    kg("kg-collab", "d4", [
        { move: [418, 212], z: 1.15, at: [420, 330], ring: [371, 196, 97, 31], hold: 0.45 },
        { move: [157, 347], ring: [141, 331, 32, 32], round: true, hold: 0.5 },
        { move: [1260, 320], z: 1.2, at: [1150, 400], ring: [1101, 252, 319, 313], hold: 0.8 },
        { move: [1154, 533], ring: [1117, 517, 77, 33], hold: 0.45 },
        { click: [1378, 100], z: 1, ring: [1340, 80, 76, 40], hold: 0.3, to: "d5" },
        { move: [600, 263], z: 1.15, at: [720, 400], ring: [468, 243, 294, 40], hold: 0.5 },
        { click: [935, 263], ring: [898, 243, 74, 40], hold: 0.3 },
    ]),
    // the whole journey in one pass, for the top of the page
    kg("kg-journey", "a1", [
        { move: [500, 396], ring: [69, 370, 862, 53], hold: 0.5 },
        { click: [1220, 862], ring: [1029, 842, 383, 40], hold: 0.25, to: "a2" },
        { click: [1354, 368], ring: [1101, 268, 319, 130], hold: 0.35, to: "b1" },
        { move: [160, 693], ring: [20, 640, 279, 102], hold: 0.35 },
        { click: [849, 90], ring: [785, 74, 127, 33], hold: 0.25, to: "b2" },
        { move: [550, 215], ring: [380, 160, 340, 110], hold: 0.45 },
        { click: [1346, 100], ring: [1278, 80, 138, 39], hold: 0.25, to: "c1" },
        { click: [972, 874], ring: [913, 854, 119, 40], hold: 0.25, to: "d4" },
        { move: [1260, 320], ring: [1101, 252, 319, 313], hold: 0.6 },
    ]),
]

/* ---------------- Dentigo: desktop, the screen area of the Framer mockups (mockup art is cropped away) ---------------- */

const dgShots = Object.fromEntries(["dashboard", "browse", "order", "compare", "active", "viewer"].map((k) => [k, VIDEO + `dentigo/${k}.png`]))
// positions below are read off the 2000 px wide mockup, then moved into the cropped screen
const CROP = [238, 44, 1524, 986]
const dp = (x, y) => [x - CROP[0], y - CROP[1]]
const dr = (x, y, w, h) => [x - CROP[0], y - CROP[1], w, h]
const dg = (id, first, steps) => ({ id, kind: "desktop", fw: 1524, fh: 986, W: 1524, H: 986, crop: CROP, imgW: 2000, bitrate: 2400000, accent: "#366D49", shots: dgShots, first, steps })

const dgScenes = [
    dg("dg-hub", "dashboard", [
        { move: dp(710, 420), z: 1.15, at: dp(800, 450), ring: dr(505, 300, 425, 275), hold: 0.7 },
        { move: dp(1165, 470), ring: dr(946, 300, 427, 275), hold: 0.6 },
        { move: dp(885, 636), at: dp(800, 700), z: 1.15, ring: dr(528, 622, 378, 26), hold: 0.5 },
        { click: dp(1280, 713), z: 1.2, at: dp(1160, 680), ring: dr(1210, 695, 143, 36), hold: 0.3, to: "browse", zoomOut: true },
    ]),
    dg("dg-labs", "browse", [
        { move: dp(665, 545), z: 1.12, at: dp(900, 520), ring: dr(536, 438, 257, 212), hold: 0.65 },
        { move: dp(965, 545), ring: dr(838, 438, 257, 212), hold: 0.65 },
        { move: dp(847, 912), at: dp(1000, 850), z: 1.1, ring: dr(748, 866, 199, 94), hold: 0.5 },
        { click: dp(1640, 237), z: 1, ring: dr(1548, 214, 184, 47), hold: 0.3, to: "compare" },
    ]),
    dg("dg-order", "order", [
        { move: dp(1550, 450), z: 1.25, at: dp(1300, 480), ring: dr(1404, 390, 297, 120), hold: 0.8 },
        { move: dp(1553, 330), ring: dr(1404, 308, 297, 44), hold: 0.5 },
        { click: dp(1555, 867), at: dp(1300, 760), z: 1.25, ring: dr(1404, 838, 302, 60), hold: 0.35 },
        { move: dp(735, 864), at: dp(820, 760), z: 1.2, ring: dr(583, 846, 302, 32), hold: 0.6 },
        { move: dp(735, 476), at: dp(820, 480), z: 1.2, ring: dr(583, 459, 302, 31), hold: 0.5 },
    ]),
    dg("dg-compare", "compare", [
        { move: dp(720, 473), z: 1.15, at: dp(1000, 500), ring: dr(570, 456, 300, 36), hold: 0.55 },
        { move: dp(1118, 477), ring: dr(968, 460, 300, 36), hold: 0.5 },
        { move: dp(1516, 477), ring: dr(1367, 460, 300, 36), hold: 0.5 },
        { move: dp(720, 680), at: dp(900, 700), z: 1.2, ring: dr(570, 636, 300, 94), hold: 0.7 },
        { move: dp(720, 830), ring: dr(570, 782, 300, 72), hold: 0.5 },
        { click: dp(372, 476), z: 1, ring: dr(289, 455, 166, 42), hold: 0.3, to: "active" },
    ]),
    dg("dg-track", "active", [
        { click: dp(743, 503), z: 1.12, at: dp(1000, 560), ring: dr(660, 482, 168, 44), hold: 0.4 },
        { move: dp(775, 745), z: 1.25, at: dp(900, 720), ring: dr(527, 738, 558, 14), hold: 0.6 },
        { move: dp(590, 691), ring: dr(527, 678, 121, 26), hold: 0.5 },
        { move: dp(1430, 745), at: dp(1300, 720), z: 1.25, ring: dr(1151, 738, 558, 14), hold: 0.5 },
        { click: dp(903, 920), z: 1.2, at: dp(900, 800), ring: dr(833, 903, 140, 36), hold: 0.3, to: "viewer", zoomOut: true },
    ]),
    dg("dg-viewer", "viewer", [
        { move: dp(1115, 227), z: 1.15, at: dp(1200, 340), ring: dr(1042, 207, 147, 40), hold: 0.5 },
        { move: dp(1263, 227), ring: dr(1204, 207, 120, 40), hold: 0.45 },
        { move: dp(1000, 640), z: 1.2, at: dp(1100, 640), hold: 0.5 },
        { move: dp(1540, 612), at: dp(1300, 640), z: 1.25, ring: dr(1442, 580, 198, 66), hold: 0.8 },
        { move: dp(1540, 815), ring: dr(1442, 787, 198, 62), hold: 0.6 },
        { move: dp(1540, 888), ring: dr(1442, 860, 198, 62), hold: 0.5 },
    ]),
]

/* ---------------- Lumi: phone, 412 × 917, tap targets from the Figma prototype links ---------------- */

const lmShots = Object.fromEntries(
    "role notdiag home tired chk1 chk2 chkres journal shared partner whatdo feeling flowers flowers2 say say2 family affirm learn1 learn2 calls".split(" ").map((k) => [k, VIDEO + `lumi/${k}.png`])
)
const lm = (id, first, steps) => ({ id, kind: "phone", fw: 412, fh: 917, W: 618, H: 1376, bitrate: 1700000, accent: "#E2798D", start: [206, 620], shots: lmShots, first, steps, tail: 1.1 })

const lmScenes = [
    lm("lm-role", "role", [{ wait: 0.5 }, { tap: [209, 434], to: "notdiag" }, { wait: 0.7 }, { tap: [209, 832], to: "home" }]),
    lm("lm-mood", "home", [{ wait: 0.5 }, { swipe: [310, 240, 110, 240], to: "tired" }, { ring: [24, 373, 360, 220], hold: 1.1 }]),
    lm("lm-check", "chk1", [{ wait: 0.4 }, { tap: [204, 633], to: "chk2" }, { wait: 0.5 }, { tap: [204, 561], to: "chkres" }, { wait: 0.3 }, { ring: [48, 528, 315, 44], hold: 1 }]),
    lm("lm-journal", "journal", [{ ring: [58, 330, 295, 47], hold: 0.9 }, { tap: [310, 159], to: "shared" }, { wait: 0.2 }, { ring: [26, 164, 360, 116], hold: 1.1 }]),
    lm("lm-partner", "partner", [{ wait: 0.3 }, { ring: [24, 122, 364, 172], hold: 0.9 }, { tap: [202, 240], to: "whatdo" }, { wait: 0.5 }, { tap: [115, 279], to: "feeling" }]),
    lm("lm-flowers", "partner", [{ wait: 0.4 }, { tap: [121, 457], to: "flowers" }, { wait: 0.7 }, { tap: [205, 501], to: "flowers2", fx: "fade" }]),
    lm("lm-say", "say", [{ wait: 0.6 }, { tap: [205, 462], to: "say2", fx: "fade" }, { ring: [26, 270, 360, 105], hold: 1.1 }]),
    lm("lm-family", "family", [{ wait: 0.5 }, { tap: [202, 353], to: "affirm" }, { wait: 0.2 }, { ring: [26, 360, 360, 76], hold: 1 }]),
    lm("lm-learn", "learn1", [{ wait: 0.9 }, { tap: [297, 795], to: "learn2" }]),
    lm("lm-calls", "family", [{ wait: 0.6 }, { tap: [121, 240], to: "calls" }]),
]

/* ---------------- Pip: the wireframes and hi-fi flow, panning across the phones of the research deck ---------------- */

// positions are read off the 2000 px wide slide; the crop and camera keep the slide's title and footer out of frame
const PIP_CROP = [40, 262, 1920, 1080]
const pp = (x, y) => [x - PIP_CROP[0], y - PIP_CROP[1]]
const pr = (x, y, w, h) => [x - PIP_CROP[0], y - PIP_CROP[1], w, h]
const pipSlide = (id, slide, z, x, steps) => ({
    id,
    kind: "desktop",
    fw: 1920,
    fh: 1080,
    W: 1600,
    H: 900,
    crop: PIP_CROP,
    imgW: 2000,
    bitrate: 2400000,
    accent: "#7C4DE6",
    shots: { s: SITE + `pip/${slide}.jpg` },
    first: "s",
    home: { x: x - PIP_CROP[0], y: 0, z },
    start: pp(x + 200, 620),
    steps,
})

const ppScenes = [
    pipSlide("pip-lofi", "slide-19", 1.67, 590, [
        { move: pp(212, 784), ring: pr(94, 768, 235, 32), hold: 0.6 },
        { move: pp(527, 772), ring: pr(409, 756, 235, 32), hold: 0.5 },
        { move: pp(842, 522), z: 1.67, at: pp(1000, 575), ring: pr(724, 506, 235, 32), hold: 0.6 },
        { move: pp(1157, 768), z: 1.67, at: pp(1300, 575), ring: pr(1039, 752, 235, 32), hold: 0.5 },
        { move: pp(1472, 772), z: 1.67, at: pp(1600, 575), ring: pr(1355, 756, 235, 32), hold: 0.5 },
        { move: pp(1787, 513), ring: pr(1679, 492, 216, 42), hold: 0.6 },
    ]),
    pipSlide("pip-final", "slide-22", 1.55, 600, [
        { move: pp(237, 645), ring: pr(144, 633, 186, 26), hold: 0.5 },
        { move: pp(487, 680), ring: pr(394, 667, 186, 26), hold: 0.5 },
        { move: pp(737, 665), z: 1.55, at: pp(860, 600), ring: pr(644, 652, 186, 26), hold: 0.5 },
        { move: pp(1028, 465), z: 1.55, at: pp(1110, 600), ring: pr(990, 455, 76, 20), hold: 0.5 },
        { move: pp(1195, 530), z: 1.55, at: pp(1300, 600), ring: pr(1180, 515, 30, 30), round: true, hold: 0.5 },
        { move: pp(1438, 618), z: 1.55, at: pp(1500, 600), ring: pr(1394, 605, 90, 26), hold: 0.5 },
        { move: pp(1737, 515), ring: pr(1644, 502, 186, 26), hold: 0.6 },
    ]),
]

/* ---------------- Co-Pilot: car displays, from the Automobile Design Expo Figma file. Touch, because these are in-car screens ---------------- */

const cpShots = Object.fromEntries(["cl-clear", "cl-stress", "cl-drowsy", "cl-critical", "ce-home", "ce-drowsy", "ce-trip", "faces", "wheel"].map((k) => [k, VIDEO + `copilot/${k}.png`]))
const cp = (id, first, fw, fh, W, H, steps, extra = {}) => ({ id, kind: "phone", fw, fh, W, H, bitrate: 2600000, accent: "#14D6B8", start: [fw * 0.55, fh * 0.8], shots: cpShots, first, steps, ...extra })
const cluster = (id, first, steps) => cp(id, first, 1760, 660, 1760, 660, steps)
const centre = (id, first, steps) => cp(id, first, 1280, 800, 1280, 800, steps)
// positions below are read off the frame at 2000 px wide, then moved into the crop
const FACE = [60, 280, 1880, 780]
const fr_ = (x, y, w, h) => [x - FACE[0], y - FACE[1], w, h]
const fp = (x, y) => [x - FACE[0], y - FACE[1]]
const WHEEL = [66, 622, 859, 537]
const wr = (x, y, w, h) => [x - WHEEL[0], y - WHEEL[1], w, h]
const wp = (x, y) => [x - WHEEL[0], y - WHEEL[1]]

const cpScenes = [
    // the drive in one pass, for the top of the page
    cluster("cp-hero", "cl-clear", [
        { wait: 1.3 },
        { to: "cl-stress", fx: "fade" },
        { wait: 1.5 },
        { to: "cl-drowsy", fx: "fade" },
        { wait: 1.5 },
        { to: "cl-critical", fx: "fade" },
        { wait: 1.2 },
        { tap: [880, 478], to: "cl-clear", fx: "fade" },
    ]),
    cluster("cp-states", "cl-clear", [
        { wait: 0.3 },
        { ring: [788, 47, 184, 46], hold: 0.9 },
        { ring: [1185, 175, 261, 326], hold: 1 },
        { to: "cl-stress", fx: "fade" },
        { ring: [795, 47, 170, 46], hold: 0.8 },
        { ring: [560, 255, 560, 292], hold: 1 },
        { tap: [648, 486], to: "cl-clear", fx: "fade" },
    ]),
    cluster("cp-escalate", "cl-drowsy", [
        { wait: 0.3 },
        { ring: [1185, 175, 261, 326], hold: 0.9 },
        { ring: [560, 226, 560, 321], hold: 1.1 },
        { to: "cl-critical", fx: "fade" },
        { ring: [1185, 175, 261, 326], hold: 0.8 },
        { tap: [880, 478], ring: [811, 452, 138, 52], hold: 0.4 },
    ]),
    centre("cp-centre", "ce-home", [
        { wait: 0.3 },
        { ring: [893, 131, 346, 228], hold: 1 },
        { to: "ce-drowsy", fx: "fade" },
        { wait: 0.2 },
        { ring: [560, 312, 560, 70], hold: 0.8 },
        { ring: [560, 394, 560, 70], hold: 0.6 },
        { ring: [160, 586, 303, 40], hold: 0.7 },
        { tap: [680, 606], ring: [560, 578, 239, 55], hold: 0.35 },
    ]),
    centre("cp-trip", "ce-trip", [
        { wait: 0.3 },
        { tap: [580, 270], ring: [256, 248, 652, 44], hold: 0.8 },
        { tap: [580, 444], ring: [256, 422, 652, 44], hold: 0.8 },
        { tap: [745, 530], ring: [653, 512, 184, 36], hold: 0.7 },
        { ring: [970, 507, 250, 133], hold: 0.9 },
    ]),
    {
        ...cp("cp-faces", "faces", FACE[2], FACE[3], 1880, 780, [
            { move: fp(475, 495), z: 1.6, at: fp(650, 495), ring: fr_(354, 344, 243, 304), hold: 0.5 },
            { move: fp(738, 495), ring: fr_(616, 344, 243, 304), hold: 0.5 },
            { move: fp(1000, 495), z: 1.6, at: fp(1000, 495), ring: fr_(878, 344, 243, 304), hold: 0.5 },
            { move: fp(1262, 495), ring: fr_(1140, 344, 243, 304), hold: 0.5 },
            { move: fp(1524, 495), z: 1.6, at: fp(1500, 495), ring: fr_(1403, 344, 243, 304), hold: 0.5 },
            { move: fp(1786, 495), ring: fr_(1665, 344, 243, 304), hold: 0.8 },
            { move: fp(1786, 885), z: 1.6, at: fp(1500, 885), ring: fr_(1665, 733, 243, 304), hold: 0.8 },
        ]),
        kind: "desktop",
        crop: FACE,
        imgW: 2000,
    },
    {
        ...cp("cp-wheel", "wheel", WHEEL[2], WHEEL[3], 1600, 1000, [
            { wait: 0.3 },
            { ring: wr(200, 620, 300, 130), hold: 1 },
            { tap: wp(516, 901), ring: wr(476, 861, 80, 80), round: true, hold: 0.5 },
            { tap: wp(561, 991), ring: wr(533, 969, 56, 44), hold: 0.5 },
            { tap: wp(189, 904), ring: wr(155, 870, 68, 68), round: true, hold: 0.5 },
        ]),
        crop: WHEEL,
        imgW: 2000,
    },
]

export const scenes = [...kgScenes, ...dgScenes, ...lmScenes, ...ppScenes, ...cpScenes]
