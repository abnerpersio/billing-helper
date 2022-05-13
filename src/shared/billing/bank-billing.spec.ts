import { BankBilling } from './bank-billing';

describe(BankBilling.name, () => {
  it('should return due date correctly', () => {
    const digitableLine = '23790150079128100000903001494008688610000050400';

    const billing = new BankBilling(digitableLine);

    expect(billing.getDueDate()).toBe('2022-01-10');
  });

  it('should return amount correctly', () => {
    const digitableLine = '23790150079128100000903001494008688610000050400';

    const billing = new BankBilling(digitableLine);

    expect(billing.getAmount()).toBe('504.00');
  });

  it('should return bar code correctly', () => {
    const digitableLine = '23790150079128100000903001494008688610000050400';

    const billing = new BankBilling(digitableLine);

    expect(billing.getBarCode()).toBe('23796886100000504000150091281000000300149400');
  });

  it('should get invalid bank billing with module11', () => {
    const digitableLine = '23790150079128100000901001494002187890000100000123';

    const billing = new BankBilling(digitableLine);
    expect(billing.isValid()).toBe(false);
  });

  it('should get valid bank billing with module11', () => {
    const digitableLine = '23790150079128100000901001494002187890000100001000';

    const billing = new BankBilling(digitableLine);
    expect(billing.isValid()).toBe(true);
  });
});
