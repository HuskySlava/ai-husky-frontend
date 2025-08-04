import {Component, OnDestroy} from '@angular/core';
import { TextareaModule } from 'primeng/textarea';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputGroup } from 'primeng/inputgroup';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import {ChatMessagesService} from '../../services/chat-messages.service';
import { v4 as uuidv4 } from 'uuid';
import {Subscription} from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-prompt-input',
  imports: [
    TextareaModule,
    FormsModule,
    ReactiveFormsModule,
    InputGroup,
    Button,
    InputText
  ],
  templateUrl: './prompt-input.html',
  styleUrls: ['./prompt-input.scss']
})
export class PromptInput implements OnDestroy {
  public promptForm: FormGroup;

  private readonly isMessageServiceBusySubscription: Subscription;
  public isMessageServiceBusy: boolean = false;

  constructor(private chatMessagesService: ChatMessagesService) {
    this.promptForm = new FormGroup({
      inputPrompt: new FormControl('', Validators.required)
    });
    this.isMessageServiceBusySubscription = this.chatMessagesService.isBusy$.subscribe((isBusy: boolean) => {
      this.isMessageServiceBusy = isBusy;
    })
  }

  async ask() {
    if (this.promptForm.valid) {
      const message = this.promptForm.get('inputPrompt')?.value;
      console.log('Submitted prompt:', this.promptForm.value.inputPrompt);
      if(message){
        await this.chatMessagesService.sendMessage({
          id: uuidv4(),
          timestamp: Date.now(),
          type: "outgoing",
          text: message
        })
      }

      this.promptForm.get('inputPrompt')?.setValue("")

    } else {
      this.promptForm.markAllAsTouched();
    }
  }

  ngOnDestroy(): void {
    this.isMessageServiceBusySubscription && this.isMessageServiceBusySubscription.unsubscribe();
  }
}
