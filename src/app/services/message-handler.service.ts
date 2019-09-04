import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { OutGoingMessage } from '../models/message';
import { Observable } from 'rxjs';
@Injectable()
export class MessageService {

  constructor(private http: HttpClient) { }

  public handleOutComingMessage(argBody: OutGoingMessage[]): Observable<any> {
    const body = JSON.stringify(argBody)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwdXJwb3NlIjoiQVBJX3Rva2VuIiwiaWF0IjoxNTU4NjExMjk1fQ.I1qU1LvrGZG79Gyr57cjhbCv5VcUpsCaYQFDqOg8G58'
      })
    };
    return this.http.post('http://localhost:1202/growth/whatsapp/messageIncomingHandler', body, httpOptions)
      .pipe(map(messageResponse => {
        console.log(messageResponse);
        return messageResponse;
      }))
  }// public handleOutComingMessage(body:OutGoingMessage[]):Observable<any>

}
