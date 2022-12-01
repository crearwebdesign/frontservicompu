import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { RightsidebarComponent } from './rightsidebar/rightsidebar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumsComponent } from './breadcrums/breadcrums.component';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [
    HeaderComponent,
    BreadcrumsComponent,
    SidebarComponent,
    RightsidebarComponent
  ],
  exports: [
    HeaderComponent,
    BreadcrumsComponent,
    SidebarComponent,
    RightsidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
