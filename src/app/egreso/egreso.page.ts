import { Component, OnInit } from '@angular/core';
import { Egreso } from '../Interfaces/egreso';
import { EgresoService } from '../Services/egreso/egreso.service';
import { FechaHoraService } from '../Services/fechas/fecha-hora.service';

@Component({
  selector: 'app-egreso',
  templateUrl: './egreso.page.html',
  styleUrls: ['./egreso.page.scss'],
})
export class EgresoPage implements OnInit {

  // Parámetros de paginación
  pagina = 0;
  tamano = 10;
  order = 'id';
  asc = true;
  isFirst = false;
  isLast = false;

  // Lista de egresos
  egresos: Egreso[] = [];

  // Variables de fecha
  horaActual = new Date().toISOString(); // Obtener la fecha y hora actual en formato ISO string
  fechaHoraInicioUTC = this.horaActual;
  fechaHoraFinUTC: string | null = null;

  // Datos recibidos del componente de calendario
  datosRecibidos!: { fromDate: Date | null, toDate: Date | null };

  // Verificación de sesión
  userLoginOn = false;

  // Verificación de carga de datos
  isLoading = false;

  radius = 150;
  color = 'rgba(146, 211, 186, 0.51)'
  constructor(public fechaService: FechaHoraService, private egresoService: EgresoService) { }

  ngOnInit(): void {
    this.egresoService.refreshNeeded.subscribe(() => {
      this.getEgresoByFechaPage(this.fechaHoraInicioUTC, this.fechaHoraFinUTC);
    });
    this.getEgresoByFechaPage(this.fechaHoraInicioUTC, this.fechaHoraFinUTC);
  }

  recibirDatosCalendario(datos: { fromDate: Date | null, toDate: Date | null }): void {
    this.datosRecibidos = datos;
    if (this.datosRecibidos.fromDate) {
      this.fechaHoraInicioUTC = this.datosRecibidos.fromDate.toISOString(); // Convertir a formato ISO string
      if (this.datosRecibidos.toDate) {
        this.fechaHoraFinUTC = this.datosRecibidos.toDate.toISOString(); // Convertir a formato ISO string
      } else {
        this.fechaHoraFinUTC = null;
      }
      this.getEgresoByFechaPage(this.fechaHoraInicioUTC, this.fechaHoraFinUTC);
    }
  }

  private getEgresoByFechaPage(fechaInicio: string, fechaFin: string | null): void {
    this.isLoading = true;
    this.egresoService.getEgresoPageableByFecha(fechaInicio, fechaFin, this.pagina, this.tamano, this.order, this.asc)
      .subscribe(
        data => {
          this.egresos = data.object.content;
          this.isFirst = data.object.first;
          this.isLast = data.object.last;
          // Convertir la fecha de cada egreso de array a objeto Date
          this.egresos.forEach(egreso => {
            const [year, month, day, hour, minute, second, millisecond] = egreso.fecha;
            egreso.fecha = new Date(year, month - 1, day, hour, minute, second, millisecond / 1000000);
          });
          console.log(this.egresos);

        },
        error => {
          console.log(error);
        },
        () => {
          this.isLoading = false;
        }
      );
  }

  // Eliminar egreso
  public deleteEgreso(id: number): void {
    this.egresoService.deleteEgreso(id).subscribe();
  }

}
