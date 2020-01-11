import 'reflect-metadata';
import '../polyfills';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faPlus,
  faMinus,
  faCross,
  faUserAlt,
  faPencilAlt,
  faKey,
  faUnlock,
  faLock,
  faIdCard,
  faAt,
  faFolderOpen,
  faSave,
  faEye,
  faEyeSlash,
  faClone
} from '@fortawesome/free-solid-svg-icons';

import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewVaultComponent } from './vault/new-vault/new-vault.component';
import { VaultDashboardComponent } from './vault/vault-dashboard/vault-dashboard.component';
import { LockedVaultModalComponent } from './vault/locked-vault-modal/locked-vault-modal.component';
import { VaultEntryComponent } from './vault/vault-entry/vault-entry.component';
import { EditVaultEntryComponent } from './vault/vault-entry/edit-vault-entry/edit-vault-entry.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, DashboardComponent, NewVaultComponent, VaultDashboardComponent, LockedVaultModalComponent, VaultEntryComponent, EditVaultEntryComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    FontAwesomeModule,
    ModalModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    LockedVaultModalComponent
  ]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    //register used icons here
    library.addIcons(
      faPlus,
      faMinus,
      faCross,
      faUserAlt,
      faPencilAlt,
      faKey,
      faUnlock,
      faLock,
      faIdCard,
      faAt,
      faFolderOpen,
      faSave,
      faEye,
      faEyeSlash,
      faClone
    )
  }
}
