export const size = { width: 1200, height: 630 };
export const contentType = 'image/svg+xml';

/** Custom OG/share image matching the site's typographic identity — not an auto screenshot. */
export default function Image() {
  return new Response(
    `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
      <rect width="1200" height="630" fill="#1A1225"/>
      <text x="600" y="270" text-anchor="middle" font-family="Georgia, serif" font-size="26" letter-spacing="6" fill="#E8A548">EZHUTHAALAR ILLAM</text>
      <text x="600" y="340" text-anchor="middle" font-family="Georgia, serif" font-size="52" font-weight="600" fill="#F2E9E4">Stories, essays, and the quiet of memory</text>
      <path d="M516 400 C 546 388, 562 412, 590 400 S 634 388, 656 400 S 676 408, 684 398" stroke="#E8A548" stroke-width="2" fill="none" stroke-linecap="round"/>
    </svg>`,
    { headers: { 'Content-Type': contentType } }
  );
}

