import { MathUtils } from './math-utils';

export class BillingModule {
  static getVerificator(numbers: string, type: 'module10' | 'module11' | 'module11Arrecadation') {
    if (type === 'module10') return this.calculateModule10(numbers);
    if (type === 'module11') return this.calculateModule11(numbers);
    if (type === 'module11Arrecadation') return this.calculateArrecadationModule11(numbers);
  }

  static calculateModule10(numbers: string) {
    const reversed = numbers
      .split('')
      .reverse()
      .map((number) => parseInt(number));

    const result = this.multiplicateModule10(reversed);

    const sum = MathUtils.sumAllNumbers(result);
    // console.log({ sum });
    const tenRounded = MathUtils.roundToTen(sum);

    const subtract = tenRounded - sum;
    return MathUtils.getTenModule(subtract);
  }

  static multiplicateModule10(numbers: number[]) {
    return numbers.map((number: number, index: number) => {
      const position = index + 1;
      const multiplier = (position % 2) + 1;

      return number * multiplier;
    });
  }

  static calculateModule11(numbers: string) {
    const reversed = numbers
      .split('')
      .reverse()
      .map((number) => parseInt(number));

    const result = this.multiplicateModule11(reversed);

    const sum = MathUtils.sumAllNumbers(result);
    const rest = sum % 11;
    const DV = 11 - rest;

    if (DV === 0 || DV === 10 || DV === 11) return 1;
    return DV;
  }

  static multiplicateModule11(numbers: number[]) {
    let multiplier = 2;

    return numbers.map((number: number) => {
      multiplier += 1;
      if (multiplier > 9) multiplier = 2;

      console.log({ multiplier });
      return number * multiplier;
    });
  }

  static calculateArrecadationModule11(numbers: string) {
    const reversed = numbers
      .split('')
      .reverse()
      .map((number) => parseInt(number));

    const result = this.multiplicateModule11(reversed);

    const sum = MathUtils.sumAllNumbers(result);
    const rest = sum % 11;

    if (rest === 0 || rest === 1) return 0;
    if (rest === 10) return 1;

    const DV = 11 - rest;
    return DV;
  }
}
