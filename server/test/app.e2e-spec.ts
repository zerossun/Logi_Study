import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Post } from '@src/posts/posts';
import { PostsModule } from '@src/posts/posts.module';
import { Data } from '@src/types/data';
import { plainToInstance } from 'class-transformer';
import { readFileSync } from 'fs';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

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
          expect(plainToInstance(Post, response.body.data[0])).toBeInstanceOf(
            Post,
          );
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
          expect(plainToInstance(Post, response.body.data)).toBeInstanceOf(
            Post,
          );
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
          expect(plainToInstance(Post, response.body.data)).toBeInstanceOf(
            Post,
          );
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
          expect(plainToInstance(Post, response.body.data)).toBeInstanceOf(
            Post,
          );
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
          expect(plainToInstance(Post, response.body.data)).toBeInstanceOf(
            Post,
          );
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

    describe('/paginated', () => {
      describe('[GET]', () => {
        it('Ok', async () => {
          const response = await request(app.getHttpServer())
            .get('/posts/paginated')
            .query({ page: 1, size: 10 })
            .set('User-Last-Name', 'm');

          expect(response.body.statusCode).toEqual(200);
          expect(response.body).toBeDefined();
          expect(Array.isArray(response.body.data.list)).toBeTruthy();
          expect(
            plainToInstance(Post, response.body.data.list[0]),
          ).toBeInstanceOf(Post);
        });

        it('zero page or zero size => 400', async () => {
          const response = await request(app.getHttpServer())
            .get('/posts/paginated')
            .query({ page: 0, size: 10 })
            .set('User-Last-Name', 'm');

          expect(response.status).toEqual(400);
        });
      });
    });
  });
});
