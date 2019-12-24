import { Component, OnInit } from '@angular/core';
import { Vault } from '../vault/vault';
import { CryptoFileService } from '../core/services/crypto-file.service';
import * as R from 'ramda'
import * as electron from 'electron';
import { filter } from 'rxjs/operators';
import { from } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private readonly cryptoFS: CryptoFileService<Vault>) { }

  ngOnInit() { }


  openVault() {
    const promise = electron.remote.dialog.showOpenDialog({ title: 'Open vault' })
    from(promise)
      .pipe(filter(obj => !obj.canceled))
      .subscribe(obj => console.log("opening: ", obj.filePaths[0]), err => console.error("didn't open dialog: ", err))
  }
}
