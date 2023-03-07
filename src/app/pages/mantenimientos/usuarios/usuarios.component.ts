import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  public totalUsuarios : number = 0;
  public usuarios : Usuario[] = [];
  public usuariosTemp : Usuario[] = [];
  
  public desde : number = 0;
  public cargando: boolean = true;

  constructor(private usuarioService : UsuarioService,
              private busquedaService : BusquedasService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  };
  
  cargarUsuarios(){
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde)
        .subscribe( ({total,usuarios}) => {
          this.totalUsuarios = total;
          this.usuarios = usuarios;
          this.usuariosTemp = usuarios;
          this.cargando = false
        });
    
  };

  cambiarPagina( valor : number){
    this.desde += valor;

    if (this.desde < 0){
      this.desde = 0
    }else if( this.desde >= this.totalUsuarios ){
      this.desde -= valor
    };

    this.cargarUsuarios()

  };

  buscar( termino : string){
    if ( termino.length === 0 ){
      return this.usuarios = this.usuariosTemp
    };

      this.busquedaService.buscar('usuarios',termino)
          .subscribe( resultado => {
              this.usuarios = resultado
          })
  };

  eliminarUsuario( usuario : Usuario){
    Swal.fire({
      title: '¿ Borrar Uusario ?',
      text: `Esta a punto de borrar a ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(usuario)
        .subscribe( resp => {
                    this.cargarUsuarios();
                    Swal.fire(
                      'Usuario Borrado',
                      `${usuario.nombre} fue eliminado correctamente`,
                      'success'
                    )
                    }
                  )
      }
    })

  };

  cambiarRole( usuario : Usuario){
      this.usuarioService.guardarUsuario(usuario)
          .subscribe( resp => {
            console.log(resp)
          })
  }

}
