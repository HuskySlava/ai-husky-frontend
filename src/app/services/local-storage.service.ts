import { Injectable } from '@angular/core';

const LS_PREFIX = 'ai-husky__';

@Injectable({
  providedIn: 'root'
})

// TODO: Handle unsupported local storage
export class LocalStorageService {
  private localeStorage: Storage;

  constructor() {
    this.localeStorage = window.localStorage;
  }

  public setKey(key: string, value: string): void {
    this.localeStorage.setItem(LS_PREFIX + key, value);
  }

  public getKey(key: string) : string | null {
    return this.localeStorage.getItem(LS_PREFIX + key);
  }

  public removeKey(key: string): void {
    this.localeStorage.removeItem(LS_PREFIX + key);
  }

  public clearAll(): void {
    Object.keys(this.localeStorage)
      .filter(key => key.startsWith(LS_PREFIX))
      .forEach(key => this.localeStorage.removeItem(key));
  }

}
