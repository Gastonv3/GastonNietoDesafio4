import { Injectable } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

export interface alumnoData {
  nombre: string;
  apellido: string;
  curso: string;
  nota: number;
}

export interface cursoData {
  nombre: string;
}

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {
  public alumnoCoderHouse: alumnoData[] = [
    { nombre: 'Gaston', apellido: 'Nieto', curso: 'Cocina', nota: 9 },
    { nombre: 'Pedro', apellido: 'Diaz', curso: 'Angular', nota: 2 },
    { nombre: 'Juan', apellido: 'Quintero', curso: 'Java', nota: 1 },
    { nombre: 'Bruno', apellido: 'Rojas', curso: 'Kotline', nota: 9 },
  ];

  public cursosCoderHouse: cursoData[] = [
    { nombre: 'Cocina' },
    { nombre: 'Angular' },
    { nombre: 'Java' },
    { nombre: 'Kotline' },
  ];
  constructor() {}

  public listarCursos() {
    return new Promise((resolve, reject) => {
      return resolve(this.cursosCoderHouse);
    });
  }

  public listarAlumnos(): Observable<alumnoData[]> {
    return new Observable((observer) => {
      setInterval(() => observer.next(this.alumnoCoderHouse), 1000);
    });
  }
}
