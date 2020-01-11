import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-vault-entry',
  templateUrl: './edit-vault-entry.component.html',
  styleUrls: ['./edit-vault-entry.component.scss']
})
export class EditVaultEntryComponent implements OnInit {

  private entryName?: string
  private entryForm: FormGroup

  constructor() {
    this.entryForm = new FormGroup({
      name: new FormControl(),
      username: new FormControl(),
      password: new FormControl()
    })
  }

  ngOnInit() {
  }

  updateEntry(): void {
    const entry = this.entryForm.value
    console.log("updating entry: ", entry)
  }

}
