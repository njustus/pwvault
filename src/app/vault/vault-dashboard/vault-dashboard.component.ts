import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { vaultAddressKey } from 'app/core/constants';
import { map, share, first } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { BsModalService } from 'ngx-bootstrap/modal';
import { LockedVaultModalComponent } from '../locked-vault-modal/locked-vault-modal.component';

@Component({
  selector: 'app-vault-dashboard',
  templateUrl: './vault-dashboard.component.html',
  styleUrls: ['./vault-dashboard.component.scss']
})
export class VaultDashboardComponent implements OnInit {

  private readonly vaultPath$: Observable<string>;
  private readonly locked$: Subject<boolean>;

  constructor(private readonly activatedRoute: ActivatedRoute,
    private readonly modalService: BsModalService) {
    this.locked$ = new Subject()

    this.vaultPath$ = this.activatedRoute.queryParamMap.pipe(
      map(params => params.get(vaultAddressKey)),
      map(encodedPath => decodeURIComponent(encodedPath)),
      share())
  }

  ngOnInit() {
    this.locked$.next(true)

    this.vaultPath$.pipe(first()).subscribe(vaultPath => {
      const initialState = {
        vaultPath
      }
      this.modalService.show(LockedVaultModalComponent, { initialState })
    })
  }
}
