import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PostCreateDTO } from './posts';
import { PostsService } from './posts.service';

describe('PostService', () => {
  let service: PostsService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostsService],
    }).compile();

    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findPost', () => {
    it('Ok', () => {
      const id = 55;

      const post = {
        id: 1,
        title: '제목2',
        content: '내용2입니다.',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'findPost').mockReturnValue(post);
      const result = service.findPost(id);

      expect(result).toStrictEqual(post);
    });

    it('!post => NotFound', () => {
      const id = 1;

      try {
        service.findPost(id);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('id와 일치하는 게시글이 없습니다.');
      }
    });
  });

  describe('findPosts', () => {
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

      jest.spyOn(service, 'findPosts').mockReturnValue(posts);
      const result = service.findPosts();

      expect(result).toStrictEqual(posts);
    });
  });

  describe('findPaginatedPosts', () => {
    it('Ok', () => {
      const query = { page: 1, size: 10 };

      const paginatedPosts = {
        hasNext: true,
        total: 1,
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

      jest.spyOn(service, 'findPaginatedPosts').mockReturnValue(paginatedPosts);
      const result = service.findPaginatedPosts(query.page, query.size);

      expect(result).toStrictEqual(paginatedPosts);
    });
  });

  describe('removePost', () => {
    it('Ok', () => {
      const id = 1;

      const post = {
        id: 1,
        title: '제목2',
        content: '내용2입니다.',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'removePost').mockReturnValue(post);
      const result = service.removePost(id);

      expect(result).toStrictEqual(post);
    });

    it('!target => NotFound', () => {
      const id = Number.MAX_SAFE_INTEGER;

      try {
        service.removePost(id);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe(
          '삭제하려는 게시글 id 와 일치하는 게시글이 없습니다.',
        );
      }
    });
  });

  describe('modifyPost', () => {
    it('Ok', () => {
      const id = 1;

      const postUpdateDTO = {
        title: '제목2',
        content: '내용2입니다.',
      };
      const postModified = {
        id: 1,
        title: '제목2',
        content: '내용2입니다.',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'modifyPost').mockReturnValue(postModified);
      const result = service.modifyPost({ id, postUpdateDTO });

      expect(result).toStrictEqual(postModified);
    });

    it('!target => NotFound', () => {
      const id = Number.MAX_SAFE_INTEGER;

      const postUpdateDTO = {
        title: '제목2',
        content: '내용2입니다.',
      };

      try {
        service.modifyPost({ id, postUpdateDTO });
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe(
          '수정하려는 게시글 id 와 일치하는 게시글이 없습니다.',
        );
      }
    });
  });

  describe('savePost', () => {
    it('Ok', () => {
      const postCreateDTO = {
        title: '제목2',
        content: '내용2입니다.',
      } as PostCreateDTO;

      const postCreated = {
        id: Date.now(),
        title: '제목2',
        content: '내용2입니다.',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'savePost').mockReturnValue(postCreated);
      const result = service.savePost(postCreateDTO);

      expect(result).toStrictEqual(postCreated);
    });
  });
});
