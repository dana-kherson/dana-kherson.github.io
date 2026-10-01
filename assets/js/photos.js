// Select before creating image elements: only the chosen photos can request images.
document.querySelectorAll('#photos .photo-grid[data-random-count]').forEach((grid) => {
  const photos = [...(window.danaGalleryPhotos || [])];
  const count = Math.min(Number(grid.dataset.randomCount) || 8, photos.length);
  const fragment = document.createDocumentFragment();
  const base = new URL(grid.dataset.galleryBase || './', document.baseURI);

  // Partial Fisher–Yates: uniform sampling without replacement.
  for (let i = 0; i < count; i += 1) {
    const j = i + Math.floor(Math.random() * (photos.length - i));
    [photos[i], photos[j]] = [photos[j], photos[i]];
    const photo = photos[i];
    const figure = document.createElement('figure');
    figure.className = 'col-lg-4 col-md-6 portfolio-item gallery__item';
    const link = document.createElement('a');
    link.className = 'portfolio-content photo-preview d-block h-100';
    link.href = new URL(photo.src, base).href;
    link.setAttribute('aria-label', 'Open photo ' + (i + 1));
    link.dataset.pswpWidth = photo.width;
    link.dataset.pswpHeight = photo.height;
    const preview = document.createElement('img');
    preview.className = 'img-fluid';
    preview.alt = photo.alt;
    preview.loading = 'lazy';
    preview.decoding = 'async';
    preview.width = photo.width;
    preview.height = photo.height;
    preview.src = link.href;
    link.appendChild(preview);
    figure.appendChild(link);
    fragment.appendChild(figure);
  }
  grid.insertBefore(fragment, grid.querySelector('[data-gallery-link]'));
});

document.querySelectorAll('#photos .photo-grid a.photo-preview').forEach((link) => {
  const [width, height] = (link.dataset.size || '').split('x');
  const preview = link.querySelector('img');
  const sourceWidth = Number(width || link.dataset.pswpWidth);
  const sourceHeight = Number(height || link.dataset.pswpHeight);

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

    // Publii correctly rotates the generated WebP, while the source metadata
    // can still contain the pre-rotation dimensions. PhotoSwipe must receive
    // the dimensions of the file it actually opens.
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
});

const lightbox = new PhotoSwipeLightbox({
  gallery: '#photos .photo-grid',
  children: 'a.photo-preview',
  pswpModule: PhotoSwipe,
  bgOpacity: 0.8
});
lightbox.init();

