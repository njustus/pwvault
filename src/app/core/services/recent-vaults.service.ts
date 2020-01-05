import { Injectable } from '@angular/core';
import { createDecipher, createCipher } from 'crypto';
import { writeFile, readFile } from 'fs';
import { cipherName, encoding } from '../constants';
import { promisify } from 'util';
import * as R from 'ramda'

const recentVaultsKey = 'recent-vaults'

@Injectable({
  providedIn: 'root'
})
export class RecentVaultsService {
  constructor() { }

  public fetchVaults(): string[] {
    const vaultsStr = window.localStorage.getItem(recentVaultsKey)
    return (vaultsStr) ? JSON.parse(vaultsStr) : []
  }

  public addVault(vaultPath: string): void {
    const vaults = this.fetchVaults()
    const newVaults = R.prepend(vaultPath, R.filter(v => v !== vaultPath, vaults))
    window.localStorage.setItem(recentVaultsKey, JSON.stringify(newVaults))
  }
}
