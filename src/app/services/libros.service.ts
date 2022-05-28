import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {
  arrayCarrito  = [];
  constructor(private http: HttpClient) { }
  getLibros(){
    const url = 'https://apis-prueba.pruebasgt.com/api/products';
    return this.http.get(url);
  }

  getDatosLocalStorage(){
    let datacarrito = localStorage.getItem("carrito") || '';
     if(datacarrito !== '' && datacarrito != null){
      this.arrayCarrito = JSON.parse(datacarrito);
     }
     return  this.arrayCarrito;
  }
  enviarPedidoLibro(cuerpoEnvio:any){
    const url = 'https://apis-prueba.pruebasgt.com/api/order';
    return this.http.post(url, cuerpoEnvio);
  }


}
