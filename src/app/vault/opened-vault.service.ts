import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Vault } from './vault';
import { VaultEntry } from './vault-entry';

@Injectable({
  providedIn: 'root'
})
export class OpenedVaultService {

  private readonly openedVault$: Subject<Vault> = new Subject()

  constructor() { }

  updateVault(vault: Vault): void {
    this.openedVault$.next(vault)
  }

  get vault$(): Observable<Vault> {
    return this.openedVault$.asObservable();
  }

  findEntry$(name: string): Observable<VaultEntry> {
    return this.openedVault$.asObservable().pipe(
      map(vault => vault.entries.find(entry => entry.name == name))
    )
  }
}
