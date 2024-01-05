import { ApiProperty } from '@nestjs/swagger';

export class Paginated<T> {
  @ApiProperty({
    description: 'T 데이터 리스트',
    isArray: true,
  })
  list: T[];
  @ApiProperty({ description: '다음 페이지 있는지 여부' })
  hasNext: boolean;
  @ApiProperty({ description: '전체 리스트 개수' })
  total: number;

  constructor({ list, hasNext, total }: Partial<Paginated<T>>) {
    this.list = list;
    this.hasNext = hasNext;
    this.total = total;
  }
}
