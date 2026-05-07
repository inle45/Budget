// Run with: node generate-icons.js
// Generates PWA icons using canvas (Node.js with canvas package)
// If you don't have canvas, the app works fine without icons
const { createCanvas } = require('canvas');
const fs = require('fs');

function makeIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  const r = size * 0.15;

  // Background gradient
  const grad = ctx.createLinearGradient(0, 0, size, size);
  grad.addColorStop(0, '#6366f1');
  grad.addColorStop(1, '#8b5cf6');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.moveTo(r, 0);
  ctx.lineTo(size - r, 0);
  ctx.quadraticCurveTo(size, 0, size, r);
  ctx.lineTo(size, size - r);
  ctx.quadraticCurveTo(size, size, size - r, size);
  ctx.lineTo(r, size);
  ctx.quadraticCurveTo(0, size, 0, size - r);
  ctx.lineTo(0, r);
  ctx.quadraticCurveTo(0, 0, r, 0);
  ctx.fill();

  // Euro sign
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold ${size * 0.55}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('€', size / 2, size / 2);

  return canvas.toBuffer('image/png');
}

try {
  fs.writeFileSync('icon-192.png', makeIcon(192));
  fs.writeFileSync('icon-512.png', makeIcon(512));
  console.log('Icons generated!');
} catch(e) {
  console.log('canvas not available, skipping icon generation');
}
