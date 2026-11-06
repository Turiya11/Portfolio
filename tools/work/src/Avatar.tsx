// Flat illustrated faces for the persona cards: a head and shoulders in a pastel circle.
// Each persona describes its face in data (skin, hair, clothes, a few accessories); nothing here is a photo.
import * as React from "react"

export type Face = {
    skin: string
    hair: "short" | "side" | "curly" | "bob" | "long" | "bangs" | "bun" | "ponytail" | "bald"
    hairColor: string
    bg: string
    top: string // shirt colour
    coat?: boolean // white coat over the shirt
    hoodie?: boolean
    glasses?: boolean
    shades?: boolean // sunglasses pushed up on the head
    beard?: "full" | "stubble"
    moustache?: boolean
    earrings?: boolean
}

// a darker version of a hex colour, for shading
const shade = (hex: string, k = 0.86) => {
    const n = parseInt(hex.slice(1), 16)
    const c = (s: number) => Math.round(((n >> s) & 255) * k)
    return `rgb(${c(16)},${c(8)},${c(0)})`
}

// hair drawn behind the head
function HairBack({ f }: { f: Face }) {
    const c = f.hairColor
    switch (f.hair) {
        case "bob":
            return <path d="M33 58C29 31 45 21 60 21s31 10 27 37l2 26c-8 5-16 4-20-1H51c-4 5-12 6-20 1z" fill={c} />
        case "long":
            return <path d="M32 58C28 29 45 19 60 19s32 10 28 39l5 62H27z" fill={c} />
        case "bangs":
            return <path d="M33 58C29 30 45 20 60 20s31 10 27 38l3 54H30z" fill={c} />
        case "bun":
            return <circle cx="60" cy="22" r="12" fill={c} />
        case "ponytail":
            return <path d="M80 36c14 4 20 22 17 40-2 12-7 20-13 24 3-12 3-24-2-34z" fill={c} />
        default:
            return null
    }
}

// hair drawn over the head
function HairFront({ f }: { f: Face }) {
    const c = f.hairColor
    switch (f.hair) {
        case "short":
            return <path d="M36 57c-3-23 9-34 24-34s27 11 24 34c-1-9-5-15-11-17-8 4-21 4-30 1-4 4-6 10-7 16z" fill={c} />
        case "side":
            return <path d="M36 58c-4-24 9-36 25-36 15 0 27 10 23 34-2-8-6-13-11-15-10 0-22-3-30-8-3 6-6 15-7 25z" fill={c} />
        case "curly":
            return (
                <g fill={c}>
                    {[
                        [38, 46, 8], [42, 36, 9], [51, 29, 9], [61, 27, 9], [71, 29, 9], [79, 36, 9], [83, 46, 8], [47, 39, 7], [60, 36, 7], [73, 39, 7],
                    ].map(([x, y, r]) => (
                        <circle key={`${x}-${y}`} cx={x} cy={y} r={r} />
                    ))}
                </g>
            )
        case "bob":
        case "long":
            return <path d="M36 58c-2-22 10-33 25-33 14 0 26 10 23 32-5-10-14-17-27-17-8 3-15 8-21 18z" fill={c} />
        case "bangs":
            return <path d="M36 54c-1-20 10-29 24-29s25 9 24 29c-1-4-2-7-3-9H39c-1 2-2 5-3 9z" fill={c} />
        case "bun":
        case "ponytail":
            return <path d="M36 56c-2-21 10-31 24-31s26 10 24 31c-3-8-9-14-17-16-3 1-10 1-14 0-8 2-14 8-17 16z" fill={c} />
        case "bald":
            return (
                <g fill={c}>
                    <path d="M36 62c-2-9 0-17 4-21 0 7 1 14 3 20z" />
                    <path d="M84 62c2-9 0-17-4-21 0 7-1 14-3 20z" />
                </g>
            )
    }
}

