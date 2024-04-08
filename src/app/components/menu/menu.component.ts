import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  radius = 40;
  color = 'rgba(94,239,255,0.63)'
  constructor(private navCtrl: NavController) {
  }

  goToInsumos() {
    this.navCtrl.navigateRoot('/insumos')
  }

  goToGastos(){
    this.navCtrl.navigateRoot('/egreso')
  }
  cerrarSesion(){
    this.navCtrl.navigateBack('/')
  }
}
