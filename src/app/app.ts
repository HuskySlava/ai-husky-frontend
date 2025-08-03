import { Component, signal } from '@angular/core';
import { ThemeSwitch } from './components/theme-switch/theme-switch';
import {ChatArea} from './components/chat-area/chat-area';
import {InitService} from './services/init.service';
import {Api} from './services/api';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ThemeSwitch, ChatArea],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  constructor(private initService: InitService, private api: Api) {
    this.initService.init();
  }
  protected readonly title = signal('ai-husky-frontend');

  sendChatMessage(e: any){
    this.api.sendMessage({
      id: uuidv4(),
      type: 'outgoing',
      text: e.value,
      timestamp: Date.now()
    })
    e.value = ""
  }
}
