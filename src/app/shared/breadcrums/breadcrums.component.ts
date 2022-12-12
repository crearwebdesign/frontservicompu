import { Component, OnDestroy } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-breadcrums',
  templateUrl: './breadcrums.component.html',
  styles: [
  ]
})
export class BreadcrumsComponent implements OnDestroy {

  tituloSub$ : Subscription;

  ngOnDestroy(): void {
    this.tituloSub$.unsubscribe();
  }

  public title : string;

  constructor(private router : Router) {
    this.tituloSub$ = this.getArgumnetosRutas().subscribe(
      ({titulo}) => {
        // este titulo viene de la variable data y cuando se pone entre llaves lo esta desaestructurando
        // lo esta sacando
        this.title = titulo;
        document.title = `Soft Millenium Facturación e Inventarios - ${ titulo }`
        // este es el titulo que pone en la pestaña del navegador
        }
    )
  }
  
  getArgumnetosRutas(){
    return this.router.events
    .pipe(
      filter(event => event instanceof ActivationEnd),
      filter( (event : ActivationEnd) => event.snapshot.firstChild === null),
      map((event : ActivationEnd) => event.snapshot.data )
    )
    
    
   }



  

}
