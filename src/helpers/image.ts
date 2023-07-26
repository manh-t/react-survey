export const getHighResolutionImage = (url?: string): string => {
  if (url) {
    return `${url}l`;
  }
  return '';
};
