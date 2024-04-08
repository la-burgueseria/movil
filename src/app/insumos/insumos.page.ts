import { Component, OnInit } from '@angular/core';
import {insumo} from "../Interfaces/insumo";
import {InsumoService} from "../Services/insumo/insumo.service";
import {FormControl, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {LoginService} from "../Services/auth/login.service";
import {AlertController, ModalController} from "@ionic/angular";
import {EditarInsumoModalPage} from "../utils/editar-insumo-modal/editar-insumo-modal.page";
import {CrearInsumoModalPage} from "../utils/crear-insumo-modal/crear-insumo-modal.page";

@Component({
  selector: 'app-insumos',
  templateUrl: './insumos.page.html',
  styleUrls: ['./insumos.page.scss'],
})
export class InsumosPage implements OnInit {
  insumos : insumo[] = [];
  public nombreBusqueda : string = "";
  public isNombreBusqueda : boolean = false;
  //parametros paginacion
  pagina = 0;
  tamano = 10;
  order = 'id';
  asc = true;
  isFirst = false;
  isLast = false;
  //variables para editar un insumo en especifico
  modoEdicion :boolean = false;
  cantidadEditada = new FormControl(0, [Validators.required,  Validators.pattern(/^(0|[1-9]\d*)$/)]);
  insumoEditandoIndex : number | null = null;
  nombreEditado = new FormControl('', [Validators.required,  Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚüÜ\s]+$/)] )
  //verificacion de sesion
  userLoginOn : boolean = false;
  //VARIFICAR SI ESTA CARGANDO
  isLoading : boolean = true;
  //ripple style
  radius = 150;
  color = 'rgba(146, 211, 186, 0.51)'
  constructor(private insumoService : InsumoService,
              public dialog : MatDialog,
              private loginService : LoginService,
              private modalController : ModalController,
              private alertController : AlertController) { }

  ngOnInit() {
    this.loginService.userLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      }
    });

    this.insumosGetAll()
  }



  public setIsNombreBusqueda(valor : boolean) :void{
    this.isNombreBusqueda = valor;
  }
  private insumosGetAll(){
    this.insumoService.getInsumos().subscribe(
      result => {
        this.insumos = result.object;
      }, error => {
        console.log(error)
      }
    )
  }

  public buscarInsumos(){
    if(this.nombreBusqueda.length == 0){
      this.setIsNombreBusqueda(false);
      this.insumosGetAll();
    }else{
      this.insumoService.buscarPorNombre(this.nombreBusqueda)
        .subscribe(
          insumo =>{
            this.insumos = insumo.object;
          },
          error =>{
            console.log(error)
          },
          () => {
            this.isLoading = false;
          }
        );
      this.setIsNombreBusqueda(true);
    }

  }
  async editarInsumo(insumo: insumo) {
    const modal = await this.modalController.create({
      component: EditarInsumoModalPage,
      componentProps: {
        insumo: insumo
      }
    });

    modal.onDidDismiss().then((data) => {
      if(data.data){
        const insumo : insumo = data.data;
        if(insumo.cantidad < 0){
          const titulo : string = "Error"
          const mensaje :string = "La cantidad de insumos a deducir es inválida."
          this.errorAlert(mensaje, titulo);
        }else{
          this.insumoService.actualizarInsumos(insumo)
            .subscribe(
              result => {
                this.insumos = [];
                this.insumosGetAll();
              }, error => {
                if(error.status === '409'){
                  console.log("eerrrroroor")
                  const titulo : string = "Error"
                  const mensaje :string = "Ya existe un insumo con este nombre."
                  this.errorAlert(mensaje, titulo);
                }else{
                  console.log(error);
                }
              }, ()=> {
                const titulo : string = "Exito";
                const mensaje : string = "Se ha actualizado el insumo correctamente";
                this.errorAlert(mensaje, titulo);
              }
            )
        }
      }
    });

    return await modal.present();
  }


  borrarInsumo(event: Event, insumo : insumo) {
    event.stopPropagation(); // Evita que el evento se propague
    if(insumo.cantidad > 0){
      const titulo : string = "Error"
      const mensaje :string = "Solo se pueden eliminar insumos cuya cantidad sea 0."
      this.errorAlert(mensaje, titulo);
    }else{
      this.insumoService.deleteInsumo(insumo.id).subscribe(
        result => {
          this.insumos = []
          this.insumosGetAll();
          const titulo : string = "Exito";
          const mensaje : string = "Se ha eliminado el insumo exitosamente";
          this.errorAlert(mensaje, titulo);
        }
      )
    }
  }

  async addInsumos(){
    const modal = await this.modalController.create({
      component: CrearInsumoModalPage
    })

    modal.onDidDismiss().then((data)=> {
      if(data.data){
        if(data.data.estado){
          const titulo : string = "Exito";
          const mensaje : string = "Se ha añadido el insumo exitosamente";
          this.errorAlert(mensaje, titulo);
          this.insumos = [];
          this.insumosGetAll();
        }else{
          const titulo : string = "Error";
          const mensaje : string = "Ha ocurrido un error mientras se agregaban los insumos";
          this.errorAlert(mensaje, titulo);
        }
      }
    });

    return await modal.present();
  }

  //alertas
  async errorAlert(mensaje : string, titulo : string){
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['Cerrar']
    });
    await alert.present();
  }
}
