import { Injectable } from '@angular/core';
import {Api} from './api';
import {ChatMessage} from '../interfaces/chat.interfaces';
import {LimitedQueue} from '../shared/utils/limitedQueue';
import constants from './constants';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ChatMessagesService {

  private messages: LimitedQueue<ChatMessage> = new LimitedQueue<ChatMessage>(constants.CHAT_MESSAGES_LIMIT);
  private messagesSubject = new BehaviorSubject<ChatMessage[]>(this.messages.toArray());
  public messages$ = this.messagesSubject.asObservable();

  constructor(private api: Api) {
    this.api.wsMessages$.subscribe((res) => {
      if(this.isValidMessage(res)){
        this.messages.enqueue(res);
        this.messagesSubject.next(this.messages.toArray());
      }
    })
  }

  isValidMessage(message: any): boolean {
    return (
      message &&
      typeof message === 'object' &&
      (message.type === 'incoming' ||  message.type === 'outgoing') &&
      typeof message.text === 'string' &&
      typeof message.timestamp === 'number' &&
      typeof message.id === 'string'
    );
  }

  sendMessage(message: ChatMessage) {
    if(this.isValidMessage(message)){
      this.api.sendMessage(message);
    }
  }

}
