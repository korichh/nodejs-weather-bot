export const isValidLocation = (location: string | undefined): boolean => {
  if (!location || location.length < 2) {
    return false;
  }

  const locationRegex = /[a-zA-Z]/;

  return locationRegex.test(location);
};

export const isValidTime = (time: string | undefined): boolean => {
  if (!time || time.length < 2) {
    return false;
  }

  const timeRegex = /^([0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

  return timeRegex.test(time);
};
