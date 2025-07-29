import { v4 as uuid } from 'uuid';
import {ChatMessage, ChatMessages} from '../interfaces/chat.interfaces'; // Import v4 as uuidv4

export class User {
  readonly id: string;
  readonly displayName: string;
  public chatMessages: ChatMessages = [];

  constructor(id: number, displayName: string) {
    this.id = uuid();
    this.displayName = "Test User"
  }

  clearChatMessages(): void {
    this.chatMessages = [];
  }

  addChatMessage(chatMessage: ChatMessage): void {
    this.chatMessages.push(chatMessage);
  }

  findChatMessage(messageId: number): ChatMessage | undefined {
    return this.chatMessages.find((msg) => msg.id === messageId);
  }

  removeChatMessage(messageId: number): boolean {
    const index = this.chatMessages.findIndex(msg => msg.id === messageId);
    if (index > -1) {
      this.chatMessages.splice(index, 1);
      return true;
    }
    return false;
  }

  getLastMessages(count: number): ChatMessages {
    return this.chatMessages.slice(-count);
  }
}
