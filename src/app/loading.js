'use client';

import { useEffect } from 'react';

const TEMPLATE = `
  <div class="page-loader__brush" aria-hidden="true"></div>
  <div class="page-loader__content">
    <div class="page-loader__logo">
      <img src="/images/logo.webp" alt="" width="220" height="50" />
    </div>
    <div class="page-loader__bar" aria-hidden="true">
      <span class="page-loader__bar-indicator"></span>
    </div>
  </div>
  <span class="page-loader__sr">Yuklanmoqda…</span>
`;

export default function Loading() {
  useEffect(() => {
    const el = document.createElement('div');
    el.className = 'page-loader';
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', 'polite');
    el.innerHTML = TEMPLATE;
    document.body.appendChild(el);

    requestAnimationFrame(() => el.classList.add('page-loader--visible'));

    return () => {
      el.classList.remove('page-loader--visible');
      el.classList.add('page-loader--exiting');
      const EXIT_MS = 450;
      const timer = setTimeout(() => el.remove(), EXIT_MS);
      el.dataset.exitTimer = String(timer);
    };
  }, []);

  return null;
}
