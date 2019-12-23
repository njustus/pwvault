import { Component, OnInit } from '@angular/core';
import { Vault } from '../vault/vault';
import { CryptoFileService } from '../core/services/crypto-file.service';
import * as R from 'ramda'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private readonly cryptoFS: CryptoFileService<Vault>) { }

  ngOnInit() {
    const vault = {
      name: "test-vault",
      sourceFile: "./vault.enc",
      description: 'test',
      entries: R.repeat({
        name: 'GitHub',
        username: 'pwv-user',
        password: "awesomeness123456"
      }, 5)
    }

    this.cryptoFS.write(vault, "123456", vault.sourceFile)
    console.log("encoded to: ", vault.sourceFile)

    console.log("decoded: ", this.cryptoFS.read("123456", vault.sourceFile))
  }

}
