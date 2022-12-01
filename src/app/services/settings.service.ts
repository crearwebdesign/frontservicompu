import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTheme = document.querySelector('#theme');

  constructor() {
      // estable el tema de colores al iniciar la aplicacion
      const url = localStorage.getItem('tema') || './assets/css/colors/default-dark.css'  ;
      this.linkTheme.setAttribute('href',url);
      // estas son instrucciones de vanilla javascript
   }

   changeTheme( tema : string){
    const url = `./assets/css/colors/${tema}.css`;
    this.linkTheme.setAttribute('href',url);
    localStorage.setItem('tema',url);
    this.checkCorrienteTema()
  }

  checkCorrienteTema(){
    const links =document.querySelectorAll('.selector'); // trae todos los elementos html que tenga la clase .selector
    links.forEach( elem => {
      elem.classList.remove('working'); // quita del elemento html la clase working (quitar el chulito)
      const btnTheme = elem.getAttribute('data-theme'); // obtengo que atributo tiene el elemto html
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;// construyo la url
      const currentThemeUrl = this.linkTheme.getAttribute('href'); // obtengo la url del tema actual

      if ( btnThemeUrl === currentThemeUrl ){
        elem.classList.add('working') // le añado la clase working al elemento html para que aparezca el chulito
      }

    })
  }

  // cuando se coloca checkCorrienteTema():void{} es que no va a devolver nada, igual da si se pone o no



}
