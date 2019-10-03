import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import * as uuid from 'uuid';
import { Message, MessageType, MessageBody, Price}from '../models/message';
import {OutGoingMessage, TextMessageBody,DocumentMessageBody ,MessageBodyType} from '../models/message';
import { MessageService } from '../services/message-handler.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-message-room',
  templateUrl: './message-room.component.html',
  styleUrls: ['./message-room.component.scss']
})
export class MessageRoomComponent implements OnInit {
  public socket;
  public listofMessages: Message[];
  public messageText: string;
  constructor(private messageService: MessageService, private router: Router) {
    this.socket = io('http://localhost:1202');
  }

  ngOnInit() {
    this.listofMessages = [];
    this.messageText = '';
    this.socket.on('newmessage', (response) => {
      const wapNumber = sessionStorage.getItem('wapnumber');
      if (wapNumber === response.number) {
        const lines= response.description.split("\n");
        let incomingmessage: Message = new Message('', MessageType.INCOMING);
        lines.map(line=>{
          incomingmessage.text += `<div>${line}</div>`;
        })
        incomingmessage.text=incomingmessage.text.split("_*").join("<b>");
        incomingmessage.text=incomingmessage.text.split("*_").join("</b>");
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
      const requestBody = this.generateOutgoingMessageObject(this.messageText,MessageBodyType.TEXT);
      this.sendMessage(requestBody);
       this.messageText = '';
    }
  }// public addMessage(): void

  public addDocumentMessage(){
    if (this.messageText) {
      const outGoingMessage: Message = new Message(this.messageText, MessageType.OUTGOING);
      this.listofMessages.push(outGoingMessage);
      this.scrollToLatestMessage();
      const requestBody = this.generateOutgoingMessageObject(this.messageText,MessageBodyType.DOCUMENT);
      this.sendMessage(requestBody);
       this.messageText = '';
    }
  }

  private sendMessage(requestBody){
    this.messageService.handleOutComingMessage(requestBody)
    .subscribe(response => {
      console.log(response);
    })
  }


  private generateOutgoingMessageObject(argText: string,argMessageType:MessageBodyType): OutGoingMessage[] {
    let messagebody: MessageBody;
    if(argMessageType===MessageBodyType.DOCUMENT){
       messagebody= new DocumentMessageBody(MessageBodyType.DOCUMENT, argText);
    } else {
       messagebody= new TextMessageBody(MessageBodyType.TEXT, argText);
    }
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
  }// private scrollToLatestMessage()

  public logoutUser() {
    sessionStorage.removeItem('wapnumber');
    this.router.navigate(['/']);
  }
}
