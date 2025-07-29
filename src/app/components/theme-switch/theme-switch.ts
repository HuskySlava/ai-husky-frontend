import { Component } from '@angular/core';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-theme-switch',
  imports: [ToggleSwitchModule, FormsModule],
  templateUrl: './theme-switch.html',
  styleUrl: './theme-switch.scss'
})

// TODO: ThemeSwitch service implementation and usage
export class ThemeSwitch {
  checked: boolean;
  constructor() {
    this.checked = true
  }
}
