import { MessageClient } from "cloudmailin";
import { templateSendCode } from "./template/sendCode";

export class Mail {
    private client: MessageClient;
    constructor({username, apiKey} : {username: string, apiKey: string}) {
        this.client = new MessageClient({username, apiKey});
    }

    sendCode(from: string, to: string, code: string) {
        this.client.sendMessage({
            to,
            from,
            subject: "Your verification code",
            html: templateSendCode(code),
        });
    }
}
    