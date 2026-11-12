// Google Analytics. Every page loads this file, so the measurement ID lives only here.
// Get the ID from analytics.google.com: Admin > Data streams > your web stream ("G-...").
;(function () {
    var ID = "G-DYVFJ5M6P5"

    // Don't count visits while working locally.
    var host = location.hostname
    if (host === "localhost" || host === "127.0.0.1" || host === "" || host.endsWith(".local")) return

    var s = document.createElement("script")
    s.async = true
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + ID
    document.head.appendChild(s)

    window.dataLayer = window.dataLayer || []
    window.gtag = function () {
        window.dataLayer.push(arguments)
    }
    window.gtag("js", new Date())
    window.gtag("config", ID)

    // Microsoft Clarity: heatmaps and session recordings (clarity.microsoft.com > Settings > Setup).
    var CLARITY = "zcennqpbp2"
    if (CLARITY) {
        // By default Clarity hides every digit in recordings and heatmaps (years show as "▫▫▫▫").
        // The site's text is public, so show it; the visitor-notes form stays masked (data-clarity-mask).
        document.documentElement.setAttribute("data-clarity-unmask", "true")
        window.clarity =
            window.clarity ||
            function () {
                ;(window.clarity.q = window.clarity.q || []).push(arguments)
            }
        var c = document.createElement("script")
        c.async = true
        c.src = "https://www.clarity.ms/tag/" + CLARITY
        document.head.appendChild(c)
    }
})()
