# Kenari Website

The official website for Kenari, a Bulgarian folk dance group. It provides information about practice times, upcoming events, and a gallery of past performances.

Visit the live site: [kenaridancers.com](https://kenaridancers.com)

## Tech Stack

- [Astro](https://astro.build/) - Static site generator
- [FullCalendar](https://fullcalendar.io/) - Interactive calendar for practice times and events
- [PhotoSwipe](https://photoswipe.com/) - Image gallery for past event photos
- [Astro Embed YouTube](https://github.com/astro-community/astro-embed-youtube) - Embedding performance videos
- [Sharp](https://sharp.pixelplumbing.com/) - Image processing and optimization

## Development

### Prerequisites

- Node.js 22+
- npm or pnpm

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Additional Scripts

- `npm run format`: Format code with Prettier.
- `npm run lint`: Run ESLint to check for code quality issues.
- `npm run convert:heic`: Convert HEIC images to JPG (uses `scripts/convert-heic.mjs`).
- `npm run rename:photos`: Batch rename photos for consistency (uses `scripts/rename-photos.mjs`).

### Project Structure

```text
/
├── public/              # Static assets (favicons, etc.)
│   └── assets/          # Global assets like background images
├── scripts/             # Utility scripts for photo processing
├── src/
│   ├── assets/          # Event-specific photos
│   ├── components/      # Reusable Astro components
│   ├── content/         # Markdown content for past events
│   ├── data/            # JSON data (events.json)
│   ├── layouts/         # Page layouts
│   ├── pages/           # Page routes (index, calendar, past-events, contact, etc.)
│   ├── scripts/         # Client-side scripts (PhotoSwipe, Calendar initialization)
│   ├── styles/          # Global CSS
│   └── utils/           # Shared utility functions
├── astro.config.mjs     # Astro configuration
└── package.json
```

## Deployment

The site is built and deployed to our custom domain at [kenaridancers.com](https://kenaridancers.com).

## License

MIT License - see LICENSE file for details
