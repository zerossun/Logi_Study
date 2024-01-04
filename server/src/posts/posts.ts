import { ApiProperty } from '@nestjs/swagger';

export class Post {
  id: number;
  title: string;
  content: string;

  constructor({ title, content }: { title: string; content: string }) {
    this.id = Date.now();
    this.title = title;
    this.content = content;
  }
}

export type PaginatedRow<T> = T & { rowNum: number };

export class Paginated<T> {
  list: PaginatedRow<T>[];
  hasNext: boolean;

  constructor(list: PaginatedRow<T>[], hasNext: boolean) {
    this.list = list;
    this.hasNext = hasNext;
  }
}

export class PostUpdateDTO {
  @ApiProperty({ description: '제목', example: '제목', required: false })
  title: string;
  @ApiProperty({ description: '내용', example: '내용입니다.', required: false })
  content: string;
}

export class PostCreateDTO {
  @ApiProperty({ description: '제목', example: '제목' })
  title: string;
  @ApiProperty({ description: '내용', example: '내용입니다.' })
  content: string;

  toEntity() {
    return new Post({ title: this.title, content: this.content });
  }
}
