export const size = { width: 32, height: 32 };
export const contentType = 'image/svg+xml';

/** Custom favicon: a hand-drawn ink-line mark, matching the site's typographic identity. */
export default function Icon() {
  return new Response(
    `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
      <rect width="32" height="32" rx="6" fill="#1A1225"/>
      <path d="M6 22 C 10 10, 15 10, 16 16 C 17 22, 22 22, 26 8" stroke="#E8A548" stroke-width="2" stroke-linecap="round" fill="none"/>
    </svg>`,
    { headers: { 'Content-Type': contentType } }
  );
}
