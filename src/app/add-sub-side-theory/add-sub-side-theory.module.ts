import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddSubSideTheoryPageRoutingModule } from './add-sub-side-theory-routing.module';

import { AddSubSideTheoryPage } from './add-sub-side-theory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddSubSideTheoryPageRoutingModule
  ],
  declarations: [AddSubSideTheoryPage]
})
export class AddSubSideTheoryPageModule {}
