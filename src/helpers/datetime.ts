import moment from 'moment';

export const getdddMMMDDDateFromISODate = (dateStr?: string) => {
  if (dateStr) {
    return moment(dateStr).format('ddd, MMM DD');
  }
  return '';
};

export const getDaysAgoFromISODate = (dateStr?: string) => {
  if (dateStr) {
    return moment(dateStr).startOf('day').fromNow();
  }
  return '';
};
