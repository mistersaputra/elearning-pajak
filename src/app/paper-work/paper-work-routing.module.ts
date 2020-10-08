import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaperWorkPage } from './paper-work.page';

const routes: Routes = [
  {
    path: '',
    component: PaperWorkPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaperWorkPageRoutingModule {}
