import {
  // BadRequestException,
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post as PostMethod,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccessableUserLastName, AuthGuard } from '@src/common/auth.guard';
import { ErrorsInterceptor } from '@src/common/error.interceptor';
import { ParseIntPipeKr, ParseMinIntPipeKr } from '@src/common/pipe.validate';
import { TransformInterceptor } from '@src/common/transform.interceptor';
import { Paginated } from '@src/util/paginated/paginated';
import { ApiOkResponsePaginated } from '@src/util/paginated/paginated.decorator';
import { Post, PostCreateDTO, PostUpdateDTO } from './posts';
import { PostsService } from './posts.service';
import {
  ValidationPostCreateDTO,
  ValidationPostUpdateDTO,
} from './posts.validate';

@ApiTags('게시글 API')
@ApiHeader({ name: 'User-Last-Name', enum: AccessableUserLastName })
@Controller('posts')
@UseInterceptors(TransformInterceptor)
@UseInterceptors(ErrorsInterceptor)
@UseGuards(AuthGuard)
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @ApiOperation({
    summary: '게시글 페이징 조회 API',
    description: '게시글 페이징 조회',
  })
  @ApiOkResponsePaginated(Post)
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'page 는 0보다 큰 값 넣어라',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'size 는 0보다 큰 값 넣어라',
  })
  @Get('paginated')
  getPaginatedPosts(
    @Query(
      'page',
      new DefaultValuePipe(1),
      new ParseMinIntPipeKr(0, 'page 는 0보다 큰 값 넣어라'),
    )
    page?: number,
    @Query(
      'size',
      new DefaultValuePipe(10),
      new ParseMinIntPipeKr(0, 'size 는 0보다 큰 값 넣어라'),
    )
    size?: number,
  ): Paginated<Post> {
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
  getPost(
    @Param('id', ParseIntPipeKr)
    id: number,
  ): Post {
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
  deletePost(@Param('id', ParseIntPipeKr) id: number): Post {
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
    @Param('id', ParseIntPipeKr) id: number,
    @Body(new ValidationPostUpdateDTO()) postUpdateDTO: PostUpdateDTO,
  ): Post {
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
  createPost(
    @Body(new ValidationPostCreateDTO()) postCreateDTO: PostCreateDTO,
  ): Post {
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
