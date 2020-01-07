import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { OutGoingMessage } from '../models/message';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable()
export class MessageService {

  constructor(private http: HttpClient) { }

  public handleOutComingMessage(argBody: OutGoingMessage[]): Observable<any> {
    const body = JSON.stringify(argBody)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': environment.authorization
      })
    };
    //http://localhost:1202/growth     :: DEVELOPE 2
    // http://localhost:1202/growth    :: LOCAL HOST
    return this.http.post('http://127.0.0.1:1202/growth/whatsapp/messageIncomingHandler', body, httpOptions)
      .pipe(map(messageResponse => {
        // console.log(messageResponse);
        return messageResponse;
      }))
  }// public handleOutComingMessage(body:OutGoingMessage[]):Observable<any>

  public enumerateChatHistory():Observable<any>{
    const wapPhonenumber = sessionStorage.getItem('wapnumber');
    return this.http.get(`http://127.0.0.1:1202/chathistory?WAPhone=${wapPhonenumber}`)
    .pipe(map(messageResponse => {
      return messageResponse;
    }))
  }

}
