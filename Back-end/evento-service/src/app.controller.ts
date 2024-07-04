import { Controller, Get, Query } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { EventStoreService } from './event-store/event-store.service';
import { CreateBlogDto } from './dtos/create-blog.dto';
import { UpdateBlogDto } from './dtos/update-blog.dto';
import { DeleteBlogDto } from './dtos/delete-blog.dto';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { DeletePostDto } from './dtos/delete-post.dto';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { UpdateCommentDto } from './dtos/update-comment.dto';
import { DeleteCommentDto } from './dtos/delete-comment.dto';
import { EventStoreSubscriptionService } from './event-store/event-store-subscription.service';

@Controller()
export class AppController {
  constructor(
    private readonly eventStoreService: EventStoreService,
    private readonly eventStoreSubscriptionService: EventStoreSubscriptionService) 
    {}



  @Get('last24hours')
  async getEventsFromLast24Hours() {
    return this.eventStoreSubscriptionService.getEventsFromLast24Hours();
  }

  @EventPattern('blog_created')
  async handleBlogCreatedEvent(@Payload() data: CreateBlogDto) {
    console.log('Llega el evento de blog_created', data);
    await this.eventStoreService.handleBlogCreatedEvent(data);
  }

  @EventPattern('blog_updated')
  async handleBlogUpdatedEvent(@Payload() data: UpdateBlogDto) {
    console
    await this.eventStoreService.handleBlogUpdatedEvent(data);
  }

  @EventPattern('blog_deleted')
  async handleBlogDeletedEvent(@Payload() data: DeleteBlogDto) {
    await this.eventStoreService.handleBlogDeletedEvent(data);
  }

  @EventPattern('post_created')
  async handlePostCreatedEvent(@Payload() data: CreatePostDto) {
    console.log('Llega el evento de post_created', data);
    await this.eventStoreService.handlePostCreatedEvent(data);
  }

  @EventPattern('post_updated')
  async handlePostUpdatedEvent(@Payload() data: UpdatePostDto) {
    console.log('Llega el evento de post_updated', data);
    await this.eventStoreService.handlePostUpdatedEvent(data);
  }

  @EventPattern('post_deleted')
  async handlePostDeletedEvent(@Payload() data: DeletePostDto) {
    console.log('Llega el evento de post_deleted', data);
    await this.eventStoreService.handlePostDeletedEvent(data);
  }

  @EventPattern('comentario_created')
  async handleCommentCreatedEvent(@Payload() data: CreateCommentDto) {
    await this.eventStoreService.handleCommentCreatedEvent(data);
  }

  @EventPattern('comentario_updated')
  async handleCommentUpdatedEvent(@Payload() data: UpdateCommentDto) {
    console.log('Llega el evento de comentario_updated', data)
    await this.eventStoreService.handleCommentUpdatedEvent(data);
  }

  @EventPattern('comentario_deleted')
  async handleCommentDeletedEvent(@Payload() data: DeleteCommentDto) {
    console.log('Llega el evento de comentario_deleted', data)  
    await this.eventStoreService.handleCommentDeletedEvent(data);
  }
}
