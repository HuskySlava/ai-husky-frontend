import { Component, signal } from '@angular/core';
import { ThemeSwitch } from './components/theme-switch/theme-switch';
import {ChatArea} from './components/chat-area/chat-area';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ThemeSwitch, ChatArea],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ai-husky-frontend');
}
