import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeTest } from './prime-test/prime-test';
import { ThemeSwitch } from './components/theme-switch/theme-switch';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PrimeTest, ThemeSwitch],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ai-husky-frontend');
}
