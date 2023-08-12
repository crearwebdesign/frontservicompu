import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { Hospital } from '../models/hospital.models';
import { Medico } from '../models/medico.model';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(  private http : HttpClient) { }

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

private transformarUsuarios( resultados : any[]) : Usuario[] {
  return resultados.map(
    user => new Usuario( user.nombre, user.email, '', user.img, user.google,user.role,user.uid )
  )

};

private transformarHospitales( resultados : any[]) : Hospital[] {
  return resultados
};

private transformarMedicos( resultados : any[]) : Medico[] {
  return resultados
};

busquedaGlobal(termino : string){
  const url = `${base_url}/todo/${termino}`; //la busquedad en el backend
        return this.http.get(url, this.headers)
};

buscar (
        tipo : 'usuarios' | 'medicos' | 'hospitales',
        termino : string
       ){
        // endpoint
        const url = `${base_url}/todo/coleccion/${tipo}/${termino}`; //la busquedad en el backend
        return this.http.get<any[]>(url, this.headers)
                   .pipe(
                    map( (resp : any ) => {
                      switch (tipo) {
                        case 'usuarios':
                          return this.transformarUsuarios( resp.resultado )
                          break;
                        case 'hospitales':
                          return this.transformarHospitales( resp.resultado )
                          break;
                        case 'medicos':
                          return this.transformarMedicos( resp.resultado )
                          break;  
                        default:
                          return[];
                      }
                    })
                   )

}

}
