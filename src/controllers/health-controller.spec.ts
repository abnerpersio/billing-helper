import request from 'supertest';

import { server } from '../server';
import { HealthController } from './health-controller';

describe(HealthController.name, () => {
  it('should return that digitable ', async () => {
    const response = await request(server).get(`/health`);

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({
      message: 'ok',
    });
  });
});
