import { Body, Controller, Get, Post as HttpPost } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './interfaces/post.interface';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @HttpPost()
  createPost(@Body() createPostDto: CreatePostDto): Post {
    return this.postsService.createPost(createPostDto);
  }

  @Get()
  getAllPosts(): Post[] {
    return this.postsService.getAllPosts();
  }

}
