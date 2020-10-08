import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddSideTheoryPageRoutingModule } from './add-side-theory-routing.module';

import { AddSideTheoryPage } from './add-side-theory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddSideTheoryPageRoutingModule
  ],
  declarations: [AddSideTheoryPage]
})
export class AddSideTheoryPageModule {}
