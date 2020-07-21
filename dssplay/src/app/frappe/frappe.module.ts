import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FrappeFiltersComponent } from './frappe-filters/frappe-filters.component';


@NgModule({
  declarations: [FrappeFiltersComponent],
  imports: [
    CommonModule
  ],
  exports: [FrappeFiltersComponent]
})
export class FrappeModule { }
