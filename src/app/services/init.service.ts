import { Injectable, signal, WritableSignal, Signal } from '@angular/core';
import { UserService } from './user.service';
import { Api } from './api';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {LocalStorageService} from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class InitService {
  private _isInitialized: WritableSignal<boolean> = signal(false);
  private wsInitSubscription: Subscription;

  public readonly initFinished: Signal<boolean> = this._isInitialized.asReadonly();

  constructor(
    private userService: UserService,
    private api: Api,
    private localStorageService: LocalStorageService,
  ) {
    this.wsInitSubscription = this.api.wsMessages$.subscribe((message) => {
      if(message.type === "init") {
        this.wsInitSubscription.unsubscribe();
        this._isInitialized.set(true);
        this.localStorageService.setKey('user_uuid', message.uuid)
      }
    })
  }

  async init() {
    // Init user
    const user = this.userService.anonymousLogin();

    // Wait for socket connection
    await this.api.init(user);

  }

  get isInitialized(): boolean {
    return this._isInitialized();
  }
}
