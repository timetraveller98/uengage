export const truncateLetters = (
  text: string,
  letterLimit: number = 10,
): string => {
  if (text.length <= letterLimit) return text;
  return `${text.slice(0, letterLimit)}...`;
};
