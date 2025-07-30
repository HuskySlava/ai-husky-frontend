import { Injectable } from '@angular/core';
import {User} from '../models/user.model';
import {LocalStorageService} from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user: User | undefined;
  constructor(
    private localStorageService: LocalStorageService
  ) {}

  // For testing
  anonymousLogin() {
    const previousSessionUserUUID = this.localStorageService.getKey("user_uuid");
    this.user = new User(previousSessionUserUUID ? previousSessionUserUUID : undefined, "Guest");
    return this.user;
  }
}
