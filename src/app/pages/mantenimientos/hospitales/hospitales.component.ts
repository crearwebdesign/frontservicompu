import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

import { Hospital } from 'src/app/models/hospital.models';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales :  Hospital[] = [];
  public cargando : boolean = true;
  imgSubs : Subscription;

  constructor( private hospitalService : HospitalService,
               private modalImagenService : ModalImagenService) { }

  ngOnInit(): void {
    this.cargarHospitales();
    this.imgSubs = this.modalImagenService.nuevaImagen
                       .pipe(delay(1000))
                       .subscribe( img => this.cargarHospitales() )
  };

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  };
  
  cargarHospitales(){
    this.cargando = true;
    this.hospitalService.cargarHospitales()
        .subscribe( hospitales => {
          this.cargando = false;
          this.hospitales = hospitales
        })
    
  };

  guardarCambios(hospital : Hospital){
    this.hospitalService.actualizarHospitales(hospital._id,hospital.nombre)
        . subscribe( resp => {
          Swal.fire('Actualizado',hospital.nombre,'success')
        })
  };

  eliminarHospital(hospital : Hospital){
    this.hospitalService.eliminarHospitales(hospital._id)
        . subscribe( resp => {
          this.cargarHospitales();
          Swal.fire('Borrado',hospital.nombre,'success')
        })
  };

  async abrirSweetAlert(){
    const {value} = await Swal.fire<string>({
      title : 'Crear Hospital',
      text : 'Ingrese el nombre del nuevo Hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del Hospital',
      showCancelButton : true,
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write something!'
        }else{
          if (value.trim().length > 0){
            this.hospitalService.crearHospitales(value)
                .subscribe(  (resp : any) => {
                  this.hospitales.push( resp.hospital)
                })
          }
        }
      }
    });
    
  };

  abrirModal(hospital : Hospital){
    this.modalImagenService.abrirModal('hospitales',hospital._id,hospital.img)
  }

}
