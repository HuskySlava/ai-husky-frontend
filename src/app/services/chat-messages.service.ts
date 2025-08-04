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

  private isBusySubject = new BehaviorSubject<boolean>(false);
  public isBusy$ = this.isBusySubject.asObservable();

  constructor(private api: Api) {
    this.api.wsMessages$.subscribe((res) => {
      if(this.isValidMessage(res)){
        this.messages.enqueue(res);
        this.messagesSubject.next(this.messages.toArray());
        if(res?.type === 'incoming'){
          this.isBusySubject.next(false);
        }
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

  async sendMessage(message: ChatMessage) {
    this.isBusySubject.next(true);
    if(this.isValidMessage(message)){
      this.api.sendMessage(message);
    }
  }

}
