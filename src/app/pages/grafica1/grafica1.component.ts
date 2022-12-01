import { Component } from '@angular/core';







@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

public labels1 : string[] = [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];
public labels2 : string[] = [ 'Papel', 'Cartuchos', 'Mouse' ];
public labels4 : string[] = [ 'Sistemas', 'Serv.Fiscales', 'Mantto.Equipos' ];
public data1 = [  [ 350, 450, 100 ]]; 
public data2 = [  [ 50 , 25, 25 ]]; 
public data4 = [  [ 60 , 25, 15 ]]; 


  }


