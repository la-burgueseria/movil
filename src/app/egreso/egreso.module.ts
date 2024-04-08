import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EgresoPageRoutingModule } from './egreso-routing.module';

import { EgresoPage } from './egreso.page';
import {InsumosPageModule} from "../insumos/insumos.module";
import {
    BootstrapRangeCalendarComponent
} from "../components/bootstrap-range-calendar/bootstrap-range-calendar.component";
import {NgbInputDatepicker} from "@ng-bootstrap/ng-bootstrap";
import {MatRipple} from "@angular/material/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        EgresoPageRoutingModule,
        InsumosPageModule,
        NgbInputDatepicker,
        MatRipple
    ],
    declarations: [EgresoPage, BootstrapRangeCalendarComponent]
})
export class EgresoPageModule {}
