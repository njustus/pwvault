import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as electron from 'electron';
import * as R from 'ramda'
import { filter } from 'rxjs/operators';
import { from } from 'rxjs';

@Component({
  selector: 'app-new-vault',
  templateUrl: './new-vault.component.html',
  styleUrls: ['./new-vault.component.scss']
})
export class NewVaultComponent implements OnInit {

  public readonly vaultForm: FormGroup;

  constructor() {
    this.vaultForm = new FormGroup({
      sourceFile: new FormControl('', [
        Validators.required
      ]),
      name: new FormControl('', [
        Validators.required
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
    console.log("creating vault: ", this.vaultForm.value)
  }
}
