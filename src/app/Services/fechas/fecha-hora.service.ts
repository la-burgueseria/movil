import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FechaHoraService {

  constructor() { }

  // Función para obtener un string con la fecha y hora actual en formato yyyy-MM-ddTHH:mm:ss
  public obtenerFechaHoraLocalActual(): string {
    const fechaHoraLocal = new Date();
    const year = fechaHoraLocal.getFullYear();
    const month = this.padZero(fechaHoraLocal.getMonth() + 1);
    const day = this.padZero(fechaHoraLocal.getDate());
    const hours = this.padZero(fechaHoraLocal.getHours());
    const minutes = this.padZero(fechaHoraLocal.getMinutes());
    const seconds = this.padZero(fechaHoraLocal.getSeconds());
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }

  // Función para convertir horario local a UTC
  public convertirFechaHoraLocalAUTC(fechaHoraLocal: string): string {
    const fechaHoraLocalObj = new Date(fechaHoraLocal);
    const fechaHoraUTC = fechaHoraLocalObj.toISOString();
    return fechaHoraUTC;
  }

  // Función para convertir UTC a horario local
  public convertirUTCAFechaHoraLocal(fechaHoraUTC: string | undefined): string {
    if (fechaHoraUTC) {
      const fechaHoraUTCObj = new Date(fechaHoraUTC);
      const fechaHoraLocal = fechaHoraUTCObj.toLocaleString(); // Esto devuelve la fecha y hora en el formato local del navegador.
      return fechaHoraLocal;
    } else {
      return "xd";
    }
  }

  // Función para convertir formato personalizado a yyyy-MM-dd'T'HH:mm:ss.SSSXXX
  public convertirLocalFormatAFormatoEstandar(fechaHoraString: string): string {
    const [day, month, year, time] = fechaHoraString.split(', ');
    const [hours, minutes, seconds] = time.split(':');
    const fechaHoraParsed = new Date(`${month}/${day}/${year} ${hours}:${minutes}:${seconds}`);
    const pattern = 'yyyy-MM-dd\'T\'HH:mm:ss.SSSXXX';
    return this.formatDate(fechaHoraParsed, pattern);
  }

  // Función para formatear la fecha según el patrón deseado
  private formatDate(date: Date, pattern: string): string {
    const year = date.getFullYear();
    const month = this.padZero(date.getMonth() + 1);
    const day = this.padZero(date.getDate());
    const hours = this.padZero(date.getHours());
    const minutes = this.padZero(date.getMinutes());
    const seconds = this.padZero(date.getSeconds());
    const milliseconds = this.padZero(date.getMilliseconds(), 3);
    return pattern
      .replace('yyyy', year.toString())
      .replace('MM', month)
      .replace('dd', day)
      .replace('HH', hours)
      .replace('mm', minutes)
      .replace('ss', seconds)
      .replace('SSS', milliseconds);
  }

  // Función para agregar ceros a la izquierda si el valor es menor que 10
  private padZero(value: number, length: number = 2): string {
    return value.toString().padStart(length, '0');
  }
}
