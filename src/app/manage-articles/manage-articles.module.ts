import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageArticlesPageRoutingModule } from './manage-articles-routing.module';

import { ManageArticlesPage } from './manage-articles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageArticlesPageRoutingModule
  ],
  declarations: [ManageArticlesPage]
})
export class ManageArticlesPageModule {}
