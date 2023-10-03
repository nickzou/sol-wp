const camelCase = (str: string): string => {
  const words = str.split(/[\s_-]+/);

  return words
    .map((word, index) => {
      if (index === 0) {
        return word.toLowerCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join("");
};

export default camelCase;
