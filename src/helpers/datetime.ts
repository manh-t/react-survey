import { format, parseISO, formatDistanceStrict } from 'date-fns';

export const getShortDateFormat = (dateStr?: string) => {
  if (dateStr) {
    return format(parseISO(dateStr), 'E, MMM dd');
  }
  return '';
};

export const getDaysAgoFromISODate = (dateStr?: string) => {
  if (dateStr) {
    return formatDistanceStrict(parseISO(dateStr), new Date(), { addSuffix: true });
  }
  return '';
};
