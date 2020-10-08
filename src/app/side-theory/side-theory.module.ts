import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SideTheoryPageRoutingModule } from './side-theory-routing.module';

import { SideTheoryPage } from './side-theory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SideTheoryPageRoutingModule
  ],
  declarations: [SideTheoryPage]
})
export class SideTheoryPageModule {}
