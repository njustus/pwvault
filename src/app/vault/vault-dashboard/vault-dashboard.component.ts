import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { vaultAddressKey } from 'app/core/constants';
import { map, share, first, distinctUntilChanged, filter, flatMap, tap, shareReplay } from 'rxjs/operators';
import { Observable, Subject, Subscription } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LockedVaultModalComponent } from '../locked-vault-modal/locked-vault-modal.component';
import Mousetrap from 'mousetrap'
import { Vault, decodeVaultAddressParam, encodeVaultAddressParam } from '../vault';
import { VaultEntry } from '../vault-entry';
import { OpenedVaultService } from '../opened-vault.service';
import { replace } from 'ramda';

@Component({
  selector: 'app-vault-dashboard',
  templateUrl: './vault-dashboard.component.html',
  styleUrls: ['./vault-dashboard.component.scss']
})
export class VaultDashboardComponent implements OnInit, OnDestroy {

  private readonly vaultPath$: Observable<string>
  private readonly vault$: Observable<Vault>;
  private readonly locked$: Subject<boolean> = new Subject()

  private selectedEntry?: VaultEntry

  constructor(private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly modalService: BsModalService,
    private readonly openedVaultService: OpenedVaultService) {

    this.vaultPath$ = this.activatedRoute.queryParamMap.pipe(
      map(decodeVaultAddressParam)
    )
    this.vault$ = openedVaultService.vault$.pipe(shareReplay(1));
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

  lockVault(): boolean {
    this.locked$.next(true)
    return false
  }

  get entries$(): Observable<VaultEntry[]> {
    return this.vault$.pipe(
      map(vault => Object.values(vault.entries))
    )
  }

  onEntryClicked(entry: VaultEntry) {
    this.selectedEntry = entry
  }

  editEntry(entry?: VaultEntry) {
    if (entry) {
      console.error("editing not implemented yet!")
    } else {
      console.log("new entry")
      this.vaultPath$.pipe(
        map(encodeVaultAddressParam),
        first()
      ).subscribe(params => {
        console.log("got params")
        this.router.navigate(['/vault/vault-entry/edit'], { queryParams: params })
      })
    }

    return false
  }

  private displayLockedModal(vaultPath: string) {
    const options = {
      ignoreBackdropClick: true,
      initialState: { vaultPath }
    }
    const modalRef = this.modalService.show(LockedVaultModalComponent, options)

    modalRef.content.openedVault$.pipe(first()).subscribe(vault => {
      this.locked$.next(false)
      this.openedVaultService.updateVault(vault)
    })
  }
}
