import { Component, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { AlumnosService, alumnoData } from './services/alumnos.service';
import { filter, map } from 'rxjs/operators';
import { ThisReceiver } from '@angular/compiler';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy {
  listaAlumnos: alumnoData[] = [];
  listarCursos!: Promise<any>;
  listaAlumnosAprobados: alumnoData[] = [];
  //
  subcriptionAprobados: Subscription = new Subscription();
  subcriptionAlumnos: Subscription = new Subscription();

  constructor(public service: AlumnosService) {}
  ngOnDestroy(): void {
    this.subcriptionAprobados.unsubscribe();
    this.subcriptionAlumnos.unsubscribe();
  }

  ngOnInit(): void {
    this.listarCursos = this.service.listarCursos();

    this.subcriptionAlumnos = this.service
      .listarAlumnos()
      .subscribe((result) => {
        this.listaAlumnos = result;
        console.log(this.listaAlumnos);
        console.log('sub', this.subcriptionAlumnos);
      });

    this.subcriptionAprobados = this.service
      .listarAlumnos()
      .pipe(map((ggg) => ggg.filter((item) => item.nota >= 6)))
      .subscribe((result) => {
        this.listaAlumnosAprobados = result;
      });
  }

  nuevoAlumnos() {
    this.service.alumnoCoderHouse.push({
      nombre: 'Nombre Test',
      apellido: 'Apellido Test',
      curso: 'Curso Test',
      nota: 7,
    });
  }
  cancelarSuscripcionAprobados() {
    this.subcriptionAprobados.unsubscribe();
    this.subcriptionAlumnos.unsubscribe();

    console.log(this.subcriptionAlumnos);
  }
}
