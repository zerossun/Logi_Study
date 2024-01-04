import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post as PostMethod,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  ErrorsInterceptor,
  TransformInterceptor,
} from '@src/common/http/transform.interceptor';
import {
  Post,
  PostCreateDTO,
  PostUpdateDTO,
  Paginated,
  PaginatedRow,
} from './posts';
import { PostsService } from './posts.service';

@ApiTags('게시글 API')
@Controller('posts')
@UseInterceptors(TransformInterceptor)
@UseInterceptors(ErrorsInterceptor)
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @ApiOperation({
    summary: '게시글 페이징 조회 API',
    description: '게시글 페이징 조회',
  })
  @Get('paging')
  getPaginatedPosts(
    @Query('page', ParseIntPipe) page?: number,
    @Query('size', ParseIntPipe) size?: number,
  ): Paginated<PaginatedRow<Post>> {
    if (page < 1 || size < 1) throw new BadRequestException();

    return this.postService.findPaginatedPosts(page, size);
  }

  @ApiOperation({
    summary: '게시글 단건 조회 API',
    description: '게시글 단건 조회',
  })
  @Get(':id')
  getPost(@Param('id', ParseIntPipe) id: number): Post {
    return this.postService.findPost(id);
  }

  @ApiOperation({
    summary: '게시글 단건 삭제 API',
    description: '게시글 단건 삭제',
  })
  @Delete(':id')
  deletePost(@Param('id', ParseIntPipe) id: number): Post {
    return this.postService.removePost(id);
  }

  @ApiOperation({
    summary: '게시글 단건 수정 API',
    description: '게시글 단건 수정',
  })
  @Put(':id')
  updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() postUpdateDTO: PostUpdateDTO,
  ): Post {
    console.log(postUpdateDTO);
    if (!postUpdateDTO.content && !postUpdateDTO.title)
      throw new BadRequestException('업데이트 하려는 내용이 없습니다.');

    return this.postService.modifyPost({ id, postUpdateDTO });
  }

  @ApiOperation({
    summary: '게시글 단건 생성 API',
    description: '게시글 단건 생성',
  })
  @PostMethod()
  createPost(@Body() postCreateDTO: PostCreateDTO): Post {
    if (!postCreateDTO.title) throw new BadRequestException('제목이 없습니다.');
    if (!postCreateDTO.content)
      throw new BadRequestException('내용이 없습니다.');

    return this.postService.savePost(postCreateDTO);
  }

  @ApiOperation({
    summary: '게시글 전체 조회 API',
    description: '게시글 전체 조회',
  })
  @Get('')
  getPosts(): Post[] {
    return this.postService.findPosts();
  }
}
