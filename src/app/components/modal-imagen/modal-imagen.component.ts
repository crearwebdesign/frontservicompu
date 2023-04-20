import { Component, OnInit } from '@angular/core';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  public imagenSubir : File;
  public imgTemp : any = null;

  constructor(public modalImagenService : ModalImagenService) {  }

  ngOnInit(): void {
  };

  cerrarModal(){
    this.imgTemp = null;
    this.modalImagenService.cerrarModal()
  };

  cambiarImagen(file : File){
    this.imagenSubir = file;
    
    if (!file){
      return this.imgTemp = null
    };

    const reader = new FileReader();
    reader.readAsDataURL( file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }

  };

}