export default function Avatar({ face, size = 88, title }: { face: Face; size?: number; title?: string }) {
    const id = React.useId().replace(/:/g, "")
    const f = face
    const dark = "#2b2230"
    const skinShade = shade(f.skin)
    return (
        <svg viewBox="0 0 120 120" width={size} height={size} role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true} className="av">
            <defs>
                <clipPath id={`c${id}`}>
                    <circle cx="60" cy="60" r="60" />
                </clipPath>
            </defs>
            <g clipPath={`url(#c${id})`}>
                <rect width="120" height="120" fill={f.bg} />
                <g transform="translate(-8.4 -6.7) scale(1.14)">
                <HairBack f={f} />
                {/* shoulders */}
                <path d="M12 124c2-20 16-29 34-31h28c18 2 32 11 34 31z" fill={f.coat ? "#fbfbfd" : f.top} />
                {f.coat ? <path d="M46 93h28l-4 31H50z" fill={f.top} /> : null}
                {f.hoodie ? <path d="M38 95c6 8 14 12 22 12s16-4 22-12l-6-3c-4 6-10 9-16 9s-12-3-16-9z" fill={shade(f.top, 0.84)} /> : null}
                {/* neck */}
                <path d="M51 74v21q9 8 18 0V74z" fill={skinShade} />
                {f.coat ? (
                    <g fill="#e6e8ef">
                        <path d="M46 93l8 4-4 27h-6z" />
                        <path d="M74 93l-8 4 4 27h6z" />
                    </g>
                ) : null}
                {/* ears, head */}
                <circle cx="37" cy="59" r="6" fill={f.skin} />
                <circle cx="83" cy="59" r="6" fill={f.skin} />
                <ellipse cx="60" cy="55" rx="23" ry="27" fill={f.skin} />
                {f.earrings ? (
                    <g fill="#f2c14e">
                        <circle cx="36" cy="67" r="2.4" />
                        <circle cx="84" cy="67" r="2.4" />
                    </g>
                ) : null}
                {f.beard ? (
                    <path
                        d="M37 58c1 18 10 30 23 30s22-12 23-30c-3 8-8 12-13 12-3-2-6-3-10-3s-7 1-10 3c-5 0-10-4-13-12z"
                        fill={f.beard === "stubble" ? shade(f.skin, 0.78) : f.hairColor}
                    />
                ) : null}
                <HairFront f={f} />
                {f.shades ? (
                    <g>
                        <path d="M56 33h8" stroke="#f4f1ea" strokeWidth="1.6" />
                        <rect x="41" y="29" width="15" height="9" rx="4.5" fill="#4b5d8c" stroke="#f4f1ea" strokeWidth="1.4" />
                        <rect x="64" y="29" width="15" height="9" rx="4.5" fill="#4b5d8c" stroke="#f4f1ea" strokeWidth="1.4" />
                        <path d="M44 32l4-1M67 32l4-1" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" opacity=".7" />
                    </g>
                ) : null}
                {/* brows, eyes, nose, cheeks */}
                <g stroke={f.hair === "bald" ? shade(f.skin, 0.55) : f.hairColor} strokeWidth="2.4" strokeLinecap="round" fill="none">
                    <path d="M45 49q5-3 10-1" />
                    <path d="M65 48q5-2 10 1" />
                </g>
                <circle cx="50.5" cy="57" r="2.8" fill={dark} />
                <circle cx="69.5" cy="57" r="2.8" fill={dark} />
                <circle cx="51.4" cy="56" r=".9" fill="#fff" />
                <circle cx="70.4" cy="56" r=".9" fill="#fff" />
                <path d="M60 59q-2 5 1 7" stroke={skinShade} strokeWidth="1.8" strokeLinecap="round" fill="none" />
                <ellipse cx="45" cy="66" rx="4.5" ry="2.6" fill="#ff6f7d" opacity=".22" />
                <ellipse cx="75" cy="66" rx="4.5" ry="2.6" fill="#ff6f7d" opacity=".22" />
                {f.glasses ? (
                    <g stroke={dark} strokeWidth="1.8" fill="rgba(255,255,255,.18)">
                        <rect x="41.5" y="50" width="17" height="13" rx="5" />
                        <rect x="61.5" y="50" width="17" height="13" rx="5" />
                        <path d="M58.5 55q1.5-2 3 0" fill="none" />
                    </g>
                ) : null}
                {f.moustache ? <path d="M52 69q4-4 8-1 4-3 8 1-4 1-8 0-4 1-8 0z" fill={f.hairColor} /> : null}
                {/* smile */}
                <path d="M52 71q8 9 16 0z" fill="#a8434f" />
                <path d="M53.6 71.2h12.8q-1 1.8-2.2 2.5h-8.4q-1.2-.7-2.2-2.5z" fill="#fff" />
                </g>
            </g>
        </svg>
    )
}
