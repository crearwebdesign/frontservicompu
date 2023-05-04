import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.models';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor( private http : HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  };

    get headers(){
      return {
        headers : {
          'x-token': this.token
        }
      }
  };

  cargarHospitales(){
    const url = `${base_url}/hospitales`; //la busquedad en el backend
    return this.http.get(url, this.headers).
           pipe(
            map( (resp : {ok : boolean, hospitales : Hospital[]} ) =>  resp.hospitales)
           )

  };

  crearHospitales( nombre : string){
    const url = `${base_url}/hospitales`; //la busquedad en el backend
    return this.http.post(url,{nombre} ,this.headers);
  };

  actualizarHospitales( _id : string, nombre : string){
    const url = `${base_url}/hospitales/${_id}`; //la busquedad en el backend
    return this.http.put(url,{nombre} ,this.headers);
  };

  eliminarHospitales( _id : string){
    const url = `${base_url}/hospitales/${_id}`; //la busquedad en el backend
    return this.http.delete(url, this.headers);
  };

}
