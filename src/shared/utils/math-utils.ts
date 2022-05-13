export class MathUtils {
  static roundToTen(number: number) {
    return Math.ceil(number / 10) * 10;
  }

  static sumAllNumbers(numbers: number[]): number {
    return numbers.reduce((acc: number, number: number) => {
      if (number >= 10) {
        const result = String(number)
          .split('')
          .map((n) => parseInt(n));

        return acc + this.sumAllNumbers(result);
      }

      return acc + number;
    }, 0);
  }

  static getTenModule(number: number) {
    return number % 10;
  }

  static formatAmount(amount: string) {
    const value = amount.slice(0, -2);
    const cents = amount.slice(-2);

    return parseFloat(`${value}.${cents}`).toFixed(2);
  }
}
