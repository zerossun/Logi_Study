import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PostCreateDTO } from './posts';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

describe('PostController', () => {
  let controller: PostsController;
  let service: PostsService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [PostsService],
    }).compile();

    controller = module.get<PostsController>(PostsController);
    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getPost', () => {
    it('Ok', () => {
      const id = 1;

      const post = {
        id: 1,
        title: '제목2',
        content: '내용2입니다.',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const spy = jest.spyOn(service, 'findPost').mockReturnValue(post);

      const result = controller.getPost(id);

      expect(result).toStrictEqual(post);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(id);
    });
  });

  describe('getPosts', () => {
    it('Ok', () => {
      const posts = [
        {
          id: 1,
          title: '제목2',
          content: '내용2입니다.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      const spy = jest.spyOn(service, 'findPosts').mockReturnValue(posts);

      const result = controller.getPosts();

      expect(result).toStrictEqual(posts);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('getPaginatedPosts', () => {
    it('Ok', () => {
      const query = { page: 1, size: 50 };
      const paginatedPosts = {
        total: 1,
        hasNext: true,
        list: [
          {
            id: 1,
            title: '제목2',
            content: '내용2입니다.',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
      };
      const spy = jest
        .spyOn(service, 'findPaginatedPosts')
        .mockReturnValue(paginatedPosts);

      const result = controller.getPaginatedPosts(query.page, query.size);

      expect(result).toStrictEqual(paginatedPosts);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(query.page, query.size);
    });

    it('page < 1 || size < 1 => BadRequest', () => {
      const query = { page: 0, size: 0 };

      try {
        controller.getPaginatedPosts(query.page, query.size);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe('deletePost', () => {
    it('Ok', () => {
      const id = 1;
      const post = {
        id: 1,
        title: '제목2',
        content: '내용2입니다.',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const spy = jest.spyOn(service, 'removePost').mockReturnValue(post);

      const result = controller.deletePost(id);

      expect(result).toStrictEqual(post);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(id);
    });
  });

  describe('updatePost', () => {
    const id = 1;
    const post = {
      id: 1,
      title: '제목2',
      content: '내용2입니다.',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    it('Ok', () => {
      const postUpdateDTO = {
        title: '제목2',
        content: '내용2입니다.',
      };

      const spy = jest.spyOn(service, 'modifyPost').mockReturnValue(post);

      const result = controller.updatePost(id, postUpdateDTO);

      expect(result).toStrictEqual(post);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith({ id, postUpdateDTO });
    });

    it('!content && !title => BadRequest', () => {
      const postUpdateDTO = {
        title: '',
        content: '',
      };

      try {
        controller.updatePost(id, postUpdateDTO);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe('업데이트 하려는 내용이 없습니다.');
      }
    });
  });

  describe('createPost', () => {
    it('Ok', () => {
      const postCreateDTO = {
        title: '제목2',
        content: '내용2입니다.',
      } as PostCreateDTO;

      const post = {
        id: 1,
        title: '제목2',
        content: '내용2입니다.',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const spy = jest.spyOn(service, 'savePost').mockReturnValue(post);

      const result = controller.createPost(postCreateDTO);

      expect(result).toStrictEqual(post);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(postCreateDTO);
    });

    it('no title => BadRequest', () => {
      const postCreateDTO = {
        title: '',
        content: '내용만 있음',
      } as PostCreateDTO;

      try {
        controller.createPost(postCreateDTO);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe('제목이 없습니다.');
      }
    });

    it('no content => BadRequest', () => {
      const postCreateDTO = {
        title: '제목만 있음',
      } as PostCreateDTO;

      try {
        controller.createPost(postCreateDTO);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe('내용이 없습니다.');
      }
    });
  });
});
