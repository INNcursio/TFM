import { Injectable, OnModuleInit } from '@nestjs/common';
import { client as eventStore } from '../eventstore';
import { streamNameFilter } from '@eventstore/db-client';

@Injectable()
export class EventStoreSubscriptionService implements OnModuleInit {
  private events: Array<{ id: string, type: string, data: any, created: Date }> = [];
  async onModuleInit() {
    console.log('EventStoreSubscriptionService initialized');
    this.startBackgroundSubscription();
  }

  private startBackgroundSubscription() {
    (async (): Promise<void> => {
      await this.subscribeToAllStorageEvents();
    })();
  }

  private async subscribeToAllStorageEvents() {
    console.log('Subscribing to all storage events');
    const subscription = eventStore.subscribeToAll({
      filter: streamNameFilter({ prefixes: ["blog-stream", "post-stream", "comment-stream"] }),
    });
    
    for await (const resolvedEvent of subscription) {
      console.log(
        `Received event ${resolvedEvent.event?.revision}@${resolvedEvent.event?.streamId}`
      );
      const data: any = resolvedEvent.event.data;


      // Almacenar el evento recibido
      this.events.push({
        id: resolvedEvent.event.id,
        type: resolvedEvent.event.type,
        data: resolvedEvent.event.data,
        created: new Date(resolvedEvent.event.created),
      });

      // Eliminar eventos más antiguos de 24 horas
      const now = new Date();
      this.events = this.events.filter(event => {
        const eventTime = new Date(event.created);
        return (now.getTime() - eventTime.getTime()) < 24 * 60 * 60 * 1000;
      });
    }
  }

  // Método para obtener eventos de las últimas 24 horas
  getEventsFromLast24Hours() {
    const now = new Date();
    return this.events.filter(event => {
      const eventTime = new Date(event.created);
      return (now.getTime() - eventTime.getTime()) < 24 * 60 * 60 * 1000;
    });
  }
}
