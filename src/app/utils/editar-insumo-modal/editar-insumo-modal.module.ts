import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarInsumoModalPageRoutingModule } from './editar-insumo-modal-routing.module';

import { EditarInsumoModalPage } from './editar-insumo-modal.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        EditarInsumoModalPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [EditarInsumoModalPage]
})
export class EditarInsumoModalPageModule {}
