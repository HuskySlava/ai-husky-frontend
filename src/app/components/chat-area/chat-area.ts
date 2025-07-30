import {Component, OnInit} from '@angular/core';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import {ChatMessage, ChatMessages} from '../../interfaces/chat.interfaces';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {NgClass} from '@angular/common';
import {Api} from '../../services/api';
import {Subscription} from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-chat-area',
  imports: [ScrollPanelModule, ScrollingModule, NgClass],
  templateUrl: './chat-area.html',
  styleUrl: './chat-area.scss'
})

export class ChatArea implements OnInit {
  chatMessages: ChatMessages = [];
  chatMessagesSubscription: Subscription;
  constructor(private api: Api) {
    // TODO Generics
    this.chatMessagesSubscription = this.api.wsMessages$.subscribe((message) => {
      if(message.type === 'chatMessage') {
        this.chatMessages = [...this.chatMessages, message.chatMessage]
      }
    })
  }

  ngOnInit(): void {

  }

  trackByMessageId(index: number, message: ChatMessage): number {
    return message.id; // Returns the unique 'id' from your ChatMessage object
  }
}
