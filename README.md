# Anniversary site

A single-page anniversary surprise: countdown, love meter, pinky promise, candle to blow out, a letter that types itself, promise bubbles, and a gift with a finale.

## Files

```
anniversary-site/
├── index.html    all the screens, in order
├── style.css     colours, fonts, layout, animations
└── script.js     countdown, navigation, confetti, mic, music
```

No build step, no npm, no dependencies. Three files and a browser.

## Open it in VS Code

1. Download the three files into one folder called `anniversary-site`.
2. In VS Code: **File → Open Folder**, pick that folder.
3. Install the **Live Server** extension (Extensions sidebar, search "Live Server", by Ritwick Dey).
4. Right-click `index.html` in the file list → **Open with Live Server**.

Your browser opens at `http://127.0.0.1:5500` and reloads every time you save. You can also just double-click `index.html`, but the microphone on the cake screen only works over `http://localhost` or `https://`, not from a `file://` path — so Live Server is worth the two minutes.

## Change the things you'll want to change

**Name and date** — top of `script.js`:

```js
var TARGET = new Date(2026, 8, 19, 0, 0, 0); // months are 0-indexed: 8 = September
var NAME = "Arsh";
```

`NAME` only feeds the letter. The name also appears in `index.html` on the first screen, the banner screen, the promise bubbles, and the finale — search for `Arsh` and replace.

**The letter** — the `LETTER` string in `script.js`. Use `\n\n` between paragraphs. This is the part she'll read twice, so write it yourself.

**Photos** — replace the emoji with real images. In `index.html`, swap:

```html
<div class="art">💑</div>
```

for:

```html
<img class="art-img" src="photos/us.jpg" alt="">
```

and add to `style.css`:

```css
.art-img{ width:min(70vw,260px); border-radius:18px; box-shadow:0 14px 30px rgba(200,90,130,.28); }
```

Same idea for the polaroid at the end — replace the `🧸` inside `.polaroid .inner`. Put your pictures in a `photos/` folder next to `index.html`.

**Colours** — the `:root` block at the top of `style.css`. `--rose` is the main pink, `--wine` the deep heading colour.

**Music** — `MELODY` in `script.js` is an array of note frequencies played with the Web Audio API, so there's no audio file to host. To use a real song instead, drop an mp3 in the folder, add `<audio id="bgm" src="song.mp3" loop></audio>` to `index.html`, and have the music button call `bgm.play()` / `bgm.pause()`. Browsers won't autoplay audio until the visitor taps something, which is why the button exists.

## Put it online

Any static host works, since there's no server code.

- **Netlify Drop** — drag the folder onto app.netlify.com/drop, get a link, done.
- **GitHub Pages** — push the folder to a repo, Settings → Pages → deploy from `main`.
- **Vercel** — `npx vercel` in the folder.

## Notes

- Designed phone-first; `#app` is capped at 520px wide and centred on desktop.
- The mic asks permission on the cake screen. If she declines or it fails, tapping the cake blows out the candle anyway.
- The "No" button on the first screen runs away on hover and on touch. That's on purpose.
