import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from '@/modules/app/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  const mockAuthService = {
    getAll: jest.fn(),
    get: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  let acessToken: string;

  const randomString = (Math.random() + 1).toString(36).substring(7);

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('/auth/register (POST)', () => {
    const registerPayload = {
      fullName: 'Test',
      username: 'test',
      email: `${randomString}@mail.com`,
      password: 'test123',
    };

    jest.spyOn(mockAuthService, 'create');

    return request(app.getHttpServer())
      .post('/auth/register')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send(registerPayload)
      .expect(201);
  });

  it('/auth/login (POST)', async () => {
    const loginPayload = {
      email: `${randomString}@mail.com`,
      password: 'test123',
    };

    jest.spyOn(mockAuthService, 'create');

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send(loginPayload);

    acessToken = response.body?.accessToken;

    expect(response.status).toEqual(201);
  });

  it('/user/info (GET)', async () => {
    jest.spyOn(mockAuthService, 'get');

    return request(app.getHttpServer())
      .get('/user/info')
      .set('Authorization', `Bearer ${acessToken}`)
      .expect(200);
  });
});
