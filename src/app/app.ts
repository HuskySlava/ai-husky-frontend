import { Component, signal } from '@angular/core';
import { ThemeSwitch } from './components/theme-switch/theme-switch';
import {ChatArea} from './components/chat-area/chat-area';
import {InitService} from './services/init.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ThemeSwitch, ChatArea],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  constructor(private initService: InitService) {
    this.initService.init();
  }
  protected readonly title = signal('ai-husky-frontend');
}
