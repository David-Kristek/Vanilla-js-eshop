const createReplaceWith = (replacements) => (match, p1) => {
  if (replacements.hasOwnProperty(p1)) {
    return replacements[p1];
  }
  return match;
};

const replace = (str, replacements) => {
  const replacePlaceholder = createReplaceWith(replacements);
  const regex = /{([^}]+)}/g;
  return str.replace(regex, replacePlaceholder);
};
