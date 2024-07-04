import { Injectable } from '@nestjs/common';
import { EventStoreDBClient, ResolvedEvent, jsonEvent } from '@eventstore/db-client';
import { ConfigService } from '@nestjs/config';
import { CreateBlogDto } from '../dtos/create-blog.dto';
import { UpdateBlogDto } from '../dtos/update-blog.dto';
import { DeleteBlogDto } from '../dtos/delete-blog.dto';
import { CreatePostDto } from '../dtos/create-post.dto';
import { UpdatePostDto } from '../dtos/update-post.dto';
import { DeletePostDto } from '../dtos/delete-post.dto';
import { CreateCommentDto } from '../dtos/create-comment.dto';
import { UpdateCommentDto } from '../dtos/update-comment.dto';
import { DeleteCommentDto } from '../dtos/delete-comment.dto';

@Injectable()
export class EventStoreService {
  private eventStore: EventStoreDBClient;

  constructor(private configService: ConfigService) {
    const eventStoreUri = this.configService.get<string>('EVENTSTORE_URI');
    if (!eventStoreUri) {
      throw new Error('EVENTSTORE_URI is not defined in the environment variables');
    }
    this.eventStore = EventStoreDBClient.connectionString(eventStoreUri);
  }
  

  async handleBlogCreatedEvent(createBlogDto: CreateBlogDto) {
    const event = jsonEvent({
      type: 'blog_created',
      data: { ...createBlogDto }, // Convert DTO to a plain object
    });
    await this.eventStore.appendToStream('blog-stream', event);
  }

  async handleBlogUpdatedEvent(updateBlogDto: UpdateBlogDto) {
    const event = jsonEvent({
      type: 'blog_updated',
      data: { ...updateBlogDto }, // Convert DTO to a plain object
    });
    await this.eventStore.appendToStream('blog-stream', event);
    console.log('Blog Updated Event Stored:', updateBlogDto);
  }

  async handleBlogDeletedEvent(deleteBlogDto: DeleteBlogDto) {
    const event = jsonEvent({
      type: 'blog_deleted',
      data: { ...deleteBlogDto }, // Convert DTO to a plain object
    });
    await this.eventStore.appendToStream('blog-stream', event);
    console.log('Blog Deleted Event Stored:', deleteBlogDto);
  }

  async handlePostCreatedEvent(createPostDto: CreatePostDto) {
    const event = jsonEvent({
      type: 'post_created',
      data: { ...createPostDto }, // Convert DTO to a plain object
    });
    await this.eventStore.appendToStream('post-stream', event);
    console.log('Post Created Event Stored:', createPostDto);
  }

  async handlePostUpdatedEvent(updatePostDto: UpdatePostDto) {
    const event = jsonEvent({
      type: 'post_updated',
      data: { ...updatePostDto }, // Convert DTO to a plain object
    });
    await this.eventStore.appendToStream('post-stream', event);
    console.log('Post Updated Event Stored:', updatePostDto);
  }

  async handlePostDeletedEvent(deletePostDto: DeletePostDto) {
    const event = jsonEvent({
      type: 'post_deleted',
      data: { ...deletePostDto }, // Convert DTO to a plain object
    });
    await this.eventStore.appendToStream('post-stream', event);
    console.log('Post Deleted Event Stored:', deletePostDto);
  }

  async handleCommentCreatedEvent(createCommentDto: CreateCommentDto) {
    const event = jsonEvent({
      type: 'comment_created',
      data: { ...createCommentDto }, // Convert DTO to a plain object
    });
    await this.eventStore.appendToStream('comment-stream', event);
    console.log('Comment Created Event Stored:', createCommentDto);
  }

  async handleCommentUpdatedEvent(updateCommentDto: UpdateCommentDto) {
    const event = jsonEvent({
      type: 'comment_updated',
      data: { ...updateCommentDto }, // Convert DTO to a plain object
    });
    await this.eventStore.appendToStream('comment-stream', event);
    console.log('Comment Updated Event Stored:', updateCommentDto);
  }

  async handleCommentDeletedEvent(deleteCommentDto: DeleteCommentDto) {
    const event = jsonEvent({
      type: 'comment_deleted',
      data: { ...deleteCommentDto }, // Convert DTO to a plain object
    });
    await this.eventStore.appendToStream('comment-stream', event);
    console.log('Comment Deleted Event Stored:', deleteCommentDto);
  }
}
