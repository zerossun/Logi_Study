import { Module } from '@nestjs/common';
import { CommonModule } from '@src/common/common.module';
import { PostsController } from '@src/posts/posts.controller';
import { PostsService } from '@src/posts/posts.service';

@Module({
  imports: [CommonModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
