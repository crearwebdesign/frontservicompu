import { Component,OnInit } from '@angular/core';
import { SettingsService } from './services/settings.service';

declare function customInitFunctions();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

//export class AppComponent {
//  title = 'SoftMillenium';
//}


export class AppComponent implements OnInit {

  title = 'SoftMillenium';
  

  constructor( private settingsService : SettingsService ) { }

  ngOnInit(): void {
  
    customInitFunctions(); // estan funcion esta de manera global en el assests/js/custom.js y
                           // sirve para inicializar todos los jquery (plugings) para que funcionen los decorativos de la 
                           // aplicacion: menus, rigtsidepbar, memus colapse etc

  }

}