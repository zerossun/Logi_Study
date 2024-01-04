import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
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
  Board,
  BoardCreateDTO,
  BoardUpdateDTO,
  Paginated,
  PaginatedRow,
} from './boards';
import { BoardsService } from './boards.service';

@ApiTags('게시판 API')
@Controller('boards')
@UseInterceptors(TransformInterceptor)
@UseInterceptors(ErrorsInterceptor)
export class BoardsController {
  constructor(private readonly boardService: BoardsService) {}

  @ApiOperation({
    summary: '게시판 페이징 조회 API',
    description: '게시판 페이징 조회',
  })
  @Get('paging')
  getPaginatedBoards(
    @Query('page', ParseIntPipe) page?: number,
    @Query('size', ParseIntPipe) size?: number,
  ): Paginated<PaginatedRow<Board>> {
    if (page < 1 || size < 1) throw new BadRequestException();

    return this.boardService.findPaginatedBoards(page, size);
  }

  @ApiOperation({
    summary: '게시판 단건 조회 API',
    description: '게시판 단건 조회',
  })
  @Get(':id')
  getBoard(@Param('id', ParseIntPipe) id: number): Board {
    return this.boardService.findBoard(id);
  }

  @ApiOperation({
    summary: '게시판 단건 삭제 API',
    description: '게시판 단건 삭제',
  })
  @Delete(':id')
  deleteBoard(@Param('id', ParseIntPipe) id: number): Board {
    return this.boardService.removeBoard(id);
  }

  @ApiOperation({
    summary: '게시판 단건 수정 API',
    description: '게시판 단건 수정',
  })
  @Put(':id')
  updateBoard(
    @Param('id', ParseIntPipe) id: number,
    @Body() boardUpdateDTO: BoardUpdateDTO,
  ): Board {
    console.log(boardUpdateDTO);
    if (!boardUpdateDTO.content && !boardUpdateDTO.title)
      throw new BadRequestException('업데이트 하려는 내용이 없습니다.');

    return this.boardService.modifyBoard({ id, boardUpdateDTO });
  }

  @ApiOperation({
    summary: '게시판 단건 생성 API',
    description: '게시판 단건 생성',
  })
  @Post()
  createBoard(@Body() boardCreateDTO: BoardCreateDTO): Board {
    if (!boardCreateDTO.title)
      throw new BadRequestException('제목이 없습니다.');
    if (!boardCreateDTO.content)
      throw new BadRequestException('내용이 없습니다.');

    return this.boardService.saveBoard(boardCreateDTO);
  }

  @ApiOperation({
    summary: '게시판 전체 조회 API',
    description: '게시판 전체 조회',
  })
  @Get('')
  getBoards(): Board[] {
    return this.boardService.findBoards();
  }
}
