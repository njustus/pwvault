import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { decodeVaultAddressParam, encodeVaultAddressParam } from 'app/vault/vault';
import { map, first, filter, flatMap } from 'rxjs/operators';
import { OpenedVaultService } from 'app/vault/opened-vault.service';
import { editEntryName } from 'app/core/constants';

@Component({
  selector: 'app-edit-vault-entry',
  templateUrl: './edit-vault-entry.component.html',
  styleUrls: ['./edit-vault-entry.component.scss']
})
export class EditVaultEntryComponent implements OnInit {

  public entryName?: string
  public entryForm: FormGroup

  constructor(
    private readonly vaultService: OpenedVaultService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router) {

    const validators = [Validators.required,
    Validators.minLength(2)]

    this.entryForm = new FormGroup({
      name: new FormControl('', validators),
      username: new FormControl('', validators),
      password: new FormControl('', validators),
      icon: new FormControl(),
      lastUpdatedAt: new FormControl()
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
    this.setEditEntryName()
  }

  updateEntry(): void {
    const entry = this.entryForm.value
    entry.icon = 'id-card'
    console.log("updating entry: ", entry)
    this.vaultService.updateEntry(entry, this.entryName)
    this.navigateToVaultDashboard()
  }

  navigateToVaultDashboard(): void {
    this.vaultParam$.subscribe(param => {
      this.router.navigate(['/vault'], { queryParams: param })
    })
  }

  //fetch editing entry from queryparam if available
  private setEditEntryName(): void {
    this.activatedRoute.queryParamMap.pipe(
      filter(paramMap => paramMap.has(editEntryName)),
      map(paramMap => paramMap.get(editEntryName)),
      map(decodeURIComponent),
      first(),
      flatMap(name => this.vaultService.findEntry$(name))
    )
      .subscribe(entry => {
        this.entryName = entry.name
        this.entryForm.setValue(entry)
      })
  }

}
