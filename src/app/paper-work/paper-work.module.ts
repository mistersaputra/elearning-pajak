import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { PaperWorkPageRoutingModule } from './paper-work-routing.module';

import { PaperWorkPage } from './paper-work.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaperWorkPageRoutingModule,
    ReactiveFormsModule,
    NgxDatatableModule
  ],
  declarations: [PaperWorkPage]
})
export class PaperWorkPageModule {}
