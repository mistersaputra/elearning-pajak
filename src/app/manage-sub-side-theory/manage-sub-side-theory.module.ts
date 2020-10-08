import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageSubSideTheoryPageRoutingModule } from './manage-sub-side-theory-routing.module';

import { ManageSubSideTheoryPage } from './manage-sub-side-theory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageSubSideTheoryPageRoutingModule
  ],
  declarations: [ManageSubSideTheoryPage]
})
export class ManageSubSideTheoryPageModule {}
