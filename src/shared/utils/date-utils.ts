import dayjs, { ConfigType } from 'dayjs';

export class DateUtils {
  static toFormat(date: ConfigType, format: string) {
    return dayjs(date).format(format);
  }

  static dateFromFactor(factor: string) {
    const baseDate = '1997-10-07';
    const passedDays = parseInt(factor);

    return dayjs(baseDate).add(passedDays, 'days');
  }
}
