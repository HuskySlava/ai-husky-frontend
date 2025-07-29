import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-prime-test',
  imports: [ButtonModule],
  templateUrl: './prime-test.html',
  standalone: true,
  styleUrl: './prime-test.scss'
})
export class PrimeTest {

}
