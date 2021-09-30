import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { initializeDatabase } from './db.utils';

describe('BookController (e2e)', () => {
  let app: INestApplication;
  let server;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    app.useLogger(false);

    await app.init();
    server = app.getHttpServer();

    await initializeDatabase();
  });

  it('GET /books', () => {
    return request(server)
      .get('/books')
      .expect(200)
      .expect([{ id: 1, name: 'My Book', isbn: '95454546' }]);
  });

  describe('POST', () => {
    it('/books - OK', () => {
      return request(server)
        .post('/books')
        .send({ name: 'My Book 2', isbn: '95454547' })
        .expect(201)
        .expect({ id: 2, name: 'My Book 2', isbn: '95454547' });
    });

    it.each([
      { name: 'My other book' },
      { isbn: '95454547' },
      {}
    ])(
      '/books - BAD REQUEST',
      (book) => {
        return request(server).post('/books').send(book).expect(400);
      },
    );
  });
});
