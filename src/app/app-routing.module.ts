import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';
import { DashboardComponent } from './dashboard/dashboard.component';
import * as R from 'ramda';
import { NewVaultComponent } from './vault/new-vault/new-vault.component';
import { VaultDashboardComponent } from './vault/vault-dashboard/vault-dashboard.component';
import { EditVaultEntryComponent } from './vault/vault-entry/edit-vault-entry/edit-vault-entry.component';

const routes: Routes = [{
  path: '',
  redirectTo: 'dashboard',
  pathMatch: 'full'
}, {
  path: 'dashboard',
  component: DashboardComponent
}, {
  path: 'vault/new',
  component: NewVaultComponent
}, {
  path: "vault/vault-entry/edit",
  component: EditVaultEntryComponent
}, {
  path: 'vault',
  component: VaultDashboardComponent
}]

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
