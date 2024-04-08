import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'insumos',
    loadChildren: () => import('./insumos/insumos.module').then( m => m.InsumosPageModule)
  },
  {
    path: 'editar-insumo-modal',
    loadChildren: () => import('./utils/editar-insumo-modal/editar-insumo-modal.module').then( m => m.EditarInsumoModalPageModule)
  },
  {
    path: 'crear-insumo-modal',
    loadChildren: () => import('./utils/crear-insumo-modal/crear-insumo-modal.module').then( m => m.CrearInsumoModalPageModule)
  },
  {
    path: 'egreso',
    loadChildren: () => import('./egreso/egreso.module').then( m => m.EgresoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
