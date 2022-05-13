import { BAR_CODE_ARRECADATION_REGEX, DIGITABLE_ARRECADATION_REGEX } from '../constants/billing';
import { BillingModule } from '../utils/billing-module';
import { DateUtils } from '../utils/date-utils';
import { MathUtils } from '../utils/math-utils';

export class ArrecadationBilling {
  private currencyCode: number;
  private verificatorType: 'module10' | 'module11Arrecadation' | null;

  constructor(private digitableLine: string) {
    this.currencyCode = parseInt(digitableLine.charAt(2));
    this.verificatorType = this.getVerificatorType();
  }

  isValid() {
    const { digitableLine } = this;

    if (!this.verificatorType) return false;

    const size = Math.trunc(digitableLine.length / 12);

    const blocks = Array.from({ length: size }, (_, index) => {
      const start = 11 * index + index;
      const end = 11 * (index + 1) + index;

      return {
        number: digitableLine.substring(start, end),
        DV: digitableLine.charAt(end),
      };
    });

    for (const block of blocks) {
      const { number } = block;

      const DV = parseInt(block.DV);
      const digit = BillingModule.getVerificator(number, this.verificatorType);

      if (digit !== DV) return false;
    }

    const regex = new RegExp(DIGITABLE_ARRECADATION_REGEX);

    if (!digitableLine.match(regex)) return false;
    if (parseInt(digitableLine[0]) !== 8) return false;

    const converted = this.digitableToCode();
    if (!this.validateConvertedCode(converted)) return false;

    return true;
  }

  getBarCode() {
    return this.digitableToCode();
  }

  getAmount() {
    const barCode = this.digitableToCode();
    const amount = barCode.substring(4, 15);

    return MathUtils.formatAmount(amount);
  }

  getDueDate(format = 'YYYY-MM-DD') {
    const barCode = this.digitableToCode();
    const dueDateFactor = barCode.substring(19, 27);

    const date = DateUtils.fromCustomFormat(dueDateFactor, 'YYYYMMDD');
    return DateUtils.toFormat(date, format);
  }

  private validateConvertedCode(barCode: string) {
    const regex = new RegExp(BAR_CODE_ARRECADATION_REGEX);
    if (!barCode.match(regex)) return false;

    if (!this.verificatorType) return false;

    const number = barCode.substring(0, 3) + barCode.substring(4);
    const DV = parseInt(barCode.charAt(3));
    const digit = BillingModule.getVerificator(number, this.verificatorType);

    return digit === DV;
  }

  private digitableToCode() {
    const { digitableLine } = this;

    let formated = '';
    formated += digitableLine.substring(0, 11);
    formated += digitableLine.substring(12, 23);
    formated += digitableLine.substring(24, 35);
    formated += digitableLine.substring(36, 47);
    return formated;
  }

  private getVerificatorType() {
    const { currencyCode } = this;
    if (currencyCode === 6 || currencyCode === 7) return 'module10';
    if (currencyCode === 8 || currencyCode === 9) return 'module11Arrecadation';
    return null;
  }
}
