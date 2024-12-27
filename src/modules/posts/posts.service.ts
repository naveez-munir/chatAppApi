import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './interfaces/post.interface';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

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

  getPostById(id: number): Post {
    const post = this.posts.find(post => post.id === id);
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  updatePost(id: number, updatePostDto: UpdatePostDto): Post {
    const postIndex = this.posts.findIndex(post => post.id === id);
    if (postIndex === -1) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    this.posts[postIndex] = {
      ...this.posts[postIndex],
      ...updatePostDto,
    };

    return this.posts[postIndex];
  }

  deletePost(id: number): void {
    const postIndex = this.posts.findIndex(post => post.id === id);
    if (postIndex === -1) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    this.posts.splice(postIndex, 1);
  }

}
