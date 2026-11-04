/**
 * Photo gallery lightbox: click a thumbnail to view the full-size photo.
 * Keyboard: Esc closes, Left/Right navigate. Swipe on touch devices.
 */
(function() {
    'use strict';

    const box = document.getElementById('lightbox');
    if (!box) return;

    const items = Array.from(document.querySelectorAll('.photo-item'));
    const img = box.querySelector('.lightbox-img');
    const caption = box.querySelector('.lightbox-caption');
    const labels = {
        en: { day1: 'Day 1', day2: 'Day 2', of: 'of', download: 'Open full size' },
        pt: { day1: 'Dia 1', day2: 'Dia 2', of: 'de', download: 'Abrir em tamanho original' }
    };
    let current = -1;
    let lastFocus = null;

    function preload(i) {
        if (items[i]) new Image().src = items[i].href;
    }

    function show(i) {
        current = (i + items.length) % items.length;
        const item = items[current];
        const day = item.closest('.photo-day');
        const dayItems = Array.from(day.querySelectorAll('.photo-item'));
        const t = labels[document.documentElement.lang] || labels.en;

        img.src = item.href;
        img.alt = item.querySelector('img').alt;
        caption.textContent = '';
        caption.append(`${t[day.id]} · ${dayItems.indexOf(item) + 1} ${t.of} ${dayItems.length} · `);
        const link = document.createElement('a');
        link.href = item.href;
        link.target = '_blank';
        link.rel = 'noopener';
        link.textContent = t.download;
        caption.append(link);

        preload(current + 1);
        preload(current - 1);
    }

    function open(i) {
        lastFocus = document.activeElement;
        box.hidden = false;
        document.body.style.overflow = 'hidden';
        show(i);
        box.querySelector('.lightbox-close').focus();
    }

    function close() {
        box.hidden = true;
        img.removeAttribute('src');
        document.body.style.overflow = '';
        if (lastFocus) lastFocus.focus();
    }

    items.forEach((item, i) => {
        item.addEventListener('click', e => {
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
            e.preventDefault();
            open(i);
        });
    });

    box.querySelector('.lightbox-close').addEventListener('click', close);
    box.querySelector('.lightbox-prev').addEventListener('click', () => show(current - 1));
    box.querySelector('.lightbox-next').addEventListener('click', () => show(current + 1));
    box.addEventListener('click', e => {
        if (e.target === box || e.target.classList.contains('lightbox-figure')) close();
    });

    document.addEventListener('keydown', e => {
        if (box.hidden) return;
        if (e.key === 'Escape') close();
        else if (e.key === 'ArrowLeft') show(current - 1);
        else if (e.key === 'ArrowRight') show(current + 1);
    });

    let touchX = null;
    box.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
    box.addEventListener('touchend', e => {
        if (touchX === null) return;
        const dx = e.changedTouches[0].clientX - touchX;
        if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
        touchX = null;
    });
})();
