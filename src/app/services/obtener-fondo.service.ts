import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ObtenerFondoService {

  constructor( private http : HttpClient) { }



  // public resultado = {
  //   "page": 1,
  //   "per_page": 1,
  //   "photos": [
  //     {
  //       "id": 2880507,
  //       "width": 4000,
  //       "height": 6000,
  //       "url": "https://www.pexels.com/photo/woman-in-white-long-sleeved-top-and-skirt-standing-on-field-2880507/",
  //       "photographer": "Deden Dicky Ramdhani",
  //       "photographer_url": "https://www.pexels.com/@drdeden88",
  //       "photographer_id": 1378810,
  //       "avg_color": "#7E7F7B",
  //       "src": {
  //         "original": "https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg",
  //         "large2x": "https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  //         "large": "https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  //         "medium": "https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg?auto=compress&cs=tinysrgb&h=350",
  //         "small": "https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg?auto=compress&cs=tinysrgb&h=130",
  //         "portrait": "https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  //         "landscape": "https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  //         "tiny": "https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280"
  //       },
  //       "liked": false,
  //       "alt": "Brown Rocks During Golden Hour"
  //     }
  //   ],
  //   "next_page": "https://api.pexels.com/v1/curated/?page=2&per_page=1"
  // };

  get headers(){
    return {
      headers : {
        'Authorization' : '7ixuB9D6d4RvOoYIZSG7VmNCUR7asiNr76oQqpZeT9ZoaFCzqjWYwVD7'
      }
    }
};

  traerImgFondo(){
    

    const url = `https://api.pexels.com/v1/curated?per_page=1`;
    
    
    return this.http.get(url,this.headers)
  }
  
  

  

}
