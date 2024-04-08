import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {forkJoin, map, Observable, startWith} from "rxjs";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {insumo} from "../../Interfaces/insumo";
import {InsumoService} from "../../Services/insumo/insumo.service";
import {Egreso} from "../../Interfaces/egreso";
import {EgresoService} from "../../Services/egreso/egreso.service";

@Component({
  selector: 'app-crear-insumo-modal',
  templateUrl: './crear-insumo-modal.page.html',
  styleUrls: ['./crear-insumo-modal.page.scss'],
})
export class CrearInsumoModalPage implements OnInit{
  insumos: string[] = [];
  filteredOptions: Observable<string[]> | undefined;
  nombreControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(40),
    Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
  ]);
  cantidadControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^\d+$/), // solo valores numéricos enteros
    Validators.min(1) // la cantidad debe ser mayor a 0
  ]);
  totalCompraControl = new FormControl('',[
    Validators.required,
    Validators.pattern(/^\d+$/), // solo valores numéricos enteros
    Validators.min(1) // la cantidad debe ser mayor a 0
  ]);
  origenControl = new FormControl(null, [
    Validators.required
  ]);

  imagenControl = new FormControl();
  //form con todos los campos
  form = new FormGroup({
    totalCompra : this.totalCompraControl,
    origen: this.origenControl,
    imagen: this.imagenControl
  });

  //flag para verificar la carga de los datos
  isLoading = true;
  //flag para saber cuando se esta agregando un insumo a stagging
  isAgregandoInsumo = false;
  //staging insumos
  insumosAGuardar : insumo[] = [];
  //error agregar insumo
  errorAgregarInsumo = false;
  //origen de salida del dinero
  origenDeduccion : string[] = ['Caja menor', 'Caja mayor']
  //imagen del egreso
  fileName = '';
  fileError = '';
  selectedImage: SafeResourceUrl = '';
  imagenUrl: SafeResourceUrl = '';
  imagen: SafeResourceUrl = '';
  constructor(private modalController: ModalController,
              private fb: FormBuilder,
              private sanitizer: DomSanitizer,
              private insumoService : InsumoService,
              private egresoService : EgresoService) { }

  ngOnInit(): void {
    this.getInsumos();

    this.insumoService.refreshNeeded.subscribe(
      () => {
        this.getInsumos();
      }
    );

    // Verificamos si el control del formulario "nombre" existe antes de acceder a sus propiedades
    this.filteredOptions = this.nombreControl.valueChanges
      .pipe(
        // @ts-ignore
        startWith(''),
        map((value: string) => this._filter(value))
      );
    }





  cerrarModal() {
    this.modalController.dismiss();
  }

  //METODOS
  //funcion para construir la descripcion
  private descripcionEgreso(insumos : insumo[]): string{
    let descripcion = 'Se realizó la compra de los siguientes insumos:';
    //recorrer el array de insumos para crear la descripcion
    insumos.forEach(insumo => {
      const texto = ` ${insumo.nombre} x${insumo.cantidad}`
      descripcion += texto
    });
    descripcion += '.';
    return descripcion;
  }

  //manejo de la imagen del egreso
  onImageError() {
    // Puedes realizar otras acciones aquí, como establecer una imagen de reemplazo.
    this.selectedImage = 'assets/img/placeholder-hamburguesa.png';
  }
  // Función para manejar el cambio de archivo
  onFileChange(event: any) {
    //selecciona el elemento fuente del objeto
    const fileInput = event.target;

    //asegurando que el evento si contenga una imagen
    if(fileInput.files && fileInput.files.length > 0){
      const file = event.target.files[0];

      //verificar que el tamaño de la imagen sea menor a 2mb
      if(file.size <= 5 * 1024 * 1024){ // 2 MB en bytes
        this.imagenControl.setValue(file);
        this.fileName = fileInput.files[0].name;
        this.fileError = ''; //Limpiar el mensaje de error si estaba presente

        //mostrar la imagen seleccionada
        const reader = new FileReader();
        reader.onload = (e) => {
          this.selectedImage = e.target?.result as string;
        };

        reader.readAsDataURL(file);
      }
      else{
        this.fileError = '¡Error!, la imagen del egreso no puede superar los 5mb.'
        // Restablecer el valor del input de archivo para permitir una nueva selección
        fileInput.value = '';
        //limpiar nombre del filename
        this.fileName = '';
        // Limpiar la imagen seleccionada si hay error
        this.selectedImage = '';
      }
    }

  }

  //fin del manejo de la imagen del egreso

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.insumos.filter(option => option.toLowerCase().includes(filterValue));
  }
  public changeIsAgregandoInsumo(){
    this.isAgregandoInsumo = !this.isAgregandoInsumo;
  }
  //agregar insumo al stagging
  public agregarAlStagging(){
    //crear instancia del insumo
    if(this.nombreControl.value != '' && this.cantidadControl.value != ''){

      const insumo : insumo = {
        id: 0,
        // @ts-ignore
        nombre: this.nombreControl.value,
        // @ts-ignore
        cantidad: this.cantidadControl.value
      }

      this.errorAgregarInsumo = false;

      //agregar el insumo al staggin
      this.insumosAGuardar.push(insumo);
      //ocultar ventana y resetear formulario
      this.nombreControl.setValue('');
      this.cantidadControl.setValue('');
      this.isAgregandoInsumo = false;
    }else{
      this.errorAgregarInsumo = true;
    }

  }

  //Quitar un insumo del array
  public quitarInsumo(i : number) {
    this.insumosAGuardar.splice(i, 1);
  }


  private getInsumos() {
    this.isLoading = true;
    this.insumoService.getInsumos()
      .subscribe(
        (result) => {
          const insumosObj = result.object;
          this.insumos = [];
          insumosObj.forEach(insumo => {
            this.insumos.push(insumo.nombre)
          })
        }, error => {
          console.log(error)
        },
        () => {
          this.isLoading = false;
        }
      );
  }


  public onSubmit() {
    if (this.form.valid) {
      // Crear la descripción del egreso
      const descripcion = this.descripcionEgreso(this.insumosAGuardar);

      // Construir el objeto egreso
      const egreso: Egreso = {
        id: 0,
        // @ts-ignore
        total: this.totalCompraControl.value?.toString(),
        categoria: 'Compra de insumos',
        // @ts-ignore
        deduccionDesde: this.origenControl.value,
        soporte: this.imagenControl.value,
        fecha: null,
        descripcion: descripcion
      };

      // Array de observables para almacenar todas las peticiones
      const observables = [];

      // Agregar la petición para crear el egreso al array de observables
      observables.push(this.egresoService.crearEgreso(egreso));

      // Iterar sobre cada insumo y agregar la petición para crearlo al array de observables
      this.insumosAGuardar.forEach(insumo => {
        observables.push(this.insumoService.crearInsumo(insumo));
      });

      // Usar forkJoin para combinar todas las peticiones y esperar a que se completen
      forkJoin(observables).subscribe(
        () => {
          const response = {
            estado: true
          };
          this.modalController.dismiss(response)
        },
        error => {
          const response = {
            estado: false
          };

          this.modalController.dismiss(response)
        }
      );
    }
}
}
