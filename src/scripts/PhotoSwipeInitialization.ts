import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";

declare global {
	interface Window {
		__pswpInited?: boolean;
	}
}

function initAll() {
	const galleries = document.querySelectorAll<HTMLElement>("[data-pswp-gallery]");
	for (const gallery of galleries) {
		if (gallery.dataset.pswpInitialized === "true") continue;
		gallery.dataset.pswpInitialized = "true";

		const lightbox = new PhotoSwipeLightbox({
			gallery,
			children: "a",
			pswpModule: () => import("photoswipe"),
		});

		lightbox.init();

		addEventListener("astro:before-swap", () => lightbox.destroy(), { once: true });
	}
}

export function ensurePhotoSwipe() {
	initAll();

	// Re-init after Astro client-side navigation, if enabled
	addEventListener("astro:after-swap", initAll);
}

// If loaded as a plain module script, just run:
if (!window.__pswpInited) {
	window.__pswpInited = true;

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", ensurePhotoSwipe);
	} else {
		ensurePhotoSwipe();
	}
}
