import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { VaultStoreService } from '../vault-store.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { Vault } from '../vault';
import { Subject } from 'rxjs';
import { OpenedVaultService } from '../opened-vault.service';

@Component({
  selector: 'app-locked-vault-modal',
  templateUrl: './locked-vault-modal.component.html',
  styleUrls: ['./locked-vault-modal.component.scss']
})
export class LockedVaultModalComponent implements OnInit {

  vaultPath: string;

  readonly passwordControl: FormControl
  error?: string = undefined

  constructor(
    private readonly vaultService: VaultStoreService,
    private readonly openedVaultService: OpenedVaultService,
    private readonly modalRef: BsModalRef,
    private readonly router: Router) {
    this.passwordControl = new FormControl('', [Validators.required])
  }

  ngOnInit() {
  }

  unlock() {
    const password = this.passwordControl.value
    this.vaultService.openVault(this.vaultPath, password)
      .then(vault => {
        this.openedVaultService.updateVault(vault, password)
        this.modalRef.hide()
      })
      .catch(err => {
        if (err.code === 'ERR_OSSL_BAD_DECRYPT') {
          this.error = undefined
          window.setTimeout(() => this.error = 'wrong masterkey!')
        }
      })
  }

  hide() {
    this.modalRef.hide()
    this.router.navigate(['dashboard'])
  }
}
