import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditSideTheoryPageRoutingModule } from './edit-side-theory-routing.module';

import { EditSideTheoryPage } from './edit-side-theory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditSideTheoryPageRoutingModule
  ],
  declarations: [EditSideTheoryPage]
})
export class EditSideTheoryPageModule {}
