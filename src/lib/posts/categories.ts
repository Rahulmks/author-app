export const postCategories = [
  'கதை',
  'கட்டுரை',
  'அனுபவ பகிர்வு',
  'விமர்சனம்',
  'வாசகர் கடிதம்',
  'சினிமா',
  'வகுப்பு',
  'அறிவிப்புகள்',
  'நேர்காணல்',
] as const;

const legacyCategoryAliases: Record<string, string> = {
  'சிறுகதை': 'கதை',
  'குறுங்கற்பனை கதைகள்': 'கதை',
  Essays: 'கட்டுரை',
  'சிந்தனைகள்': 'கட்டுரை',
  Reflections: 'கட்டுரை',
  'காப்பிய இலக்கியம்': 'கட்டுரை',
  'Epic Literature': 'கட்டுரை',
  'இலக்கிய விமர்சனம்': 'விமர்சனம்',
  'Literary Criticism': 'விமர்சனம்',
  'புதின ஆய்வு': 'விமர்சனம்',
  'Novel Study': 'விமர்சனம்',
};

export function getCanonicalPostCategory(category?: string) {
  if (!category) {
    return undefined;
  }

  const normalized = category.trim();
  return postCategories.includes(normalized as (typeof postCategories)[number])
    ? normalized
    : legacyCategoryAliases[normalized];
}

export function isPostInCategory(category: string | undefined, requestedCategory: string) {
  return getCanonicalPostCategory(category) === requestedCategory;
}