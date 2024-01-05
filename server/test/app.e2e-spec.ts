import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PostsModule } from '@src/posts/posts.module';
import { readFileSync } from 'fs';
import { Data } from '@src/types/data';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/', () => {
    describe('[GET]', () => {
      it('Ok', () => {
        return request(app.getHttpServer())
          .get('/')
          .expect(HttpStatus.OK)
          .expect('서버와 통신을 할 수 있습니다.');
      });
    });
  });
});

describe('PostsController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PostsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/posts', () => {
    describe('[ALL]', () => {
      it('Headers["User-Last-Name"] X => Forbidden 403', async () => {
        const response = await request(app.getHttpServer()).get('/posts');

        expect(response.status).toEqual(403);
      });
    });

    describe('/', () => {
      describe('[GET]', () => {
        it('Ok', async () => {
          const response = await request(app.getHttpServer())
            .get('/posts')
            .set('User-Last-Name', 'm');

          expect(response.body.statusCode).toEqual(200);
          expect(response.body).toBeDefined();
          expect(Array.isArray(response.body.data)).toBeTruthy();
        });
      });

      describe('[POST]', () => {
        it('Ok', async () => {
          const createPostDTO = {
            title: '제목test',
            content: '내용test',
          };

          const response = await request(app.getHttpServer())
            .post(`/posts`)
            .set('User-Last-Name', 'm')
            .send(createPostDTO);

          expect(response.body.statusCode).toEqual(200);
          expect(response.body).toBeDefined();
          expect(!!response.body.data).toBeTruthy();
        });

        it('no title => 400', async () => {
          const createPostDTO = {
            title: '',
            content: '내용test',
          };

          const response = await request(app.getHttpServer())
            .post(`/posts`)
            .set('User-Last-Name', 'm')
            .send(createPostDTO);

          expect(response.status).toEqual(400);
        });

        it('no content => 400', async () => {
          const createPostDTO = {
            title: '제목test',
            content: '',
          };

          const response = await request(app.getHttpServer())
            .post(`/posts`)
            .set('User-Last-Name', 'm')
            .send(createPostDTO);

          expect(response.status).toEqual(400);
        });
      });
    });

    describe('/:id', () => {
      describe('[GET]', () => {
        it('Ok', async () => {
          const id = 10;

          const response = await request(app.getHttpServer())
            .get(`/posts/${id}`)
            .set('User-Last-Name', 'm');

          expect(response.body.statusCode).toEqual(200);
          expect(response.body).toBeDefined();
          expect(!!response.body.data).toBeTruthy();
        });
        it('wrong id => 404', async () => {
          const id = Date.now();

          const response = await request(app.getHttpServer())
            .get(`/posts/${id}`)
            .set('User-Last-Name', 'm');

          expect(response.status).toEqual(404);
        });
      });
      describe('[PUT]', () => {
        it('Ok', async () => {
          const id = 10;
          const updatePostDTO = { title: '제목test', content: '내용test' };

          const response = await request(app.getHttpServer())
            .put(`/posts/${id}`)
            .set('User-Last-Name', 'm')
            .send(updatePostDTO);

          expect(response.body.statusCode).toEqual(200);
          expect(response.body).toBeDefined();
          expect(!!response.body.data).toBeTruthy();
        });
        it('empty content => 400', async () => {
          const id = 10;

          const emptyUpdatePostDTO = {};

          const response = await request(app.getHttpServer())
            .put(`/posts/${id}`)
            .set('User-Last-Name', 'm')
            .send(emptyUpdatePostDTO);

          expect(response.status).toEqual(400);
        });
        it('wrong id => 404', async () => {
          const id = Date.now();
          const updatePostDTO = {
            title: '제목test',
            content: '내용test',
          };

          const response = await request(app.getHttpServer())
            .put(`/posts/${id}`)
            .set('User-Last-Name', 'm')
            .send(updatePostDTO);

          expect(response.status).toEqual(404);
        });
      });
      describe('[DELETE]', () => {
        it('Ok', async () => {
          const data: Data = JSON.parse(
            readFileSync('./src/database/board.json', 'utf-8'),
          );

          const id = data.posts[data.posts.length - 1].id;

          const response = await request(app.getHttpServer())
            .delete(`/posts/${id}`)
            .set('User-Last-Name', 'm');

          expect(response.body.statusCode).toEqual(200);
          expect(response.body).toBeDefined();
          expect(!!response.body.data).toBeTruthy();
        });

        it('wrong id => 404', async () => {
          const id = Date.now();

          const response = await request(app.getHttpServer())
            .delete(`/posts/${id}`)
            .set('User-Last-Name', 'm');

          expect(response.status).toEqual(404);
        });
      });
    });

    describe('/paging', () => {
      describe('[GET]', () => {
        it('Ok', async () => {
          const response = await request(app.getHttpServer())
            .get('/posts/paging')
            .query({ page: 1, size: 10 })
            .set('User-Last-Name', 'm');

          expect(response.body.statusCode).toEqual(200);
          expect(response.body).toBeDefined();
          expect(Array.isArray(response.body.data.list)).toBeTruthy();
        });

        it('zero page or zero size => 400', async () => {
          const response = await request(app.getHttpServer())
            .get('/posts/paging')
            .query({ page: 0, size: 10 })
            .set('User-Last-Name', 'm');

          expect(response.status).toEqual(400);
        });
      });
    });
  });
});
