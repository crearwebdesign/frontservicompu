import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';

declare function customInitFunctions(); // esta funcion esta en /assets/js/custom.js

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})

export class PagesComponent implements OnInit {

  constructor( private settingsService : SettingsService,
               private sidebarService : SidebarService ) { }

  ngOnInit(): void {
  
    customInitFunctions(); // estan funcion esta de manera global en el assests/js/custom.js y
                           // sirve para inicializar todos los jquery (plugings) para que funcionen los decorativos de la 
                           // aplicacion: menus, rigtsidepbar, memus colapse etc

    this.sidebarService.cargarMenu();
  }
}
