import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageSideTheoryPageRoutingModule } from './manage-side-theory-routing.module';

import { ManageSideTheoryPage } from './manage-side-theory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ManageSideTheoryPageRoutingModule
  ],
  declarations: [ManageSideTheoryPage]
})
export class ManageSideTheoryPageModule {}
