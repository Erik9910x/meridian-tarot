/**
 * Prepares the public/ directory for Vercel deployment.
 * Copies all static files (index.html, styles.css, support.jpg, assets/, js/)
 * into public/ so Vercel's static server finds the exact Output Directory it expects.
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const publicDir = path.join(rootDir, 'public');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    for (const child of fs.readdirSync(src)) {
      copyRecursive(path.join(src, child), path.join(dest, child));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

const itemsToCopy = ['index.html', 'styles.css', 'support.jpg', 'assets', 'js'];

for (const item of itemsToCopy) {
  const srcPath = path.join(rootDir, item);
  const destPath = path.join(publicDir, item);
  if (fs.existsSync(srcPath)) {
    copyRecursive(srcPath, destPath);
    console.log(`Copied ${item} -> public/${item}`);
  }
}

console.log('Public output directory successfully created and populated!');
