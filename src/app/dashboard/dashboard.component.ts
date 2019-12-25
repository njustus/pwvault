import { Component, OnInit } from '@angular/core';
import * as electron from 'electron';
import { from } from 'rxjs';
import { filter } from 'rxjs/operators';
import { CryptoFileService } from '../core/services/crypto-file.service';
import { Vault } from '../vault/vault';
import { Router } from '@angular/router';
import { vaultAddressKey } from 'app/core/constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private readonly cryptoFS: CryptoFileService<Vault>,
    private readonly router: Router) { }

  ngOnInit() { }


  openVault() {
    const promise = electron.remote.dialog.showOpenDialog({ title: 'Open vault', })
    from(promise)
      .pipe(filter(obj => !obj.canceled))
      .subscribe(obj => {
        const params = { [vaultAddressKey]: encodeURIComponent(obj.filePaths[0]) }
        this.router.navigate(['/vault'], { queryParams: params })
      })
  }
}
