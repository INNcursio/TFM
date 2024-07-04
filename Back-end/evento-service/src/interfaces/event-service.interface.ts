export interface IEventService {
    onModuleInit(): void;
    getHello(): string;
    emitTestEvent(): Promise<void>;
  }
  