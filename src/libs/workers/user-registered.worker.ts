import { getChannel, QUEUES } from "../config/rabbitmq";

export const startUserRegisteredWorker = async () => {
  const channel = getChannel();

  await channel.consume(QUEUES.USER_REGISTERED, (msg) => {
    if (!msg) return;
    try {
      const data = JSON.parse(msg.content.toString());
      // simulasi kirim email welcome
      console.log(
        `[Email] Welcome email terkirim ke: ${data.username} (${data.email})`,
      );
    } catch (error) {
      console.error(`[Email] Error parsing message:`, error);
    } finally {
      channel.ack(msg); // tandai pesan sudah di proses
    }
  });

  console.log(`Worker listening on queue ${QUEUES.USER_REGISTERED}`);
};
