import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearInsumoModalPage } from './crear-insumo-modal.page';

const routes: Routes = [
  {
    path: '',
    component: CrearInsumoModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearInsumoModalPageRoutingModule {}
