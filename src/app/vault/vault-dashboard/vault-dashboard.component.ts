import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { vaultAddressKey } from 'app/core/constants';
import { map, share } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-vault-dashboard',
  templateUrl: './vault-dashboard.component.html',
  styleUrls: ['./vault-dashboard.component.scss']
})
export class VaultDashboardComponent implements OnInit {

  private readonly vaultPath$: Observable<string>;
  private readonly locked$: Subject<boolean>;

  constructor(private readonly activatedRoute: ActivatedRoute) {
    this.locked$ = new Subject()

    this.vaultPath$ = this.activatedRoute.queryParamMap.pipe(
      map(params => params.get(vaultAddressKey)),
      map(encodedPath => decodeURIComponent(encodedPath)),
      share())
  }

  ngOnInit() {
    this.locked$.next(true)
  }
}
