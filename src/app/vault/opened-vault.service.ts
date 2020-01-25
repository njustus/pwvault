import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';
import { map, share, shareReplay, tap } from 'rxjs/operators';
import { Vault } from './vault';
import { VaultEntry } from './vault-entry';
import { VaultStoreService } from './vault-store.service';

@Injectable({
  providedIn: 'root'
})
export class OpenedVaultService {

  private readonly openedVault$: ReplaySubject<Vault> = new ReplaySubject(1);
  private currentVault?: Vault
  private vaultSecret?: string

  constructor(private readonly vaultStore: VaultStoreService) {
    console.log("new OpenedVaultService")
    this.vault$.subscribe(vault => {
      console.log("opened current vault: ", vault)
      this.currentVault = vault
    })
  }

  updateVault(vault: Vault, vaultSecret: string, persist?: boolean): void {
    this.vaultSecret = vaultSecret
    this.openedVault$.next(vault)

    console.log("updating vault: ", vault)

    if (persist) {
      this.vaultStore.saveVault(vault, vaultSecret).then(
        str => console.log("vault updated: ", str),
        err => console.error("could not update vault: ", err)
      )
    }
  }

  updateEntry(entry: VaultEntry, originalName?: string): void {
    if (originalName) {
      delete this.currentVault.entries[originalName]
    }

    this.currentVault.entries[entry.name] = entry
    this.updateVault(this.currentVault, this.vaultSecret, true)
  }

  get vault$(): Observable<Vault> {
    return this.openedVault$;
  }

  findEntry$(name: string): Observable<VaultEntry> {
    console.log("find entry: ", name)
    return this.vault$.pipe(
      map(vault => ({ ...vault.entries[name] }))
    )
  }
}
