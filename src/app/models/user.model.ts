import { v4 as uuid } from 'uuid';

export class User {
  readonly id: string;
  readonly displayName: string;

  constructor(id?: string, displayName?: string) {
    this.id = id ? id : '';
    this.displayName = displayName ? displayName : "Test User";
  }

}
