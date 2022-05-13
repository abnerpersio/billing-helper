import dayjs from 'dayjs';

import { DateUtils } from './date-utils';

describe(DateUtils.name, () => {
  it('toFormat should format correctly', () => {
    const result = DateUtils.toFormat('2022-03-15', 'DD/MM/YYYY');
    expect(result).toBe('15/03/2022');
  });

  it('fromFactor should return correctly', () => {
    const result = DateUtils.fromFactor('1001');

    expect(result).toStrictEqual(dayjs('2000-07-04'));
  });

  it('fromCustomFormat should return correctly', () => {
    const result = DateUtils.fromCustomFormat('20220315', 'YYYYMMDD');

    expect(result).toStrictEqual(dayjs('2022-03-15'));
  });
});
