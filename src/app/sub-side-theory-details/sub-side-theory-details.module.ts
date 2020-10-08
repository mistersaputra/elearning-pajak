import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubSideTheoryDetailsPageRoutingModule } from './sub-side-theory-details-routing.module';

import { SubSideTheoryDetailsPage } from './sub-side-theory-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubSideTheoryDetailsPageRoutingModule
  ],
  declarations: [SubSideTheoryDetailsPage]
})
export class SubSideTheoryDetailsPageModule {}
