import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryProviderService } from './services/category-provider.service';
import { IconProviderService } from './services/icon-provider.service';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule
  ],
  providers: [
    CategoryProviderService,
    IconProviderService
  ]
})
export class CoreModule { }
