// The three bits of the "framer" package the case-study components use, for running them outside Framer.
export const addPropertyControls = () => {}
export const ControlType = new Proxy({}, { get: (_, k) => String(k) })
export const RenderTarget = { canvas: "CANVAS", export: "EXPORT", thumbnail: "THUMBNAIL", preview: "PREVIEW", current: () => "PREVIEW" }
