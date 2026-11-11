# Nodemor — the journey (v11)

Static, no build step. Deploy on Vercel (preset: Other).

## The flight
`index.html` renders a live WebGL scene (three.js) from real imagery in `/img`: NASA Blue Marble Earth
(day map, night city lights, clouds, ocean mask) blended by a custom shader, a real Milky Way sky, the
Moon, and a 3D spacecraft window you fly through. Scroll drives the camera along a spline
(`posCurve` / `tgtCurve`, timed by `KT`).

## Stops on the globe
The `STOPS` array holds ten real places where parts of the stack were created: coordinates, the scroll
position it is reached (`at`), title, place, description, chips, an image key (`st_01` … `st_10`) and a
line of code that types under the image. For each stop the page drops a 3D pin, draws a dashed
great-circle route from the previous stop with a marker travelling along it, turns the planet so the
marker faces you, and shows a card beside the pin (docked at the top on phones).
Headlines switch at the scroll positions in `SCENE_AT`.

The ten card images (`img/st_01.jpg` … `st_10.jpg`, 960x540) are purpose-made visuals, one per stop.
To use your own photographs instead, replace those files and keep the names. The chat, payment and
dashboard figures shown inside them are illustrative.

## Selected work: explore each project inside its window
Each project window loads the real site in a frame as it nears the screen.
- Scrolling over an idle window scrolls the page as usual.
- Click (tap) the window to explore: scrolling now moves the site inside it. Moving the pointer away,
  scrolling past the end of the site, or the window leaving the screen hands scrolling back to the page.
- Desktop / Mobile renders the site at a true 1280px or 390px width, scaled to fit.
- Expand opens the window full-screen (the site gets the real width of the screen); Close returns.
  Esc also closes, unless keyboard focus is inside the embedded site, in which case use Close.
- Restart returns the window to the site's home page.
- There are no outbound links in this section. Frames are sandboxed
  (`allow-scripts allow-same-origin allow-forms`), so links inside a site cannot open new tabs or
  navigate the Nodemor page away. A link that tries to leave (for example a WhatsApp button) does nothing.

### Required on each of the four sites
A site can only be shown in a frame if it allows it. On each project site:
- do not send `X-Frame-Options: DENY` or `SAMEORIGIN`;
- if a Content-Security-Policy is set, include
  `frame-ancestors 'self' https://YOUR-NODEMOR-DOMAIN https://www.YOUR-NODEMOR-DOMAIN`.
If a site refuses, its window shows the browser's "refused to connect" page. The page cannot detect that
case, so check all four after deploying.

Hosts that forbid outside frames altogether (for example a sandboxed preview) are detected: each window
then shows an outline of the site with a notice, and Expand / Restart are hidden.

Screenshots (shown while a site loads) come from image.thum.io, with microlink as backup, or from
`/screenshots` if you bake them: `npm i -D playwright && npx playwright install chromium && npm run shots`.

## Assets
- earth_day / earth_night / earth_clouds / earth_spec / moon / sky_* — NASA-derived maps as distributed
  with the open-source three.js and three-globe projects. astronaut.jpg — NASA spacewalk photograph.
  NASA imagery is free to use; NASA asks that it not be used to imply endorsement.

## Still to fill in
WhatsApp number and email (contact section). The four About figures are marketing claims; keep only the
ones you can stand behind. The places and years on the stops were written from memory; verify before launch.
