import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post as PostMethod,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  ErrorsInterceptor,
  TransformInterceptor,
} from '@src/common/http/transform.interceptor';
import { Paginated } from '@src/util/paging/paging';
import { ApiOkResponsePaginated } from '@src/util/paging/paging.decorator';
import { Post, PostCreateDTO, PostUpdateDTO } from './posts';
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
  @ApiOkResponsePaginated(Post)
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'page 또는 size 1보다 작거나 없음',
  })
  @Get('paging')
  getPaginatedPosts(
    @Query('page', ParseIntPipe) page?: number,
    @Query('size', ParseIntPipe) size?: number,
  ): Paginated<Post> {
    if (page < 1 || size < 1)
      throw new BadRequestException('page 또는 size 가 1보다 작습니다.');

    return this.postService.findPaginatedPosts(page, size);
  }

  @ApiOperation({
    summary: '게시글 단건 조회 API',
    description: '게시글 단건 조회',
  })
  @ApiResponse({ status: HttpStatus.OK, description: '성공', type: Post })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'id와 일치하는 게시글이 없음',
  })
  @Get(':id')
  getPost(@Param('id', ParseIntPipe) id: number): Post {
    return this.postService.findPost(id);
  }

  @ApiOperation({
    summary: '게시글 단건 삭제 API',
    description: '게시글 단건 삭제',
  })
  @ApiResponse({ status: HttpStatus.OK, description: '성공', type: Post })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'id와 일치하는 게시글이 없음',
  })
  @Delete(':id')
  deletePost(@Param('id', ParseIntPipe) id: number): Post {
    return this.postService.removePost(id);
  }

  @ApiOperation({
    summary: '게시글 단건 수정 API',
    description: '게시글 단건 수정',
  })
  @ApiResponse({ status: HttpStatus.OK, description: '성공', type: Post })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'id와 일치하는 게시글이 없음',
  })
  @Put(':id')
  updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() postUpdateDTO: PostUpdateDTO,
  ): Post {
    if (!postUpdateDTO.content && !postUpdateDTO.title)
      throw new BadRequestException('업데이트 하려는 내용이 없습니다.');

    return this.postService.modifyPost({ id, postUpdateDTO });
  }

  @ApiOperation({
    summary: '게시글 단건 생성 API',
    description: '게시글 단건 생성',
  })
  @ApiResponse({ status: HttpStatus.OK, description: '성공', type: Post })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: '제목 또는 내용 없음',
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
  @ApiResponse({ status: HttpStatus.OK, description: '성공', type: [Post] })
  @Get('')
  getPosts(): Post[] {
    return this.postService.findPosts();
  }
}
