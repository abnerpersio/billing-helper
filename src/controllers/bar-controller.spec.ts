import request from 'supertest';

import { server } from '../server';
import { BarController } from './bar-controller';

describe(BarController.name, () => {
  it.each([['12345'], ['ABCDEFG'], ['123456789'], ['123A45B7890']])(
    'should return that digitable line is invalid',
    async (digitableLine) => {
      const response = await request(server).get(`/boleto/${digitableLine}`);

      expect(response.status).toBe(400);
      expect(response.body).toStrictEqual({
        success: false,
        message: 'Invalid digitable line',
      });
    },
  );

  it('should parse bank billing code correctly', async () => {
    const digitableLine = '23790150079128100000901001494002187890000100000';

    const response = await request(server).get(`/boleto/${digitableLine}`);

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({
      barCode: '23791878900001000000150091281000000100149400',
      amount: '1000.00',
      expirationDate: '2021-10-30',
    });
  });

  it('should return invalid digitable line for bank billing', async () => {
    const digitableLine = '2379015007912810000021201001494002187890000100000';

    const response = await request(server).get(`/boleto/${digitableLine}`);

    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({
      success: false,
      message: 'Invalid digitable line for billing',
    });
  });

  it('should parse arrecadation billing code correctly', async () => {
    const digitableLine = '826400000004902004252026205100000194270420220500';

    const response = await request(server).get(`/boleto/${digitableLine}`);

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({
      barCode: '82640000000902004252022051000001927042022050',
      amount: '90.20',
      expirationDate: '2022-05-10',
    });
  });

  it('should return invalid digitable line for arrecadation billing', async () => {
    const digitableLine = '826400000004902004252026752100000194270420220500';

    const response = await request(server).get(`/boleto/${digitableLine}`);

    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({
      success: false,
      message: 'Invalid digitable line for billing',
    });
  });
});
