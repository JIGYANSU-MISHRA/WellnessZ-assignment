export const generateStatus = () => {
  // Slight bias towards "Active" to feel more realistic
  return Math.random() > 0.3 ? 'Active' : 'Inactive';
};

export const getInitials = (name) => {
  if (!name) return '';
  // Take first letter of each word, uppercase, then limit to 2 characters
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

