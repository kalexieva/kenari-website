# Guide: Adding a New Past Event

Follow these steps to add a new event to the "Past Events" section of the website.

### 1. Create the Event Markdown File

Create a new Markdown file in the `src/content/past-events/` directory. Use the naming convention `YYYY-event-name.md`.

### 2. Configure the Frontmatter

Each event file requires specific metadata (frontmatter) at the top. All three fields are mandatory:

- `title`: The name of the event.
- `eventDate`: The date of the event in `YYYY-MM-DD` format.
- `description`: A brief, one-sentence summary of the event.

**Example format:**

```markdown
---
title: Event Name
eventDate: 2026-04-05
description: A short, one-sentence description of the event.
---
```

### 3. Set Up the Assets Directory

Create a new directory in `src/assets/past-events/` to store the event's images.

> [!IMPORTANT]
> This directory **must** have the exact same name as your Markdown file
> (excluding the `.md` extension). If the names do not match, the website
> will not be able to locate the photos.

### 4. Add and Process Images

1. **Upload Photos:** Place your images into the new directory created in Step 3.
2. **Handle HEIC/HEIF Files:** If you have photos in HEIC/HEIF format (common on iPhones), convert them to JPEG by running:
   ```bash
   npm run convert:heic
   ```
3. **Rename Photos:** The website expects images to follow a specific numbering pattern (`XXX.jpg`). Run the following script to automatically rename all photos in the directory:
   ```bash
   npm run rename:photos
   ```

### 5. Verify Your Changes

Before submitting your changes, it is important to test the new event page:

1. **Development Test:** Run `npm run dev` and navigate to the new event's URL to ensure everything looks correct.
2. **Production Check:** Sometimes the production build handles image loading differently. Verify the final build by running:
   ```bash
   npm run build
   npm run preview
   ```

### 6. Submit Your Changes

Once you are satisfied with the result:

1. Commit your changes.
2. Push them to the repository.
3. Open a Pull Request for review.
