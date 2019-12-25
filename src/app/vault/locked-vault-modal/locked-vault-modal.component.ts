import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { VaultStoreService } from '../vault-store.service';

@Component({
  selector: 'app-locked-vault-modal',
  templateUrl: './locked-vault-modal.component.html',
  styleUrls: ['./locked-vault-modal.component.scss']
})
export class LockedVaultModalComponent implements OnInit {

  vaultPath: string;

  readonly passwordControl: FormControl
  error?: string = undefined

  constructor(private readonly vaultService: VaultStoreService) {
    this.passwordControl = new FormControl('', [Validators.required])
  }

  ngOnInit() {
  }

  unlock() {
    const password = this.passwordControl.value
    this.vaultService.openVault(this.vaultPath, password)
      .then(vault => console.log("vault opened: ", vault))
      .catch(err => {
        if (err.code === 'ERR_OSSL_BAD_DECRYPT') {
          this.error = undefined
          window.setTimeout(() => this.error = 'wrong masterkey!')
        }
      })
  }

}
