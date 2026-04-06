import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";

function initAll() {
  const galleries = document.querySelectorAll<HTMLElement>(
    "[data-pswp-gallery]",
  );

  for (const gallery of galleries) {
    if (gallery.dataset.pswpInitialized === "true") continue;
    gallery.dataset.pswpInitialized = "true";

    const lightbox = new PhotoSwipeLightbox({
      gallery,
      children: "a",
      pswpModule: () => import("photoswipe"),
    });

    lightbox.init();
  }
}

function ensurePhotoSwipe() {
  initAll();

  // Re-init after Astro client-side navigation, if enabled
  document.addEventListener("astro:after-swap", initAll);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", ensurePhotoSwipe, {
    once: true,
  });
} else {
  ensurePhotoSwipe();
}
