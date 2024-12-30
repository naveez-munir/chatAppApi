import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post as HttpPost,
  HttpStatus,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Post} from '../../schemas/post.schema';
import { UpdatePostDto } from './dto/update-post.dto';
import { ParseObjectIdPipe } from 'src/common/pipes/parse-object-id.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('posts')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @HttpPost()
  async createPost(@Body() createPostDto: CreatePostDto): Promise<Post> {
    return this.postsService.createPost(createPostDto);
  }

  @Get()
  async getAllPosts(): Promise<Post[]> {
    return this.postsService.getAllPosts();
  }

  @Get(':id')
  async getPostById(
    @Param('id',ParseObjectIdPipe) id: string
  ): Promise<Post> {
    return this.postsService.getPostById(id);
  }

  @Put(':id')
  async updatePost(
    @Param('id',ParseObjectIdPipe) id: string,
    @Body() updatePostDto: UpdatePostDto
  ): Promise<Post> {
    return this.postsService.updatePost(id, updatePostDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePost(@Param('id',ParseObjectIdPipe) id: string): Promise<void> {
    await this.postsService.deletePost(id);
  }
}
