import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearInsumoModalPageRoutingModule } from './crear-insumo-modal-routing.module';

import { CrearInsumoModalPage } from './crear-insumo-modal.page';
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatTooltip} from "@angular/material/tooltip";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CrearInsumoModalPageRoutingModule,
        MatFormField,
        MatTooltip,
        MatAutocomplete,
        MatOption,
        MatError,
        MatSelect,
        ReactiveFormsModule,
        MatAutocompleteTrigger,
        MatInput,
        MatLabel,
        MatButton
    ],
  declarations: [CrearInsumoModalPage]
})
export class CrearInsumoModalPageModule {}
