import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubSideTheoryPageRoutingModule } from './sub-side-theory-routing.module';

import { SubSideTheoryPage } from './sub-side-theory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubSideTheoryPageRoutingModule
  ],
  declarations: [SubSideTheoryPage]
})
export class SubSideTheoryPageModule {}
