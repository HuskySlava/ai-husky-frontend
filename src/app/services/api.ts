import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'; // adjust path if needed

@Injectable({
  providedIn: 'root'
})
export class Api {
  private ws!: WebSocket;
  private wsUrl = environment.wsUrl;
  private httpUrl = environment.httpUrl;

  constructor(private http: HttpClient) {
    this.initWebSocket();
  }

  public async init(){
    if(!this.ws){
      this.initWebSocket()
    } else {
      console.warn("WS already in use");
    }
  }

  private initWebSocket(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.wsUrl);

      this.ws.onopen = () => {
        console.log('WebSocket connection opened');
        resolve();
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        reject(error);
      };

      this.ws.onmessage = (event) => {
        console.log('Received from WS:', event.data);
      };

      this.ws.onclose = () => {
        console.log('WebSocket connection closed');
      };
    });
  }


  sendMessage(data: any) {
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
