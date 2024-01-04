import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { readFileSync, writeFileSync } from 'fs';
import { Data } from 'src/types/data';
import {
  Post,
  PostCreateDTO,
  PostUpdateDTO,
  Paginated,
  PaginatedRow,
} from './posts';

@Injectable()
export class PostsService {
  findPost(id: number): Post {
    const post = this.getData().posts.find((post) => post.id === id);

    if (!post) throw new NotFoundException('id와 일치하는 게시글이 없습니다.');

    return post;
  }

  findPosts(): Post[] {
    return this.getData().posts;
  }

  findPaginatedPosts(
    page: number,
    size: number,
  ): Paginated<PaginatedRow<Post>> {
    const start = (page - 1) * size;
    const last = page * size;

    const posts = this.getData().posts;

    const list = posts
      .slice(start, last)
      .map((baord, index) => ({ ...baord, rowNum: index + start + 1 }));

    const hasNext = !!posts[last + 1];

    return new Paginated(list, hasNext);
  }

  removePost(id: number): Post {
    const data = this.getData();

    const target = data.posts.find((post) => post.id === id);

    if (!target)
      throw new NotFoundException(
        '삭제하려는 게시글 id 와 일치하는 게시글이 없습니다.',
      );

    data.posts = data.posts.filter((post) => post.id !== id);

    this.setData(data);

    return target;
  }

  modifyPost({
    id,
    postUpdateDTO,
  }: {
    id: number;
    postUpdateDTO: PostUpdateDTO;
  }): Post {
    const data = this.getData();

    const target = data.posts.find((post) => post.id === id);

    if (!target)
      throw new NotFoundException(
        '수정하려는 게시글 id 와 일치하는 게시글이 없습니다.',
      );

    if (postUpdateDTO.title) target.title = postUpdateDTO.title;
    if (postUpdateDTO.content) target.content = postUpdateDTO.content;

    this.setData(data);

    return target;
  }

  savePost(postCreateDTO: PostCreateDTO): Post {
    const data = this.getData();

    const newPost = plainToInstance(PostCreateDTO, postCreateDTO).toEntity();
    let duplicatedID = !!data.posts.find((post) => post.id === newPost.id);

    while (duplicatedID) {
      newPost.id = Date.now();
      duplicatedID = !!data.posts.find((post) => post.id === newPost.id);
    }

    data.posts = [...data.posts, newPost];

    this.setData(data);

    return newPost;
  }

  private getData(): Data {
    const data: Data = JSON.parse(
      readFileSync('src/database/post.json', 'utf-8'),
    );
    return data;
  }

  private setData(data: Data) {
    const stringifiedData: string = JSON.stringify(data);
    writeFileSync('src/database/post.json', stringifiedData, 'utf-8');
  }
}
