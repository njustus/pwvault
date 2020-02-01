import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { VaultEntry } from '../vault-entry';
import * as R from 'ramda'
import Mousetrap from 'mousetrap'
import { clipboard } from 'electron'
import { OpenedVaultService } from '../opened-vault.service';

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

  constructor(private readonly vaultService: OpenedVaultService) { }

  public ngOnInit(): void {
    this.setupKeybindings()
  }

  public get entryFields(): EntryField[] {
    return [{
      icon: 'id-card',
      value: this.entry.username
    }, {
      icon: 'key',
      value: this.entry.password,
      protected: true
    }, {
      icon: 'globe',
      value: this.entry.url
    }]
  }

  public copyValue(field: EntryField): void {
    clipboard.writeText(field.value)

    //clear clipboard after 10 sec
    setTimeout(clearClipboard, 10000)
  }

  public editEntryClicked(): void {
    this.editEntry.emit(this.entry)
  }

  public deleteEntryClicked(): void {
    const reallyDelete = window.confirm(`You really want to delete: '${this.entry.name}' ?`)

    if (reallyDelete) {
      console.log("deleting entry..")
      this.vaultService.deleteEntry(this.entry.name)
    }
  }

  private setupKeybindings(): void {
    Mousetrap.bind(['command+b', 'ctrl+b'], () => this.copyValue(this.entryFields[0]))
    Mousetrap.bind(['command+c', 'ctrl+c'], () => this.copyValue(this.entryFields[1]))
  }
}
