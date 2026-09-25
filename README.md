# Portfolio: Mauro Zahradnicek

A bilingual (EN/ES) case study of the Meta/TikTok performance work I did at LeadsIcon. It's a static, single-page site.

## Structure

- `index.html`: the built page that gets deployed, with all images inlined.
- `cv.pdf`: the file behind the "Download CV" button.
- `src/template.html`: the page source. Edit copy and styles here.
- `src/assets/*.webp`: evidence screenshots and photo, already blurred and cropped.
- `src/build.mjs`: inlines the assets into `index.html`. It has no dependencies.

## Edit and rebuild

```bash
node src/build.mjs
```

Commit and push after rebuilding, and Vercel redeploys on its own.

## Deploy

On Vercel, import the GitHub repo with Framework Preset **Other** and no build command. `index.html` is served as is.

Add `#es` to the URL to open the Spanish version.
