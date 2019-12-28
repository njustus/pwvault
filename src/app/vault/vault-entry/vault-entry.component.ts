import { Component, OnInit, Input } from '@angular/core';
import { VaultEntry } from '../vault-entry';
import * as R from 'ramda'

interface EntryField {
  icon: string
  value: string
  protected?: boolean
}

@Component({
  selector: 'app-vault-entry',
  templateUrl: './vault-entry.component.html',
  styleUrls: ['./vault-entry.component.scss']
})
export class VaultEntryComponent implements OnInit {

  @Input() entry: VaultEntry

  public readonly stars: string = R.repeat('*', 5).join('')

  constructor() { }

  ngOnInit() {
  }

  get entryFields(): EntryField[] {
    return [
      {
        icon: 'id-card',
        value: this.entry.username
      },
      {
        icon: 'key',
        value: this.entry.password,
        protected: true
      }
    ]
  }
}
