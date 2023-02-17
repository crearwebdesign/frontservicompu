import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';

import { Usuario } from '../models/usuario.model';


declare const google : any;
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario : Usuario;


  constructor(private http : HttpClient,
              private router : Router,
              private ngZone : NgZone) {
                this.googleInit()
               }


    get token(): string {
      return localStorage.getItem('token') || '';
    };

    get uid(): string{
      return this.usuario.uid || '';
    };

    get headers(){
        return {
          headers : {
            'x-token': this.token
          }
        }
    };


    googleInit(){

      return new Promise((resolve:any)  =>{
                    
      google.accounts.id.initialize({
               client_id: '662992478172-e08eqr50bvt5s10fkq9ga6krapsfm2j0.apps.googleusercontent.com',
               callback: (response:any) => this.handleCredentialResponse(response)
               });
               resolve();
                    
               })
                    
      };
            
      handleCredentialResponse( response : any){
                //console.log("Encoded JWT ID token: " + response.credential);
      this.loginGoogle(response.credential)
          .subscribe(resp => {
                      //console.log({login : resp})
                      this.ngZone.run(()=> {
                        this.router.navigateByUrl('/')
            
                      })
          })
      };            

  logout(){
    localStorage.removeItem('token');
    //this.router.navigateByUrl('/login')

    if (this.usuario.google){
       google.accounts.id.revoke(this.usuario.elEmail, ()=>{
           this.ngZone.run(() => {
           this.router.navigateByUrl('/login')})
        })
      }else{
        this.ngZone.run(() => {
          this.router.navigateByUrl('/login')})
      }


  };

  validarToken(): Observable<boolean>{
    
    return this.http.get(`${base_url}/login/renew`,{
      headers : {
        'x-token' : this.token
      }
    }).pipe(
      map(
        (resp : any )=>{
          const { email, google, nombre, role, img = '', uid } = resp.usuario;
          this.usuario = new Usuario(nombre, email, '', img, google, role, uid);
          localStorage.setItem('token',resp.token);
          return true
        }
      ),
      catchError( error => of(false))
    )
  };


  crearUsuario(formData : RegisterForm ){
    return this.http.post(`${base_url}/usuarios`,formData)
                    .pipe(
                      tap(
                        (resp : any) => {
                          localStorage.setItem('token',resp.token)
                        }
                      )
                    )
  };

  actualizarPerfil( data : {email:string, nombre:string, role : string} ){
    data = {
      ...data,
      role : this.usuario.role
    };
    return this.http.put(`${base_url}/usuarios/${this.uid}`,data,{
      headers : {
        'x-token' : this.token
      }
    })
  };

  loginUsuario(formData : LoginForm ){
    return this.http.post(`${base_url}/login`,formData)
                    .pipe(
                      tap(
                        (resp : any) => {
                          localStorage.setItem('token',resp.token)
                        }
                      )
                    )
  };

  loginGoogle(token : string ){
    return this.http.post(`${base_url}/login/google`,{token})
                    .pipe(
                      tap(
                        (resp : any) => {
                          //console.log(resp);
                          localStorage.setItem('token',resp.token)
                        }
                      )
                    )
  }

  cargarUsuarios(desde : number = 5){
    const url = `${base_url}/usuarios?desde=${desde}`; //la busquedad en el backend
    return this.http.get<CargarUsuario>(url, this.headers).
           pipe(
            map( resp => {
              const usuarios = resp.usuarios.map( 
                user => new Usuario( user.nombre, user.email, '', user.img, user.google,user.role,user.uid ))
              
              return {
                total : resp.total,
                usuarios
              }
            })
           )

  };

  eliminarUsuario( usuario : Usuario){
    const url = `${base_url}/usuarios/${usuario.uid}`; //la busquedad en el backend
    return this.http.delete(url, this.headers)
  }


}
