import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArticlesPageRoutingModule } from './articles-routing.module';

import { ArticlesPage } from './articles.page';
import { SimpleDatePipe } from '../../pipes/simple-date/simple-date.pipe';
import { SliceTextPipe } from '../../pipes/slice-text/slice-text.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArticlesPageRoutingModule
  ],
  declarations: [
    ArticlesPage,
    SimpleDatePipe,
    SliceTextPipe
  ]
})
export class ArticlesPageModule {}
