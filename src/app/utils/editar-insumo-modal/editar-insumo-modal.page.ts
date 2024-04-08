import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import {insumo} from "../../Interfaces/insumo";


@Component({
  selector: 'app-editar-insumo-modal',
  templateUrl: './editar-insumo-modal.page.html',
  styleUrls: ['./editar-insumo-modal.page.scss'],
})
export class EditarInsumoModalPage implements OnInit {
  @Input() insumo: insumo | undefined;

  editarInsumoForm!: FormGroup;

  constructor(private modalController: ModalController, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.editarInsumoForm = this.formBuilder.group({
      nombre: [this.insumo?.nombre, Validators.required],
      cantidad: [0, [Validators.pattern('[0-9]+')]],
    });
  }

  cerrarModal() {
    this.modalController.dismiss();
  }

  guardarCambios() {
    if (this.editarInsumoForm.valid) {
      const { nombre, cantidad } = this.editarInsumoForm.value;
      // Aquí puedes procesar la actualización del insumo

      const insumoActualizado: { cantidad: number; nombre: any } = {
        ...this.insumo,
        nombre,
        // @ts-ignore
        cantidad: this.insumo?.cantidad - cantidad, // Convertir a número
      };
      this.modalController.dismiss(insumoActualizado);
    }
  }
}
