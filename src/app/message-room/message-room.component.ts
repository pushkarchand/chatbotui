import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import * as uuid from 'uuid';
import { Message, MessageType, MessageBody, Price, OutGoingMessage } from '../models/message';
import { MessageService } from '../services/message-handler.service';

@Component({
  selector: 'app-message-room',
  templateUrl: './message-room.component.html',
  styleUrls: ['./message-room.component.scss']
})
export class MessageRoomComponent implements OnInit {
  public socket;
  public listofMessages: Message[];
  public messageText: string;
  constructor(private messageService: MessageService) {
    this.socket = io('http://localhost:1202');
  }

  ngOnInit() {
    sessionStorage.setItem('wapnumber', '919902357828');
    this.listofMessages = [];
    this.messageText = '';
    this.socket.on('newmessage', (response) => {
      const wapNumber = sessionStorage.getItem('wapnumber');
      if (wapNumber === response.number) {
        const incomingmessage: Message = new Message(response.description, MessageType.INCOMING);
        this.listofMessages.push(incomingmessage);
        setTimeout(() => this.scrollToLatestMessage(), 800);
      }
    })
  }

  public addMessage(): void {
    if (this.messageText) {
      const outGoingMessage: Message = new Message(this.messageText, MessageType.OUTGOING);
      this.listofMessages.push(outGoingMessage);
      this.scrollToLatestMessage();
      const requestBody = this.generateOutgoingMessageObject(this.messageText);
      this.messageService.handleOutComingMessage(requestBody)
        .subscribe(response => {
          console.log(response);
        })
    }
    this.messageText = '';
  }// public addMessage(): void


  private generateOutgoingMessageObject(argText: string): OutGoingMessage[] {
    const messagebody: MessageBody = new MessageBody('TEXT', argText);
    const price: Price = new Price(0.000000, 'HRK');
    const wapPhonenumber = sessionStorage.getItem('wapnumber');
    const outGoingMessage: OutGoingMessage = new OutGoingMessage(wapPhonenumber, "1234", "WHATSAPP", new Date(), uuid.v4(), null, null, messagebody, price);
    const returnValue: OutGoingMessage[] = [];
    returnValue.push(outGoingMessage);
    return returnValue;
  }// private generateOutgoingMessageObject(argText: string): OutGoingMessage[]

  private scrollToLatestMessage() {
    let element = document.getElementById("messageroombody");
    element.scrollTop = element.scrollHeight;
  }
}
