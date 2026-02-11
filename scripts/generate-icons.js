const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const iconsDir = path.join(__dirname, '../public/icons');

// Simple PNG generation since we don't have a source image
async function generateIcons() {
    console.log('Generating PWA icons...');

    for (const size of sizes) {
        const svg = `
            <svg width="${size}" height="${size}" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <rect width="512" height="512" fill="#3b82f6"/>
                <g transform="translate(128, 128)">
                    <path d="M 0 32 L 32 32 L 64 160 L 224 160 L 256 64 L 80 64 L 72 32 Q 72 16 56 16 L 0 16 Z" 
                          fill="#ffffff" stroke="#ffffff" stroke-width="4"/>
                    <circle cx="96" cy="224" r="24" fill="#ffffff"/>
                    <circle cx="192" cy="224" r="24" fill="#ffffff"/>
                    <path d="M 88 80 L 96 120 M 120 80 L 128 120 M 152 80 L 160 120 M 184 80 L 192 120" 
                          stroke="#3b82f6" stroke-width="8" stroke-linecap="round"/>
                </g>
                <text x="256" y="${size > 256 ? 400 : size * 0.78}" font-family="Arial, sans-serif" font-size="${size * 0.094}" font-weight="bold" 
                      fill="#ffffff" text-anchor="middle">Products</text>
            </svg>
        `;

        await sharp(Buffer.from(svg))
            .resize(size, size)
            .png()
            .toFile(path.join(iconsDir, `icon-${size}x${size}.png`));

        console.log(`✓ Generated icon-${size}x${size}.png`);
    }

    console.log('✅ All PWA icons generated successfully!');
}

generateIcons().catch(console.error);
