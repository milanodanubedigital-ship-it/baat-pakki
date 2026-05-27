# Quick Start Guide

## 🚀 5-Minute Setup

### Step 1: Copy Your Images

You have three images that need to be saved to the project:

1. **Image 1: Couple together** → Save as `public/images/couple.jpg`
2. **Image 2: Female individual** → Save as `public/images/female.jpg`
3. **Image 3: Male individual** → Save as `public/images/male.jpg`

**How to save images:**
- Create a folder at: `/Users/danube/Documents/Claude/Baat Pakki/public/images/`
- Save the three images with the exact filenames above
- Make sure they're in JPG or PNG format

### Step 2: Install Node.js (if needed)

Open Terminal and check:
```bash
node --version
npm --version
```

If not installed, download from https://nodejs.org/

### Step 3: Install & Run

Open Terminal and run:

```bash
cd "/Users/danube/Documents/Claude/Baat Pakki"
npm install
npm run dev
```

The site will automatically open at `http://localhost:3000`

## 🎨 Preview What You'll See

1. **Hero Section** - Beautiful title with your individual photos on left and right
2. **Scroll Animation** - As you scroll, images move toward center and blend together
3. **Couple Transform** - Your couple photo gracefully appears as individuals fade out
4. **Event Details** - Premium card shows: Baat Pakki, 5th June 2026, Venue: W49
5. **Blessing Section** - Elegant Arabic text "تحت بركة الله" with English translation

## ✨ What Makes It Special

- **Romantic Animation**: Smooth scroll-based transformation
- **Luxury Design**: Deep green and gold color scheme
- **Premium Feel**: Modern, elegant, and memorable
- **Mobile Perfect**: Works beautifully on all devices
- **Interactive**: Floating hearts and floral decorations throughout

## 🛠️ Troubleshooting

**Issue**: "npm command not found"
- **Solution**: Install Node.js from nodejs.org

**Issue**: Images not showing
- **Solution**: Make sure images are in `/public/images/` folder with exact filenames:
  - `female.jpg`
  - `male.jpg`
  - `couple.jpg`

**Issue**: "Port 3000 already in use"
- **Solution**: Vite will automatically use a different port (3001, 3002, etc.)

## 📱 Testing on Different Devices

**Desktop**: Open http://localhost:3000 in your browser
**Mobile**: Open `http://YOUR-IP:3000` on your phone (find IP with `ipconfig getifaddr en0` on Mac)

## 🎬 When Ready to Share

Build the production version:
```bash
npm run build
```

This creates a `dist` folder that's ready to deploy to any web host.

---

Questions? Check the main `README.md` for more details!
