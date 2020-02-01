import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { decodeVaultAddressParam, encodeVaultAddressParam } from 'app/vault/vault';
import { map, first, filter, flatMap } from 'rxjs/operators';
import { OpenedVaultService } from 'app/vault/opened-vault.service';
import { editEntryName } from 'app/core/constants';
import { IconProviderService, IconDescription } from 'app/core/services/icon-provider.service';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/public_api';

@Component({
  selector: 'app-edit-vault-entry',
  templateUrl: './edit-vault-entry.component.html',
  styleUrls: ['./edit-vault-entry.component.scss']
})
export class EditVaultEntryComponent implements OnInit {
  public entryName?: string
  public entryForm: FormGroup

  public readonly availableIcons = this.iconProvider.icons.map(descr => descr.brand)

  constructor(
    private readonly vaultService: OpenedVaultService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly iconProvider: IconProviderService,
    private readonly router: Router) {

    const validators = [Validators.required,
    Validators.minLength(2)]

    this.entryForm = new FormGroup({
      name: new FormControl('', validators),
      username: new FormControl('', validators),
      password: new FormControl('', validators),
      icon: new FormControl(),
      url: new FormControl(),
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

  iconForBrand(brand: string): IconDefinition {
    return this.iconProvider.iconForBrand(brand).icon
  }

  ngOnInit() {
    this.setEditEntryName()
  }

  onBrandSelect($event: TypeaheadMatch): void {
    const brand = $event.item
    const url = this.iconProvider.urlForBrand(brand)
    if (url) {
      this.entryForm.get('url').setValue(url)
    }
  }

  updateEntry(): void {
    const entry = this.entryForm.value
    entry.icon = this.iconProvider.iconForBrand(entry.icon)
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
        this.entryForm.setValue({
          ...entry,
          url: (entry.url) ? entry.url : '',
          icon: entry.icon.brand
        })
      })
  }

}
