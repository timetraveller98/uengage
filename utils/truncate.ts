export const truncateWords = (text: string, wordLimit: number = 5): string => {
  const words = text.split(" ");
  if (words.length <= wordLimit) return text;
  return `${words.slice(0, wordLimit).join(" ")}...`;
};
