document.querySelectorAll('.dana-gallery-content .gallery').forEach((gallery) => {
  [...gallery.querySelectorAll(':scope > .gallery__item')]
    .reverse()
    .forEach((item) => gallery.appendChild(item));

  const links = [...gallery.querySelectorAll('.gallery__item > a')];

  links.forEach((link) => {
    const [width, height] = (link.dataset.size || '').split('x');
    const preview = link.querySelector('img');
    const sourceWidth = Number(width);
    const sourceHeight = Number(height);

    if (sourceWidth && sourceHeight) {
      const displayWidth = Math.min(sourceWidth, 1400);
      link.dataset.pswpWidth = displayWidth;
      link.dataset.pswpHeight = Math.round(sourceHeight * displayWidth / sourceWidth);
    }

    const useRenderedImage = () => {
      if (!preview) return;

      if (/-thumbnail\.webp(?:$|[?#])/.test(preview.src)) {
        link.href = preview.currentSrc || preview.src;
      }

      // Use the generated WebP's real orientation and aspect ratio.
      if (preview.naturalWidth && preview.naturalHeight) {
        link.dataset.pswpWidth = preview.naturalWidth;
        link.dataset.pswpHeight = preview.naturalHeight;
      }
    };

    if (preview && preview.complete) {
      useRenderedImage();
    } else if (preview) {
      preview.addEventListener('load', useRenderedImage, { once: true });
    }

    link.setAttribute('aria-label', 'Open full-size photo');
  });

  const lightbox = new PhotoSwipeLightbox({
    gallery,
    children: '.gallery__item > a',
    pswpModule: PhotoSwipe,
    bgOpacity: 0.8
  });

  lightbox.init();
});

