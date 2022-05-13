import { ArrecadationBilling } from './arrecadation-billing';

describe(ArrecadationBilling.name, () => {
  it('should return due date correctly', () => {
    const digitableLine = '826400000004902004252026205100000194270420220500';

    const billing = new ArrecadationBilling(digitableLine);

    expect(billing.getDueDate()).toBe('2022-05-10');
  });

  it('should return amount correctly', () => {
    const digitableLine = '826400000004902004252026205100000194270420220500';

    const billing = new ArrecadationBilling(digitableLine);

    expect(billing.getAmount()).toBe('90.20');
  });

  it('should return bar code correctly', () => {
    const digitableLine = '826400000004902004252026205100000194270420220500';

    const billing = new ArrecadationBilling(digitableLine);

    expect(billing.getBarCode()).toBe('82640000000902004252022051000001927042022050');
  });

  it('should validate arracadation billing with different currency code', () => {
    const digitableLine = '828400000004902004252026205100000194270420220500';

    const billing = new ArrecadationBilling(digitableLine);

    expect(billing.isValid()).toBe(false);
  });

  it('should return false if size is different then 48', () => {
    const digitableLine = '428400000004902004252026205100000194270420220500222';

    const billing = new ArrecadationBilling(digitableLine);

    expect(billing.isValid()).toBe(false);
  });

  it('should return false if first char is not "8"', () => {
    const digitableLine = '428400000004902004252026205100000194270420220500';

    const billing = new ArrecadationBilling(digitableLine);

    expect(billing.isValid()).toBe(false);
  });

  it('should return invalid converted bar code', () => {
    const digitableLine = '826400000004902004252026205100000194270420220800';

    const billing = new ArrecadationBilling(digitableLine);

    expect(billing.isValid()).toBe(false);
  });
});
