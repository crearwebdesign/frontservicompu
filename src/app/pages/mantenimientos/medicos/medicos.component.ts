import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit {

  public medicos : Medico[] = [];
  public cargando : boolean = true;

  constructor( private medicoService : MedicoService,
               private modalImagenService : ModalImagenService) { }

  ngOnInit(): void {
    this.cargarMedicos();
  }

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
  }

}
