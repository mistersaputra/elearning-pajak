import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditSubSideTheoryPageRoutingModule } from './edit-sub-side-theory-routing.module';

import { EditSubSideTheoryPage } from './edit-sub-side-theory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditSubSideTheoryPageRoutingModule
  ],
  declarations: [EditSubSideTheoryPage]
})
export class EditSubSideTheoryPageModule {}
