import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes  } from '@angular/router';

import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';


import { NopagefoundComponent } from './nopagefound/nopagefound.component';

const routes : Routes = [
  // path : '/dashboard' ; PagesRoutingModule
  // path : '/auth' ; AuthRountingModule
  // path : '/medicos' MedicosRounting
  // path : '/compras' ComprasRouting
  { path : '', redirectTo : '/dashboard', pathMatch : 'full' },
  { path : '**', component : NopagefoundComponent}
  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash : true }),
            PagesRoutingModule,
            AuthRoutingModule ],
  exports : [ RouterModule ]
})
export class AppRoutingModule { }
