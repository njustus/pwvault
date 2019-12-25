import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { vaultAddressKey } from 'app/core/constants';
import { map, share, first } from 'rxjs/operators';
import { Observable, Subject, Subscription } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LockedVaultModalComponent } from '../locked-vault-modal/locked-vault-modal.component';

@Component({
  selector: 'app-vault-dashboard',
  templateUrl: './vault-dashboard.component.html',
  styleUrls: ['./vault-dashboard.component.scss']
})
export class VaultDashboardComponent implements OnInit, OnDestroy {

  private readonly vaultPath$: Observable<string>;
  private readonly locked$: Subject<boolean>;

  private hideSubscription: Subscription;

  constructor(private readonly activatedRoute: ActivatedRoute,
    private readonly modalService: BsModalService) {
    this.locked$ = new Subject()

    this.vaultPath$ = this.activatedRoute.queryParamMap.pipe(
      map(params => params.get(vaultAddressKey)),
      map(encodedPath => decodeURIComponent(encodedPath)),
      share())
  }

  ngOnInit() {
    let modalRef: BsModalRef | undefined = undefined;
    this.locked$.next(true)

    this.hideSubscription = this.modalService.onHide.subscribe(ev => console.log("content ", modalRef.content))

    this.vaultPath$.pipe(first()).subscribe(vaultPath => {
      const options = {
        ignoreBackdropClick: true,
        initialState: { vaultPath }
      }
      modalRef = this.modalService.show(LockedVaultModalComponent, options)
    })
  }

  ngOnDestroy() {
    this.hideSubscription.unsubscribe()
  }
}
