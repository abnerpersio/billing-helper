import request from 'supertest';

import { server } from '../../server';
import { CorsMiddleware } from './cors-middleware';

describe(CorsMiddleware.name, () => {
  it('should insert CORS headers', async () => {
    const response = await request(server).get(`/health`);

    expect(response.headers).toHaveProperty('access-control-allow-origin');
    expect(response.headers).toHaveProperty('access-control-allow-methods');
    expect(response.headers).toHaveProperty('access-control-allow-headers');
    expect(response.headers).toHaveProperty('access-control-max-age');
  });
});
