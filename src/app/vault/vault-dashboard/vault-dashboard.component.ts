import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { vaultAddressKey, editEntryName } from 'app/core/constants';
import { map, share, first, distinctUntilChanged, filter, flatMap, tap, shareReplay } from 'rxjs/operators';
import { Observable, Subject, Subscription } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LockedVaultModalComponent } from '../locked-vault-modal/locked-vault-modal.component';
import Mousetrap from 'mousetrap'
import { Vault, decodeVaultAddressParam, encodeVaultAddressParam } from '../vault';
import { VaultEntry, entryHasCategory } from '../vault-entry';
import { OpenedVaultService } from '../opened-vault.service';
import { replace } from 'ramda';
import * as R from 'ramda';
import { CategoryProviderService, Category } from 'app/core/services/category-provider.service';

const allEntries: Category = { name: 'All', icon: 'id-card' }

@Component({
  selector: 'app-vault-dashboard',
  templateUrl: './vault-dashboard.component.html',
  styleUrls: ['./vault-dashboard.component.scss']
})
export class VaultDashboardComponent implements OnInit, OnDestroy {

  private readonly vaultPath$: Observable<string>
  private readonly locked$: Subject<boolean> = new Subject()
  private displayedEntries?: VaultEntry[]

  public selectedEntry?: VaultEntry;
  public selectedCategory?: Category;
  public vault?: Vault;

  constructor(private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly zone: NgZone,
    private readonly modalService: BsModalService,
    private readonly categoryProvider: CategoryProviderService,
    private readonly openedVaultService: OpenedVaultService) {

    this.selectedCategory = this.categories[0]

    this.vaultPath$ = this.activatedRoute.queryParamMap.pipe(
      map(decodeVaultAddressParam)
    )
  }

  ngOnInit() {
    this.setupKeybindings()
    this.openedVaultService.vault$.subscribe(vault => {
      console.log("unlock vault:", vault)
      this.vault = vault
      this.displayedEntries = R.values(vault.entries)
      this.selectedEntry = undefined
      this.locked$.next(false)
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

  get entries(): VaultEntry[] {
    return R.sortBy(e => e.name, this.displayedEntries)
  }

  get categories(): Category[] {
    return [allEntries, ...this.categoryProvider.categories]
  }

  onEntryClicked(entry: VaultEntry) {
    this.selectedEntry = entry
  }

  onCategoryClicked(category: Category) {
    this.selectedCategory = category
    const entries = R.values(this.vault.entries)

    this.displayedEntries = (category === allEntries) ?
      entries :
      R.filter(e => entryHasCategory(e, category), entries);
  }


  editEntry(entry?: VaultEntry) {
    this.vaultPath$.pipe(
      map(encodeVaultAddressParam),
      first()
    ).subscribe(params => {
      console.log("got params")

      if (entry) {
        params[editEntryName] = encodeURIComponent(entry.name)
      }

      this.router.navigate(['/vault/vault-entry/edit'], { queryParams: params })
    })

    return false
  }

  private displayLockedModal(vaultPath: string) {
    const options = {
      ignoreBackdropClick: true,
      initialState: { vaultPath }
    }
    const modalRef = this.modalService.show(LockedVaultModalComponent, options)
  }

  private setupKeybindings(): void {
    Mousetrap.bind(['command+l', 'ctrl+l'], () => this.zone.run(() => this.lockVault()))
    Mousetrap.bind(['command+n', 'ctrl+n'], () => this.zone.run(() => this.editEntry()))
    Mousetrap.bind(['command+e', 'ctrl+e'], () => this.zone.run(() => this.editEntry(this.selectedEntry)))
  }
}
