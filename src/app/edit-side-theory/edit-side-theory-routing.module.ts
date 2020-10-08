import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditSideTheoryPage } from './edit-side-theory.page';

const routes: Routes = [
  {
    path: '',
    component: EditSideTheoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditSideTheoryPageRoutingModule {}
