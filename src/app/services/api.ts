import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Subject} from 'rxjs';
import {User} from '../models/user.model';
import {ChatMessage} from '../interfaces/chat.interfaces'; // adjust path if needed

@Injectable({
  providedIn: 'root'
})

export class Api {
  private ws!: WebSocket;
  private wsUrl = environment.wsUrl;
  private httpUrl = environment.httpUrl;

  private messageSubject = new Subject<any>();
  public wsMessages$ = this.messageSubject.asObservable();

  constructor(private http: HttpClient) {

  }

  public async init(user: User){
    if(!this.ws){
      await this.initWebSocket(user)
    } else {
      console.warn("WS already in use");
    }
  }

  private initWebSocket(user: User): Promise<void> {
    return new Promise((resolve, reject) => {

      const userParam = user.id ? `?uuid=${user.id}` : '';
      this.ws = new WebSocket(`${this.wsUrl}${userParam}`);

      this.ws.onopen = () => {
        console.log('WebSocket connection opened');
        resolve();
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        reject(error);
      };

      this.ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          this.messageSubject.next(message);
        } catch (err) {
          console.error('Failed to parse WebSocket message:', err);
        }
      };

      this.ws.onclose = () => {
        console.log('WebSocket connection closed');
      };
    });
  }


  sendMessage(data: ChatMessage) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    } else {
      console.warn('WebSocket is not open. Message not sent.');
    }
  }

  get<T>(path: string) {
    return this.http.get<T>(`${this.httpUrl}/${path}`);
  }

  post<T>(path: string, body: any) {
    return this.http.post<T>(`${this.httpUrl}/${path}`, body);
  }
}
