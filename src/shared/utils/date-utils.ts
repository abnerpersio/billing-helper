import dayjs, { ConfigType } from 'dayjs';

export class DateUtils {
  static toFormat(date: ConfigType, format: string) {
    return dayjs(date).format(format);
  }

  static fromFactor(factor: string) {
    const baseDate = '1997-10-07';
    const passedDays = parseInt(factor);

    return dayjs(baseDate).add(passedDays, 'days');
  }

  static fromCustomFormat(date: string, format: string) {
    return dayjs(date, format);
  }
}
