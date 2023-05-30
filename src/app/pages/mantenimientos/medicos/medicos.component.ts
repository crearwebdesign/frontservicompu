import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Medico } from 'src/app/models/medico.model';

import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  public medicos : Medico[] = [];
  public cargando : boolean = true;
  private imgSubs : Subscription;

  constructor( private medicoService : MedicoService,
               private modalImagenService : ModalImagenService,
               private busquedasService : BusquedasService) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe()
  };

  ngOnInit(): void {
    this.cargarMedicos();
    this.imgSubs = this.modalImagenService.nuevaImagen
                       .pipe(delay(1000))
                       .subscribe( img => this.cargarMedicos() )
  };

  cargarMedicos(){
    this.medicoService.cargarMedicos()
        .subscribe( medicos => {
          this.cargando = false;
          this.medicos = medicos;
          console.log(medicos)
        })

  };

  abrirModal(medico : Medico){
    this.modalImagenService.abrirModal('medicos',medico._id,medico.img)
  };

  buscar( termino : string){
    if ( termino.length === 0 ){
      return this.cargarMedicos();
    };

      this.busquedasService.buscar('medicos',termino)
          .subscribe( resultado => {
              this.medicos = resultado
          })
  };

}
