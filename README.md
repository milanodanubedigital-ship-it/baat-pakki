# Baat Pakki - Premium Engagement Invitation

A beautiful, interactive engagement invitation website built with React, Tailwind CSS, and Framer Motion.

## Project Features

✨ **Stunning Scroll Animation** - Male and female images converge to the center and transform into a couple image
🎨 **Luxury Design** - Deep green and gold color scheme with elegant typography
💫 **Interactive Elements** - Floating hearts, floral decorations, and smooth transitions
📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
✍️ **Arabic Blessing** - Authentic closing with Arabic text and English translation

## Setup Instructions

### 1. Install Node.js (if not already installed)
- Visit [nodejs.org](https://nodejs.org/)
- Download and install the LTS version
- Verify installation: `node --version` and `npm --version`

### 2. Add Images to the Project

The project expects three images in the `public/images/` folder:

1. **female.jpg** - Individual female portrait (left side in hero)
2. **male.jpg** - Individual male portrait (right side in hero)
3. **couple.jpg** - Couple portrait together (appears after scroll)

**How to add images:**
- Save your three images to `/public/images/` folder with the exact names above
- Supported formats: JPG, PNG, WebP
- Recommended sizes:
  - Individual images: 500px × 800px or similar portrait aspect ratio
  - Couple image: 600px × 800px or similar portrait aspect ratio

### 3. Install Dependencies

```bash
cd "/Users/danube/Documents/Claude/Baat Pakki"
npm install
```

### 4. Start Development Server

```bash
npm run dev
```

The site will open automatically in your browser at `http://localhost:3000`

### 5. Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` folder ready for deployment.

## File Structure

```
Baat Pakki/
├── public/
│   └── images/           # Your invitation images go here
│       ├── female.jpg
│       ├── male.jpg
│       └── couple.jpg
├── src/
│   ├── components/
│   │   ├── InvitationPage.jsx       # Main page component
│   │   ├── HeroSection.jsx          # Opening with titles
│   │   ├── CoupleTransformAnimation.jsx  # Scroll animation logic
│   │   ├── BlessingSection.jsx      # Closing blessing
│   │   ├── FloatingHearts.jsx       # Animated hearts
│   │   ├── FloralDecorations.jsx    # Decorative flowers
│   │   └── HeartOutlineBackground.jsx  # Background hearts
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── postcss.config.js
```

## Event Details

- **Event**: Baat Pakki (Islamic Engagement Ceremony)
- **Date**: 5th June 2026
- **Venue**: W49
- **Closing**: تحت بركة الله (Under the blessings of Allah)

## Customization

### Change Event Details

Edit `src/components/CoupleTransformAnimation.jsx` and `src/components/BlessingSection.jsx`:
- Modify date, venue, and event name
- Update Arabic blessing text or English translation

### Customize Colors

Edit `tailwind.config.js`:
- `deep-green`: Primary text color (#1a4d2e)
- `sage-green`: Accent color (#8b9a7a)
- `gold`: Decorative accents (#d4af37)

### Adjust Animation Speed

Edit individual component files to modify animation durations and effects in the `transition` properties.

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Tips

- Optimize images to under 500KB each for faster loading
- Use JPG format for photographs
- Images will be lazy-loaded for better performance

## Deployment

### Netlify
```bash
npm run build
# Drag and drop the `dist` folder to Netlify
```

### Vercel
```bash
npm run build
# Import from GitHub and deploy
```

### Traditional Web Host
```bash
npm run build
# Upload the contents of the `dist` folder to your server
```

## Technologies Used

- **React 18** - UI framework
- **Framer Motion** - Animation library
- **Tailwind CSS** - Styling
- **Vite** - Build tool

## Notes

- All animations are GPU-accelerated for smooth performance
- The scroll animation is fully responsive and adapts to mobile devices
- Floating hearts and decorations are subtle and don't interfere with content
- Images use `object-cover` for consistent aspect ratio display

---

Made with ❤️ for a beautiful engagement celebration.
