import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { vaultAddressKey } from 'app/core/constants';
import { map, share, first } from 'rxjs/operators';
import { Observable, Subject, Subscription } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LockedVaultModalComponent } from '../locked-vault-modal/locked-vault-modal.component';
import { Vault } from '../vault';

@Component({
  selector: 'app-vault-dashboard',
  templateUrl: './vault-dashboard.component.html',
  styleUrls: ['./vault-dashboard.component.scss']
})
export class VaultDashboardComponent implements OnInit, OnDestroy {

  private readonly vaultPath$: Observable<string>
  private readonly vault$: Subject<Vault> = new Subject()
  private readonly locked$: Subject<boolean> = new Subject()

  constructor(private readonly activatedRoute: ActivatedRoute,
    private readonly modalService: BsModalService) {

    this.vaultPath$ = this.activatedRoute.queryParamMap.pipe(
      map(params => params.get(vaultAddressKey)),
      map(encodedPath => decodeURIComponent(encodedPath)),
      share())
  }

  ngOnInit() {
    this.lockVault()

    this.vault$.subscribe(x => console.log("vault: ", x))
  }

  ngOnDestroy() {
  }

  lockVault() {
    this.locked$.next(true)

    this.vaultPath$.pipe(first()).subscribe(vaultPath => {
      const options = {
        ignoreBackdropClick: true,
        initialState: { vaultPath }
      }
      const modalRef = this.modalService.show(LockedVaultModalComponent, options)

      modalRef.content.openedVault$.pipe(first()).subscribe(vault => this.vault$.next(vault))
    })
  }
}
