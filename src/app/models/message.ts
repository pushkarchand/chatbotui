
export class Message {
    constructor(public text: string, public type: MessageType, public createdTime: Date = new Date()) { }
}

export enum MessageType {
    INCOMING = 0,
    OUTGOING = 1
}

export class MessageBody {
    constructor(public type: string) { }
}

export enum MessageBodyType{
    TEXT='TEXT',
    DOCUMENT='DOCUMENT'
}

export class TextMessageBody {
    constructor(public type: string,public text: string) { }
}

export class DocumentMessageBody {
    constructor(public type: string,public url: string,public caption:string="") { }
}

export class Price {
    constructor(public pricePerMessage: number,
        public currency: string) { }
}

export class OutGoingMessage {
    constructor(public from: string,
        public to: string,
        public integrationType: string,
        public receivedAt: Date,
        public messageId: string,
        public pairedMessageId: any,
        public callbackData: any,
        public message: MessageBody,
        public price: Price) { }
}
