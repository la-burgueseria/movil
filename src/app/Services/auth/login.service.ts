import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, tap, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {LoginRequest} from "./loginRequest";
import {EnvService} from "../env/env.service";
import {StorageService} from "../storage.service";


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  currentUserLoginOn : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData : BehaviorSubject<String> = new BehaviorSubject<String>("");
  constructor(private http: HttpClient, private env : EnvService, private storage : StorageService) {
    this.loginStatus();
  }
  async loginStatus(){
    this.currentUserLoginOn = new BehaviorSubject<boolean>(await this.storage.get("token") != null);
    this.currentUserData = new BehaviorSubject<String>(await this.storage.get("token") || "");
  }

  login(credentials:LoginRequest):Observable<any>{
    return this.http.post<any>(this.env.urlHost+"/auth/login", credentials).pipe(
      tap(
        async (userData) => {
          console.log("datos-login ",userData)
          await this.storage.init(); // Asegurar que el almacenamiento esté inicializado antes de usarlo
          await this.storage.set("token", userData.token);
          await this.storage.set("nombre", userData.nombre);
          await this.storage.set("rol", userData.rol);
          await this.storage.set("empleadoId", userData.empleadoId);
          await this.storage.set("apellido", userData.apellido);

          this.currentUserData.next(userData.token);
          this.currentUserLoginOn.next(true);
        }
      ),
      map(
        (userData) => {
          userData.token
        }
      )
    )
  }

  async logout(){
    await this.storage.init(); // Asegurar que el almacenamiento esté inicializado antes de usarlo
    await this.storage.remove("token");
    await this.storage.remove("nombre");
    await this.storage.remove("apellido");
    await this.storage.remove("rol");
    await this.storage.remove("empleadoId");
    this.currentUserLoginOn.next(false);

  }


  get userData():Observable<String>{
    return this.currentUserData.asObservable();
  }

  get userLoginOn(): Observable<boolean>{
    return this.currentUserLoginOn.asObservable();
  }

  get userToken():String{
    return this.currentUserData.value;
  }
}
