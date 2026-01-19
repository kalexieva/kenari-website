# Kenari Website

A simple static website for our dance group with information about practice times, upcoming events, and performances.

## Tech Stack

- [Astro](https://astro.build/) - Static site generator
- Deployed on GitHub Pages

## Development

### Prerequisites

- Node.js 18+
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

### Project Structure

```
/
├── public/          # Static assets (images, fonts, etc.)
├── src/
│   ├── layouts/     # Page layouts
│   ├── pages/       # Page routes
│   └── components/  # Reusable components
├── astro.config.mjs # Astro configuration
└── package.json
```

## Deployment

This site is automatically deployed to GitHub Pages when changes are pushed to the main branch.

## License

MIT License - see LICENSE file for details
