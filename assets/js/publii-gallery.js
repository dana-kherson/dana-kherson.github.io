document.querySelectorAll('.dana-gallery-content .gallery').forEach((gallery) => {
  [...gallery.querySelectorAll(':scope > .gallery__item')]
    .reverse()
    .forEach((item) => gallery.appendChild(item));

  const items = [...gallery.querySelectorAll(':scope > .gallery__item')];
  const links = items.map((item) => item.querySelector(':scope > a')).filter(Boolean);
  const pageSize = 15;
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));
  const requestedPage = Number.parseInt(new URLSearchParams(window.location.search).get('page'), 10);
  const currentPage = Math.min(Math.max(Number.isFinite(requestedPage) ? requestedPage : 1, 1), pageCount);

  items.forEach((item, index) => {
    const itemPage = Math.floor(index / pageSize) + 1;
    item.hidden = itemPage !== currentPage;
  });

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

  if (pageCount > 1) {
    const pagination = document.createElement('nav');
    pagination.className = 'photos-pagination';
    pagination.id = 'gallery-pagination';
    pagination.setAttribute('aria-label', 'Gallery pages');

    const pageUrl = (page) => {
      const url = new URL(window.location.href);
      if (page === 1) {
        url.searchParams.delete('page');
      } else {
        url.searchParams.set('page', page);
      }
      url.hash = '';
      return url.href;
    };

    const addLink = (label, page, options = {}) => {
      if (options.disabled) {
        const element = document.createElement('span');
        element.textContent = label;
        element.setAttribute('aria-disabled', 'true');
        pagination.appendChild(element);
        return;
      }

      const link = document.createElement('a');
      link.href = pageUrl(page);
      link.textContent = label;

      if (options.current) {
        link.setAttribute('aria-current', 'page');
        link.setAttribute('aria-label', `Page ${page}, current page`);
      } else {
        link.setAttribute('aria-label', options.label || `Go to page ${page}`);
      }

      pagination.appendChild(link);
    };

    addLink('Previous', currentPage - 1, {
      disabled: currentPage === 1,
      label: 'Go to previous gallery page'
    });

    const visiblePages = new Set([1, pageCount]);
    for (let page = currentPage - 2; page <= currentPage + 2; page += 1) {
      if (page >= 1 && page <= pageCount) visiblePages.add(page);
    }

    let previousPage = 0;
    [...visiblePages].sort((a, b) => a - b).forEach((page) => {
      if (page - previousPage > 1) {
        const ellipsis = document.createElement('span');
        ellipsis.className = 'photos-pagination__ellipsis';
        ellipsis.textContent = '…';
        ellipsis.setAttribute('aria-hidden', 'true');
        pagination.appendChild(ellipsis);
      }

      addLink(String(page), page, { current: page === currentPage });
      previousPage = page;
    });

    addLink('Next', currentPage + 1, {
      disabled: currentPage === pageCount,
      label: 'Go to next gallery page'
    });

    gallery.insertAdjacentElement('afterend', pagination);
  }

  const lightbox = new PhotoSwipeLightbox({
    gallery,
    children: '.gallery__item:not([hidden]) > a',
    pswpModule: PhotoSwipe,
    bgOpacity: 0.8
  });

  lightbox.init();
});
