import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventStoreService } from './event-store.service';
import { EventStoreSubscriptionService } from './event-store-subscription.service';

@Module({
  imports: [ConfigModule],
  providers: [EventStoreService, EventStoreSubscriptionService],
  exports: [EventStoreService, EventStoreSubscriptionService],
})
export class EventStoreModule {}
