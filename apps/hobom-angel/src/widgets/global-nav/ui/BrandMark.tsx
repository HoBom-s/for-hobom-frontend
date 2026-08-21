// Claude Design의 녹색 타일과 발자국을 재현한 내비게이션 브랜드 마크
export const BrandMark = () => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id="hb-brand-mark" x1="4" y1="3" x2="26" y2="28">
        <stop stopColor="var(--hb-color-success)" />
        <stop offset="1" stopColor="var(--hb-color-accent-dark)" />
      </linearGradient>
    </defs>
    <rect width="30" height="30" rx="11" fill="url(#hb-brand-mark)" />
    <g transform="translate(3 3)" fill="var(--hb-color-accent-contrast)">
      <circle cx="6.4" cy="7" r="2.1" />
      <circle cx="11" cy="4.8" r="2.2" />
      <circle cx="15.8" cy="6.1" r="2.1" />
      <circle cx="18.4" cy="10.2" r="2" />
      <path d="M7.2 15.1c.4-3 2.7-5.2 5.4-5.2 2.9 0 5.3 2.5 5.3 5.6 0 2.3-1.5 3.8-3.7 3.8-1 0-1.8-.4-2.6-.4-.8 0-1.8.6-2.8.6-2 0-3.2-1.4-3.2-3.1 0-.6.3-1 .7-1.3.3-.2.6-.1.9 0Z" />
    </g>
  </svg>
);
