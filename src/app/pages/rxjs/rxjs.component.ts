import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import {retry, take, map, filter} from 'rxjs/operators'

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  intervalo : Subscription;

  ngOnDestroy(): void {
    this.intervalo.unsubscribe();
  }

  constructor() { 


    // this.retornaObservable().pipe(retry(2))
    // .subscribe(
    //   valor => console.log('num',valor),
    //   error => console.log('error en',error),
    //   () => console.info('Fin del Observable')
    // )

    // el pipe(retry(2)) reintenta el Observable 2 veces, si no se pone nada lo hace infinitamente

    this.intervalo = this.retornaIntervalo().subscribe(console.log)

  }


  retornaIntervalo(): Observable<number> {

    return interval(100).pipe(
      //take(10),
      map(valor => valor + 1),
      filter( valor => (valor % 2 === 0 )?true:false)
    )

  }



  retornaObservable(): Observable<number>{
    let i = -1;

    return new Observable<number>( observer =>{

      const intervalo = setInterval( ()=>{
          i++;
          observer.next(i);
          if (i===4){
            clearInterval(intervalo);
            observer.complete()
          }
          if (i===2){
            console.log('Error va en 2');
            observer.error(i)
          }
      },1000)

    });
  }

  
  }


