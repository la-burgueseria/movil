import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    this._storage = await this.storage.create();
  }

  async set(key: string, value: any) {
    await this._storage?.set(key, value);
  }

  async get(key: string): Promise<any> {
    return await this._storage?.get(key);
  }

  async remove(key: string) {
    await this._storage?.remove(key);
  }

  async update(key: string, newValue: any) {
    const currentValue = await this.get(key);

    if (currentValue !== undefined && currentValue !== null) {
      const updatedValue = { ...currentValue, ...newValue };
      await this.set(key, updatedValue);
    } else {
      console.log(`No se encontró ningún valor asociado a la clave '${key}'.`);
    }
  }
}
