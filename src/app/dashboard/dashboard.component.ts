import { Component, OnInit } from '@angular/core';
import * as electron from 'electron';
import { from } from 'rxjs';
import { filter } from 'rxjs/operators';
import { CryptoFileService } from '../core/services/crypto-file.service';
import { Vault, encodeVaultAddressParam } from '../vault/vault';
import { Router } from '@angular/router';
import { vaultAddressKey } from 'app/core/constants';
import { RecentVaultsService } from 'app/core/services/recent-vaults.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private readonly cryptoFS: CryptoFileService<Vault>,
    private readonly recentVaultsService: RecentVaultsService,
    private readonly router: Router) { }

  ngOnInit() { }

  get recentVaults(): string[] {
    return this.recentVaultsService.fetchVaults()
  }

  showOpenDialog() {
    const promise = electron.remote.dialog.showOpenDialog({ title: 'Open vault', })

    from(promise)
      .pipe(filter(obj => !obj.canceled))
      .subscribe(obj => {
        const vaultPath = obj.filePaths[0]
        this.openVault(vaultPath)
      })
  }

  openVault(vaultPath: string) {
    this.recentVaultsService.addVault(vaultPath)
    this.router.navigate(['/vault'], { queryParams: encodeVaultAddressParam(vaultPath) })
  }
}
