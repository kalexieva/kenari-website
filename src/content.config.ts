import {defineCollection, z} from 'astro:content';
import {glob} from 'astro/loaders';

export const collections = {
	'past-events': defineCollection({
		// Load Markdown files in the src/content/past-events directory.
		loader: glob({ base: './src/content/past-events', pattern: '**/*.md' }),
		schema: z.object({
			title: z.string(),
			description: z.string(),
			eventDate: z.coerce.date(),
			img: z.string(),
			img_alt: z.string().optional(),
			gallery: z.array(z.string()).optional(),
		}),
	}),
};
