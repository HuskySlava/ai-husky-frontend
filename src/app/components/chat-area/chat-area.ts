import {Component, NgZone, OnInit} from '@angular/core';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import {ChatMessage} from '../../interfaces/chat.interfaces';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {NgClass} from '@angular/common';
import {Subscription} from 'rxjs';
import {ChatMessagesService} from '../../services/chat-messages.service';

@Component({
  standalone: true,
  selector: 'app-chat-area',
  imports: [ScrollPanelModule, ScrollingModule, NgClass],
  templateUrl: './chat-area.html',
  styleUrl: './chat-area.scss'
})

export class ChatArea implements OnInit {
  chatMessages: ChatMessage[] = [];
  chatMessagesSubscription: Subscription = new Subscription();

  constructor(private chatMessagesService: ChatMessagesService, private zone: NgZone) {

  }

  ngOnInit(): void {
    this.chatMessagesSubscription = this.chatMessagesService.messages$.subscribe(messages => {
      this.chatMessages = messages;
    })
    // this.zone.run(() => {
    //
    // });
  }

  ngOnDestroy(): void {
    this.chatMessagesSubscription && this.chatMessagesSubscription.unsubscribe();
  }

  pushMessage(message: ChatMessage) {
    this.chatMessages = [...this.chatMessages, message];
  }

  trackByMessageDate(index: number, message: ChatMessage): number {
    return message.timestamp; // Returns the unique 'id' from your ChatMessage object
  }
}
