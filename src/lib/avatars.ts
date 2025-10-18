
const avatarStyles = [
  'initials',
  'adventurer',
  'micah',
  'bottts',
  'pixel-art',
  'lorelei',
  'identicon',
  'notionists',
];

export const avatars = avatarStyles.map((style, index) => {
  const seed = `genesis-vault-${index}`;
  return {
    id: `avatar${index + 1}`,
    url: `https://api.dicebear.com/8.x/${style}/svg?seed=${seed}`,
    hint: `${style} avatar`,
  };
});
