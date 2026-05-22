export const normalizeArabic = (text: string): string => {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/[أإآا]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/[ىي]/g, 'ي')
    .replace(/ظ/g, 'ظ')
    .replace(/ط/g, 'ط')
    .replace(/[ـ\s]/g, '') // Remove tatweel and spaces if we want strict match, but wait, if user types two words, spaces are needed.
    // Let's just normalize characters
    .replace(/[\u064B-\u065F]/g, ''); // Remove Arabic diacritics
};

export const normalizeForSearch = (text: string): string => {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/[أإآا]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/[ىي]/g, 'ي')
    .replace(/[\u064B-\u065F]/g, ''); // Remove Arabic diacritics
};

export const customSearch = (query: string, text: string): boolean => {
  if (!query) return true;
  const normalizedQuery = normalizeForSearch(query);
  const normalizedText = normalizeForSearch(text);
  
  // Break into words ? Or just simple includes
  // "سواء في بدايه الكلمه او نهايتها المهم ان تكون الحروف مرتبطه ببعض"
  // This means normalizedText.includes(normalizedQuery) is sufficient.
  return normalizedText.includes(normalizedQuery);
};
