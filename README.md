# AI Reality Mapper

**Cut through the noise. See what's really happening in AI.**

A beautiful, interactive visualization tool that maps AI announcements, products, and developments on a hype vs. reality scale. Built for Intertwined Intelligence.

![AI Reality Mapper](preview.png)

## Features

- **Timeline View** (Default): Chronological visualization of AI events
- **Constellation View**: Unique galaxy-style visualization where:
  - Position (angle) = Date (older left, newer right)
  - Position (radius) = Impact (higher impact closer to center)
  - Color = Reality vs Hype gap (green exceeded, orange overhyped, purple matched)
  - Size = Combined hype + reality score
- **Filter by Category**: Model Release, Product Launch, Capability, Regulation, Flop, Drama, Announcement
- **Filter by Company**: OpenAI, Anthropic, Google, Meta, xAI, DeepSeek, Stability AI, Microsoft, Other
- **All/Clear buttons**: Quick filter management
- **Time Slider**: Scrub through history from 2020 to present
- **Light/Dark Mode**: Toggle between themes
- **Mobile Responsive**: Works on all devices with collapsible filter panel
- **Event Detail Panel**: Deep dive into each event with scores, analysis, and predictions

## Quick Start

### Option 1: Deploy to Vercel (Recommended)

1. Download this folder as a ZIP
2. Go to [vercel.com](https://vercel.com) and sign up (free)
3. Click "Add New" → "Project"
4. Drag and drop the unzipped folder
5. Click "Deploy"
6. Your site is live! 🎉

### Option 2: Deploy to Netlify

1. Download this folder as a ZIP
2. Go to [netlify.com](https://netlify.com)
3. Drag and drop the unzipped folder onto the page
4. Done!

### Option 3: Run Locally

Just double-click `index.html` to open in your browser.

## Adding Fonts (Optional)

The app uses Geist font from Vercel. To enable it:

1. Download Geist from: https://vercel.com/font
2. Copy these files to the `/fonts/` folder:
   - `Geist-Regular.ttf`
   - `Geist-Medium.ttf`
   - `Geist-SemiBold.ttf`
   - `Geist-Bold.ttf`
   - `GeistMono-Regular.ttf` (optional, for monospace)
   - `GeistMono-Medium.ttf` (optional)

The app works without these fonts (uses system fonts as fallback).

## Adding New Events

Edit `data.js` and add events to the `EVENTS` array:

```javascript
{
    id: 'unique-event-id',
    date: '2025-03-15',          // YYYY-MM-DD format
    title: 'Event Title',
    hype: 8,                      // 1-10 scale
    reality: 6,                   // 1-10 scale
    category: 'model-release',    // Must match a CATEGORIES key
    company: 'openai',            // Must match a COMPANIES key
    impact: ['consumer', 'enterprise'],
    note: 'Your analysis...',
    source: 'Where announced',
    prediction: 'What was expected',
    outcome: 'What actually happened'
}
```

### Available Categories
- `model-release` - New AI model launches
- `product-launch` - Consumer or enterprise products
- `capability-breakthrough` - New capabilities or features
- `regulation` - Laws, policies, governance
- `flop` - Failed launches or disappointments
- `corporate-drama` - Corporate events and controversies
- `model-announcement` - Pre-release announcements

### Available Companies
- `openai` - ChatGPT, GPT models, DALL-E, Sora
- `anthropic` - Claude models
- `google` - Gemini, Bard, DeepMind
- `meta` - LLaMA models
- `xai` - Grok
- `deepseek` - DeepSeek models
- `stability` - Stable Diffusion
- `microsoft` - Copilot, GitHub Copilot
- `other` - Other companies and startups

### Impact Areas
- `research`, `developer`, `consumer`, `enterprise`
- `creative`, `cultural`, `corporate`, `open-source`
- `geopolitics`, `automation`

## File Structure

```
ai-reality-mapper/
├── index.html          # Main HTML
├── styles.css          # All styles (includes light/dark themes)
├── app.js              # Application logic
├── data.js             # Events and categories (edit this!)
├── fonts/
│   └── fonts.css       # Font configuration
└── README.md           # This file
```

## Customization

### Colors
Edit CSS variables in `styles.css`:
- Theme colors are in `[data-theme="dark"]` and `[data-theme="light"]` blocks
- Category colors: `--cat-model-release`, `--cat-product-launch`, etc.
- Company colors: `--company-openai`, `--company-anthropic`, etc.
- Accent colors: `--accent-hype`, `--accent-reality`, `--accent-matched`

### Adding Categories
1. Add to `CATEGORIES` object in `data.js`
2. Add a CSS color variable in `styles.css` (optional)

### Adding Companies
1. Add to `COMPANIES` object in `data.js`
2. Add a CSS color variable in `styles.css` (optional)

## How the Constellation Works

The constellation visualization places events logically:

1. **Angle (position around circle)**: Based on date
   - Older events on the left
   - Newer events on the right
   - Like reading a timeline, but circular

2. **Radius (distance from center)**: Based on combined score
   - Higher impact events (high hype + reality) are closer to center
   - Lower impact events are further out
   - Gap between hype/reality adds slight variation

3. **Size**: Based on combined hype + reality score
   - Bigger events have higher combined scores

4. **Color**: Based on hype vs reality gap
   - 🟢 Green: Reality exceeded hype
   - 🟠 Orange: Overhyped (hype > reality)
   - 🟣 Purple: Matched (hype ≈ reality)

## Browser Support

Works in all modern browsers:
- Chrome, Edge (Chromium)
- Firefox
- Safari
- Mobile browsers

## Credits

Built for [Intertwined Intelligence](https://intertwinedintelligence.com)

## License

MIT License - Feel free to modify and use for your own projects!
