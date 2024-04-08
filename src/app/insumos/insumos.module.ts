import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InsumosPageRoutingModule } from './insumos-routing.module';

import { InsumosPage } from './insumos.page';
import {MatRipple} from "@angular/material/core";
import {MenuComponent} from "../components/menu/menu.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InsumosPageRoutingModule,
    MatRipple
  ],
  exports: [
    MenuComponent
  ],
  declarations: [InsumosPage, MenuComponent]
})
export class InsumosPageModule {}
