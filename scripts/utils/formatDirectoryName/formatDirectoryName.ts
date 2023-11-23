const formatDirectoryName = (input: string): string => {
  return input.trim().replace(/\s+/g, "-").toLowerCase();
};

export default formatDirectoryName;
