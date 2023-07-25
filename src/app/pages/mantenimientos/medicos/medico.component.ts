import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Hospital } from 'src/app/models/hospital.models';
import { Medico } from 'src/app/models/medico.model';

import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoForm : FormGroup;
  public hospitales : Hospital[] = [];
  public hospitalSeleccionado : Hospital;
  public medicoSeleccionado : Medico;

  constructor( private fb : FormBuilder,
               private hospitalService : HospitalService,
               private medicoService : MedicoService,
               private router : Router,
               private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {

    //this.activatedRoute.params.subscribe( params => {
    this.activatedRoute.params.subscribe( ({id}) => {  
      this.cargarMedico(id)
      //console.log(id)
      // { path : 'medico/:id', component : MedicoComponent ,data: { titulo : 'Mantenimiento de Medico'} }
      // de aqui sale el id de pages.rounting.ts
    } );


    


    this.medicoForm = this.fb.group({
      nombre : ['',Validators.required],
      hospital : ['',Validators.required]
    });
    
    this.cargarHospitales();

    this.medicoForm.get('hospital').valueChanges
        .subscribe( hospitalId => {
          this.hospitalSeleccionado = this.hospitales.find( h => h._id === hospitalId);
        })

  };

  cargarMedico( id : string){
     this.medicoService.obtenerMedicoPorId(id)
         .subscribe( medico => {
           console.log(medico);
           this.medicoSeleccionado = medico
         })
  };

  cargarHospitales(){
    this.hospitalService.cargarHospitales()
        .subscribe( ( hospitales : Hospital[]) => {
          this.hospitales = hospitales
        } )
  };

  guardarMedico(){
    const {nombre} = this.medicoForm.value;
    this.medicoService.crearMedico(this.medicoForm.value)
        .subscribe( ( resp : any) => {
          console.log(resp);
          Swal.fire('Creado', `${nombre} creado correctamente`,'success');
          this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`)
        })
  }

}
