import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as electron from 'electron';
import * as R from 'ramda';
import * as faker from 'faker';
import { filter } from 'rxjs/operators';
import { from } from 'rxjs';
import { VaultStoreService } from '../vault-store.service';
import { Router } from '@angular/router';
import { VaultEntry } from '../vault-entry';
import { Vault } from '../vault';

function generateFakeEntries(): VaultEntry[] {
  return R.map(_x => ({
    name: faker.internet.domainName(),
    username: faker.internet.userName(),
    password: faker.internet.password()
  }),
    R.repeat(1, 10))
}

@Component({
  selector: 'app-new-vault',
  templateUrl: './new-vault.component.html',
  styleUrls: ['./new-vault.component.scss']
})
export class NewVaultComponent implements OnInit {

  public readonly vaultForm: FormGroup;

  constructor(private readonly vaultService: VaultStoreService,
    private readonly router: Router) {
    this.vaultForm = new FormGroup({
      sourceFile: new FormControl('', [
        Validators.required
      ]),
      name: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
      description: new FormControl('', [
        Validators.required
      ])
    })
  }

  ngOnInit() {
  }

  get sourceFile(): string | undefined {
    const str = this.vaultForm.get('sourceFile').value
    return R.isEmpty(str) ? undefined : str
  }

  selectVaultFile() {
    const promise = electron.remote.dialog.showSaveDialog({
      title: 'vault file'
    })

    from(promise).pipe(filter(obj => !obj.canceled))
      .subscribe(obj => {
        this.vaultForm.get('sourceFile').setValue(obj.filePath)
      })
  }

  createVault() {
    const vault = this.vaultForm.value
    const password = vault.password
    delete vault.password
    vault.entries = generateFakeEntries()

    console.log("creating vault: ", vault)
    this.vaultService.saveVault(vault, password)
      .then(path => {
        const notification = new Notification("Vault created!", {
          body: `vault '${vault.name}' created at: ${path}`
        })

        this.router.navigate(['/'])
      })
  }

}
