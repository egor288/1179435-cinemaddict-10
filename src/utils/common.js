import moment from 'moment';
export const formatTime = (filmDuration) => {
  const hours = moment.utc().hours(Math.floor(filmDuration / 60)).format(`h`);
  const minutes = moment.utc().minutes(Math.round(filmDuration % 60)).format(`mm`);
  return `${hours}h ${minutes}m`;
};

export const formatDate = (year, month, day) => {
  return moment(new Date(year, month, day)).format(`DD MMMM YYYY`);
};

export const formatDateForComment = (date) => {
  return moment(new Date(date)).format(`YYYY/MM/DD h:mm`);
};


