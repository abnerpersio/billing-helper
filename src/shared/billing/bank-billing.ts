import { BAR_CODE_BANK_REGEX } from '../constants/billing';
import { BillingModule } from '../utils/billing-module';
import { DateUtils } from '../utils/date-utils';
import { MathUtils } from '../utils/math-utils';

export class BankBilling {
  constructor(private digitableLine: string) {}

  isValid() {
    const { digitableLine } = this;

    const hasFirstBlock = digitableLine.length >= 10;
    const hasSecondBlock = digitableLine.length >= 21;
    const hasThirdBlock = digitableLine.length >= 32;
    const hasFourthBlock = digitableLine.length >= 50;

    if (hasFirstBlock) {
      const number = digitableLine.substring(0, 9);
      const digit = parseInt(digitableLine.charAt(9));
      const DV = BillingModule.getVerificator(number, 'module10');

      if (DV !== digit) return false;
    }

    if (hasSecondBlock) {
      const number = digitableLine.substring(10, 20);
      const digit = parseInt(digitableLine.charAt(20));
      const DV = BillingModule.getVerificator(number, 'module10');

      if (DV !== digit) return false;
    }

    if (hasThirdBlock) {
      const number = digitableLine.substring(21, 31);
      const digit = parseInt(digitableLine.charAt(31));
      const DV = BillingModule.getVerificator(number, 'module10');

      if (DV !== digit) return false;
    }

    if (hasFourthBlock) {
      const converted = this.digitableToCode();

      if (!this.validateConvertedCode(converted)) return false;
    }

    return true;
  }

  getBarCode() {
    return this.digitableToCode();
  }

  getAmount() {
    const amount = this.digitableLine.substring(37, 47);
    return MathUtils.formatAmount(amount);
  }

  getDueDate(format = 'YYYY-MM-DD') {
    const dueDateFactor = this.digitableLine.substring(33, 37);

    const date = DateUtils.fromFactor(dueDateFactor);
    return DateUtils.toFormat(date, format);
  }

  private validateConvertedCode(barCode: string) {
    const regex = new RegExp(BAR_CODE_BANK_REGEX);
    if (!barCode.match(regex)) return false;

    const numbers = barCode.substring(0, 4) + barCode.substring(5);
    const digit = parseInt(barCode[4]);
    const DV = BillingModule.getVerificator(numbers, 'module11');

    return DV === digit;
  }

  private digitableToCode() {
    const { digitableLine } = this;

    let formated = '';
    formated += digitableLine.substring(0, 3); // Banco
    formated += digitableLine.substring(3, 4); // Código da moeda
    formated += digitableLine.substring(32, 33); // DV
    formated += digitableLine.substring(33, 37); // Fator de Vencimento
    formated += digitableLine.substring(37, 47); // Valor nominal
    formated += digitableLine.substring(4, 9); // Campo Livre 1
    formated += digitableLine.substring(10, 20); // Campo Livre 2
    formated += digitableLine.substring(21, 31); // Campo Livre 3
    return formated;
  }
}
