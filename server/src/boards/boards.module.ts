import { Module } from '@nestjs/common';
import { CommonModule } from '@src/common/common.module';
import { BoardsController } from '@src/boards/boards.controller';
import { BoardsService } from '@src/boards/boards.service';

@Module({
  imports: [CommonModule],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
