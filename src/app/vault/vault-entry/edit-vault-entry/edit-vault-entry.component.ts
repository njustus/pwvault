import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { decodeVaultAddressParam, encodeVaultAddressParam } from 'app/vault/vault';
import { map, first } from 'rxjs/operators';
import { OpenedVaultService } from 'app/vault/opened-vault.service';

@Component({
  selector: 'app-edit-vault-entry',
  templateUrl: './edit-vault-entry.component.html',
  styleUrls: ['./edit-vault-entry.component.scss']
})
export class EditVaultEntryComponent implements OnInit {

  private entryName?: string
  private entryForm: FormGroup

  constructor(
    private readonly vaultService: OpenedVaultService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router) {

    this.entryForm = new FormGroup({
      name: new FormControl(),
      username: new FormControl(),
      password: new FormControl()
    })
  }

  get vaultParam$(): Observable<any> {
    return this.activatedRoute.queryParamMap.pipe(
      map(decodeVaultAddressParam),
      map(encodeVaultAddressParam),
      first()
    )
  }

  ngOnInit() {
  }

  updateEntry(): void {
    const entry = this.entryForm.value
    entry.icon = 'id-card'
    console.log("updating entry: ", entry)
    this.vaultService.updateEntry(entry)
    this.navigateToVaultDashboard()
  }

  navigateToVaultDashboard(): void {
    this.vaultParam$.subscribe(param => {
      this.router.navigate(['/vault'], { queryParams: param })
    })
  }

}
