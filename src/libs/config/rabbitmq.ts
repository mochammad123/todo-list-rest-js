import amqp from "amqplib";
import { env } from "./env";

export const QUEUES = {
  USER_REGISTERED: "todo.user.registered",
  TASK_CREATED: "todo.task.created",
} as const;

let connection: amqp.ChannelModel | null = null;
let channel: amqp.Channel | null = null;

export const connectRabbitMQ = async () => {
  const url = `amqp://${env.RABBITMQ_USER}:${env.RABBITMQ_PASSWORD}@${env.RABBITMQ_HOST}:${env.RABBITMQ_PORT}`;

  connection = await amqp.connect(url);
  channel = await connection.createChannel();

  // buat queue (idempotent - aman dipanggil berkali kali)
  await channel.assertQueue(QUEUES.USER_REGISTERED, { durable: true });
  await channel.assertQueue(QUEUES.TASK_CREATED, { durable: true });

  console.log("Connected to RabbitMQ");
};

export const getChannel = () => {
  if (!channel) throw new Error("RabbitMQ channel not initialized");
  return channel;
};
