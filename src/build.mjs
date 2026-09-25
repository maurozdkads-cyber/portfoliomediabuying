// Builds ../index.html from template.html + assets/*.webp (images inlined as data URIs).
// Usage: node src/build.mjs
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
let body = readFileSync(join(here, 'template.html'), 'utf8');

for (const file of readdirSync(join(here, 'assets'))) {
  if (!file.endsWith('.webp')) continue;
  const key = file.replace(/\.webp$/, '');
  const uri = 'data:image/webp;base64,' + readFileSync(join(here, 'assets', file)).toString('base64');
  body = body.split(`{{${key}}}`).join(uri);
}
if (/\{\{\w+\}\}/.test(body)) throw new Error('Unreplaced placeholder: ' + body.match(/\{\{\w+\}\}/)[0]);

// On the deployed site the CV is a real file next to index.html.
body = body.replace('var CV_URL = "";', 'var CV_URL = "cv.pdf";');

const description = 'Mauro Zahradnicek, Performance Media Buyer & Creative Strategist. Case study: scaling Meta and TikTok from $1K a day to $53K in one day with reconciled revenue.';
const head = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="description" content="${description}">
<meta property="og:type" content="website">
<meta property="og:title" content="Mauro Zahradnicek, Scale Log">
<meta property="og:description" content="${description}">
<meta name="twitter:card" content="summary">
<meta name="theme-color" content="#0A0D12">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='6' fill='%230A0D12'/%3E%3Cpath d='M6 24 L13 16 L18 20 L26 8' stroke='%233FD68F' stroke-width='3' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E">
<style>html{color-scheme:dark}body{margin:0}[hidden]{display:none!important}</style>
</head>
<body>
`;
writeFileSync(join(here, '..', 'index.html'), head + body + '\n</body>\n</html>\n');
console.log('index.html built');
