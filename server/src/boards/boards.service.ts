import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { readFileSync, writeFileSync } from 'fs';
import { Data } from 'src/types/data';
import {
  Board,
  BoardCreateDTO,
  BoardUpdateDTO,
  Paginated,
  PaginatedRow,
} from './boards';

@Injectable()
export class BoardsService {
  findBoard(id: number): Board {
    const board = this.getData().boards.find((board) => board.id === id);

    if (!board) throw new NotFoundException();

    return board;
  }

  findBoards(): Board[] {
    return this.getData().boards;
  }

  findPaginatedBoards(
    page: number,
    size: number,
  ): Paginated<PaginatedRow<Board>> {
    const start = (page - 1) * size;
    const last = page * size;

    const boards = this.getData().boards;

    const list = boards
      .slice(start, last)
      .map((baord, index) => ({ ...baord, rowNum: index + start + 1 }));

    const hasNext = !!boards[last + 1];

    return new Paginated(list, hasNext);
  }

  removeBoard(id: number): Board {
    const data = this.getData();

    const target = data.boards.find((board) => board.id === id);

    if (!target) throw new NotFoundException();

    data.boards = data.boards.filter((board) => board.id !== id);

    this.setData(data);

    return target;
  }

  modifyBoard({
    id,
    boardUpdateDTO,
  }: {
    id: number;
    boardUpdateDTO: BoardUpdateDTO;
  }): Board {
    const data = this.getData();

    const target = data.boards.find((board) => board.id === id);

    if (!target) throw new NotFoundException();

    if (boardUpdateDTO.title) target.title = boardUpdateDTO.title;
    if (boardUpdateDTO.content) target.content = boardUpdateDTO.content;

    this.setData(data);

    return target;
  }

  saveBoard(boardCreateDTO: BoardCreateDTO): Board {
    const data = this.getData();

    const newBoard = plainToInstance(BoardCreateDTO, boardCreateDTO).toEntity();
    let duplicatedID = !!data.boards.find((board) => board.id === newBoard.id);

    while (duplicatedID) {
      newBoard.id = Date.now();
      duplicatedID = !!data.boards.find((board) => board.id === newBoard.id);
    }

    data.boards = [...data.boards, newBoard];

    this.setData(data);

    return newBoard;
  }

  private getData(): Data {
    const data: Data = JSON.parse(
      readFileSync('src/database/board.json', 'utf-8'),
    );
    return data;
  }

  private setData(data: Data) {
    const stringifiedData: string = JSON.stringify(data);
    writeFileSync('src/database/board.json', stringifiedData, 'utf-8');
  }
}
