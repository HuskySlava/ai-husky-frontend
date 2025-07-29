import { Injectable } from '@angular/core';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user: User | undefined;
  constructor() {}

  // For testing
  anonymousLogin() {
    this.user = new User(undefined, "Guest");
  }
}
