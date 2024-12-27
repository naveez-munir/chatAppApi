import { Body, Controller, Delete, Get, HttpCode, Post as HttpPost, HttpStatus, Param, ParseIntPipe, Put } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './interfaces/post.interface';
import { UpdatePostDto } from './dto/update-post.dto';

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

  @Get(':id')
  getPostById(
    // why to use ParseIntPipe
    // first it converts the string to number
    // If someone requests /posts/abc
    // It will return 406 Not Acceptable
    // Instead of default 400 Bad Request
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
    id: number
  ) {
    return this.postsService.getPostById(id);
  }

  @Put(':id')
  updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto
  ) {
    return this.postsService.updatePost(id, updatePostDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deletePost(@Param('id', ParseIntPipe) id: number) {
    this.postsService.deletePost(id);
  }

}
