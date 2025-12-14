# QR Code Generator PWA

## Overview
A free, responsive Angular Progressive Web App (PWA) that generates QR codes for any URL. Works offline and is optimized for mobile, tablet, and desktop.

## Features
- Generate QR codes for any valid URL (YouTube, Maps, products, etc.)
- One-click paste from clipboard
- One-click download QR code as PNG
- Toast notifications for user feedback
- Toggle alerts on/off
- Full offline support with service workers
- Installable as a mobile/desktop app
- Beautiful responsive UI with Tailwind CSS and Inter font

## Tech Stack
- Angular 19 (standalone components)
- Angular PWA with Service Worker
- Tailwind CSS v4
- angularx-qrcode library
- TypeScript

## Project Structure
```
qr-generator/
├── src/
│   ├── app/
│   │   ├── app.ts          # Main component with QR logic
│   │   ├── app.html        # Main template
│   │   └── app.css         # Component styles
│   ├── styles.css          # Global styles with Tailwind
│   ├── index.html          # Entry HTML
│   └── main.ts             # Bootstrap
├── public/
│   ├── manifest.webmanifest # PWA manifest
│   └── icons/              # PWA icons
├── angular.json            # Angular config
├── ngsw-config.json        # Service worker config
└── package.json            # Dependencies
```

## Development
Run the development server:
```bash
cd qr-generator && pnpm start
```

The app runs on port 5000 and is accessible from any host.

## Building for Production
```bash
cd qr-generator && pnpm build
```

## Recent Changes
- Initial project setup with Angular 19
- Configured Tailwind CSS v4 with Inter font
- Added PWA support with service workers
- Built responsive QR code generator UI
- Implemented paste, download, and alert toggle features
