export const parseAsIdentifier = (label: string) => {
  return label.replace(/\s\s+/g, "-").toLowerCase();
};
