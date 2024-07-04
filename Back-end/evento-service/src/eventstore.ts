import { EventStoreDBClient } from '@eventstore/db-client';
import * as dotenv from 'dotenv';

dotenv.config();

const eventStoreUri = process.env.EVENTSTORE_URI;

if (!eventStoreUri) {
  throw new Error('EVENTSTORE_URI is not defined in the environment variables');
}

export const client = EventStoreDBClient.connectionString(eventStoreUri);
