import { Injectable, signal, WritableSignal, Signal } from '@angular/core';
import { UserService } from './user.service';
import { Api } from './api';

@Injectable({
  providedIn: 'root'
})
export class InitService {
  private _isInitialized: WritableSignal<boolean> = signal(false);

  public readonly initFinished: Signal<boolean> = this._isInitialized.asReadonly();

  constructor(private userService: UserService, private api: Api) {

  }

  async init() {
    // Init user
    this.userService.anonymousLogin();

    // Wait for socket connection
    await this.api.init();

    this._isInitialized.set(true);
  }

  get isInitialized(): boolean {
    return this._isInitialized();
  }
}
