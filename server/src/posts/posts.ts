import { ApiProperty } from '@nestjs/swagger';

export class Post {
  @ApiProperty({ description: '게시글 ID', example: 1, readOnly: true })
  id: number;
  @ApiProperty({ description: '제목', example: '제목1', required: true })
  title: string;
  @ApiProperty({ description: '내용', example: '내용2', required: true })
  content: string;
  @ApiProperty({
    description: '작성일시',
    example: '2024-01-04T05:00:01.067Z',
    required: true,
  })
  createdAt: Date;
  @ApiProperty({
    description: '수정일시',
    example: '2024-01-04T05:00:01.067Z',
    required: true,
  })
  updatedAt: Date;

  public constructor(params: Partial<Post>) {
    Object.assign(this, params);
    this.id = Date.now();
    this.createdAt = new Date();
    this.updatedAt = this.createdAt;
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
