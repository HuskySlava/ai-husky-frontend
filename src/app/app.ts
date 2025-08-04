import { Component, signal } from '@angular/core';
import {ChatArea} from './components/chat-area/chat-area';
import {InitService} from './services/init.service';
import {PromptInput} from './components/prompt-input/prompt-input';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ChatArea, PromptInput],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  constructor(private initService: InitService) {
    this.initService.init();
  }
  protected readonly title = signal('ai-husky-frontend');

}
