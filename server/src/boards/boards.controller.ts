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
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  Board,
  BoardCreateDTO,
  BoardUpdateDTO,
  Paginated,
  PaginatedRow,
} from './boards';
import { BoardsService } from './boards.service';

@Controller('boards')
@ApiTags('게시판 API')
export class BoardsController {
  constructor(private readonly boardService: BoardsService) {}

  @Get('paging')
  @ApiOperation({
    summary: '게시판 페이징 조회 API',
    description: '게시판 페이징 조회',
  })
  getPaginatedBoards(
    @Query('page', ParseIntPipe) page?: number,
    @Query('size', ParseIntPipe) size?: number,
  ): Paginated<PaginatedRow<Board>> {
    if (page < 1 || size < 1) throw new BadRequestException();

    return this.boardService.findPaginatedBoards(page, size);
  }

  @Get(':id')
  @ApiOperation({
    summary: '게시판 단건 조회 API',
    description: '게시판 단건 조회',
  })
  getBoard(@Param('id', ParseIntPipe) id: number): Board {
    return this.boardService.findBoard(id);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '게시판 단건 삭제 API',
    description: '게시판 단건 삭제',
  })
  deleteBoard(@Param('id', ParseIntPipe) id: number): Board {
    return this.boardService.removeBoard(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: '게시판 단건 수정 API',
    description: '게시판 단건 수정',
  })
  updateBoard(
    @Param('id', ParseIntPipe) id: number,
    @Body() boardUpdateDTO: BoardUpdateDTO,
  ): Board {
    console.log(boardUpdateDTO);
    if (!boardUpdateDTO.content && !boardUpdateDTO.title)
      throw new BadRequestException('업데이트 하려는 내용이 없습니다.');

    return this.boardService.modifyBoard({ id, boardUpdateDTO });
  }

  @Post()
  @ApiOperation({
    summary: '게시판 단건 생성 API',
    description: '게시판 단건 생성',
  })
  createBoard(@Body() boardCreateDTO: BoardCreateDTO): Board {
    if (!boardCreateDTO.title)
      throw new BadRequestException('제목이 없습니다.');
    if (!boardCreateDTO.content)
      throw new BadRequestException('내용이 없습니다.');

    return this.boardService.saveBoard(boardCreateDTO);
  }

  @Get('')
  @ApiOperation({
    summary: '게시판 전체 조회 API',
    description: '게시판 전체 조회',
  })
  getBoards(): Board[] {
    return this.boardService.findBoards();
  }
}
