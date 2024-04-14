export const isValidName = (name?: unknown): name is string => {
  return !!name && typeof name === 'string';
};

export const isValidAge = (age?: unknown): age is number => {
  return !!age && typeof age === 'number';
};
