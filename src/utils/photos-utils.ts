import type {ImageMetadata} from 'astro';

// Important: this path is relative to *this file* (src/utils/...)
// Photos are expected at: src/assets/past-events/<slug>/*
const allEventImages = import.meta.glob<{ default: ImageMetadata }>(
	"../assets/past-events/**/*.{jpg,jpeg,png,webp,avif}",
	{ eager: true }
);

export function getThumbForSlug(slug: string): ImageMetadata {
	const images = Object.entries(allEventImages)
		.filter(([filePath]) => filePath.includes(`/past-events/${slug}/`))
		.sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
		.map(([, mod]) => mod.default);

	return images[0];
}
