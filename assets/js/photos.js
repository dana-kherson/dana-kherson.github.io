document.querySelectorAll('#photos .photo-grid a.photo-preview').forEach((link) => {
  const [width, height] = (link.dataset.size || '').split('x');
  const preview = link.querySelector('img');
  const sourceWidth = Number(width || link.dataset.pswpWidth);
  const sourceHeight = Number(height || link.dataset.pswpHeight);

  if (preview && /-thumbnail\.webp(?:$|[?#])/.test(preview.src)) {
    link.href = preview.src;
  }

  if (sourceWidth && sourceHeight) {
    const displayWidth = Math.min(sourceWidth, 1400);
    link.dataset.pswpWidth = displayWidth;
    link.dataset.pswpHeight = Math.round(sourceHeight * displayWidth / sourceWidth);
  }
});

const lightbox = new PhotoSwipeLightbox({
  gallery: '#photos .photo-grid',
  children: 'a.photo-preview',
  pswpModule: PhotoSwipe,
  bgOpacity: 0.8
});
lightbox.init();
