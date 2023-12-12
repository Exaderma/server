import "reflect-metadata";
import { DataSource } from "typeorm";
import { MessagesEntity } from "../../entity/messages";

type messageData = {
  sender_id: number;
  sender_email: string;
  receiver_id: number;
  receiver_email: string;
  room_id: number;
  message: string;
};

export class MessageRepository {
  private client: DataSource;

  constructor() {
    this.client = new DataSource({
      type: "postgres",
      host: process.env.DB_HOST as string,
      port: process.env.DB_PORT as unknown as number,
      username: process.env.DB_USER as string,
      password: process.env.DB_PASSWORD as string,
      database: process.env.DB_NAME as string,
      entities: [MessagesEntity],
      synchronize: true,
      logging: false,
    });

    this.client
      .initialize()
      .then(() => {
        console.log("Message repository initialized");
      })
      .catch((err) => {
        console.log("Message repository failed to initialize");
        console.log(err);
      });
  }

  public async storeMessage(message: messageData): Promise<any> {
    const repo = this.client.getRepository(MessagesEntity);
    const storedMessage = await repo.save(message);
    if (storedMessage) {
      return storedMessage;
    }
    throw new Error("Message not stored");
  }

  public async getMessages(roomId: number): Promise<any> {
    const repo = this.client.getRepository(MessagesEntity);
    const messages = await repo.find({
      where: { room_id: roomId },
    });
    if (messages) {
      return messages;
    }
  }

  public async printMessages(): Promise<any> {
    const repo = this.client.getRepository(MessagesEntity);
    const messages = await repo.find();
    if (messages) {
      console.log(messages);
    }
  }
}
