export const isValidLocation = (location: string): boolean => {
  if (!location || location.length < 2 || /^[0-9\s]+$/.test(location)) {
    return false;
  }

  return true;
};
