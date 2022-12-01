import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-rightsidebar',
  templateUrl: './rightsidebar.component.html',
  styles: [
  ]
})
export class RightsidebarComponent implements OnInit {


  
  constructor( private settingsService:SettingsService ) { }

  ngOnInit(): void {
    this.settingsService.checkCorrienteTema();
  }
  changeTheme( tema : string){
    this.settingsService.changeTheme(tema)
  }
  

}
