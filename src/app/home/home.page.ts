import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StorageService } from '../Services/storage.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../Services/auth/login.service";
import {LoginRequest} from "../Services/auth/loginRequest";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{

  form : FormGroup = this.fb.group({
    username: [null, [Validators.required]],
    password: [null, [Validators.required]],
  })
  hide: boolean = true;
  constructor(
    private navCtrl: NavController,
    private storage: StorageService,
    private fb : FormBuilder,
    private loginService : LoginService,) {}

  iniciarSesion() {
    if(this.form.valid){
      this.loginService.login(this.form.value as LoginRequest).subscribe(
        result => {
        },error => {
          console.log(error)
        },
        ()=>{
          this.navCtrl.navigateForward('/insumos');
        }
      )
    }else{
      this.form.markAsTouched();
    }
  }
}
