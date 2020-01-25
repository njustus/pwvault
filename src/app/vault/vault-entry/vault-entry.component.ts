import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { VaultEntry } from '../vault-entry';
import * as R from 'ramda'
import { clipboard } from 'electron'

function clearClipboard(): void {
  console.log("clearing clipboard..")
  clipboard.clear()
}

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

  @Output() editEntry: EventEmitter<VaultEntry> = new EventEmitter()
  @Input() entry: VaultEntry

  public readonly stars: string = R.repeat('*', 5).join('')

  constructor() { }

  public ngOnInit(): void {
  }

  public get entryFields(): EntryField[] {
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

  public copyValue(field: EntryField): void {
    clipboard.writeText(field.value)

    //clear clipboard after 10 sec
    setTimeout(clearClipboard, 10000)
  }

  public editEntryClicked(): void {
    this.editEntry.emit(this.entry)
  }
}
