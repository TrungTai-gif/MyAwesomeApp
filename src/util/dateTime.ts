import moment from 'moment-timezone';

export const formatVietnamTime = (dateTime: string): string => {
  return moment
    .utc(dateTime)
    .tz('Asia/Ho_Chi_Minh')
    .format('DD/MM/YYYY HH:mm:ss');
};
