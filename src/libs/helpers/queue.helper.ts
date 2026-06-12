import { getChannel, QUEUES } from "../config/rabbitmq";

export async function publishToQueue<T>(queue: string, data: T): Promise<void> {
  try {
    const channel = getChannel();
    const message = Buffer.from(JSON.stringify(data));

    channel.sendToQueue(queue, message, {
      persistent: true, // pesan tidak akan hilang kalau RabbitMQ restart
    });
  } catch (error) {
    console.error(`Failed to publish message to queue ${queue}:`, error);
  }
}

export { QUEUES };
