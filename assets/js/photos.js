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

