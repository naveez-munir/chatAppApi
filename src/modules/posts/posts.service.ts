import { Injectable } from '@nestjs/common';
import { Post } from './interfaces/post.interface';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  private posts: Post[] = [];

  createPost(createPostDto: CreatePostDto): Post {
    const post: Post = {
      id: this.posts.length + 1,
      ...createPostDto,
      createdAt: new Date()
    };
    this.posts.push(post);
    return post;
  }

  getAllPosts(): Post[] {
    return this.posts;
  }

}
