const hasDuplicateKeys = <T extends object>(arr: T[]): boolean => {
  const keys = new Set<string>();

  for (const obj of arr) {
    for (const key in obj) {
      if (keys.has(key)) {
        return true;
      }
      keys.add(key);
    }
  }

  return false;
};

export default hasDuplicateKeys;
