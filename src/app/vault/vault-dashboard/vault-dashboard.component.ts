import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { vaultAddressKey } from 'app/core/constants';
import { map, share, first, distinctUntilChanged, filter, flatMap, tap } from 'rxjs/operators';
import { Observable, Subject, Subscription } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LockedVaultModalComponent } from '../locked-vault-modal/locked-vault-modal.component';
import Mousetrap from 'mousetrap'
import { Vault } from '../vault';
import { VaultEntry } from '../vault-entry';

@Component({
  selector: 'app-vault-dashboard',
  templateUrl: './vault-dashboard.component.html',
  styleUrls: ['./vault-dashboard.component.scss']
})
export class VaultDashboardComponent implements OnInit, OnDestroy {

  private readonly vaultPath$: Observable<string>
  private readonly vault$: Subject<Vault> = new Subject()
  private readonly locked$: Subject<boolean> = new Subject()

  private selectedEntry?: VaultEntry

  constructor(private readonly activatedRoute: ActivatedRoute,
    private readonly modalService: BsModalService) {

    this.vaultPath$ = this.activatedRoute.queryParamMap.pipe(
      map(params => params.get(vaultAddressKey)),
      map(encodedPath => decodeURIComponent(encodedPath)))
  }

  ngOnInit() {
    this.vault$.subscribe(x => console.log("vault: ", x))

    Mousetrap.bind(['command+l', 'ctrl+l'], () => {
      this.lockVault()
    })

    this.locked$.asObservable().pipe(
      distinctUntilChanged(),
      filter(b => b),
      flatMap(_b => this.vaultPath$)
    ).subscribe(path => this.displayLockedModal(path))

    this.lockVault()
  }

  ngOnDestroy() {
  }

  lockVault() {
    this.locked$.next(true)
  }

  onEntryClicked(entry: VaultEntry) {
    this.selectedEntry = entry
  }

  private displayLockedModal(vaultPath: string) {
    const options = {
      ignoreBackdropClick: true,
      initialState: { vaultPath }
    }
    const modalRef = this.modalService.show(LockedVaultModalComponent, options)

    modalRef.content.openedVault$.pipe(first()).subscribe(vault => {
      this.locked$.next(false)
      this.vault$.next(vault)
    })
  }
}
