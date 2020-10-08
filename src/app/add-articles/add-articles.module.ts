import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddArticlesPageRoutingModule } from './add-articles-routing.module';

import { AddArticlesPage } from './add-articles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddArticlesPageRoutingModule
  ],
  declarations: [AddArticlesPage],
  providers: [
    FormData
  ]
})
export class AddArticlesPageModule {}
