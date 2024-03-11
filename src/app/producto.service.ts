import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from './producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private urlBase = "http://localhost:8081/inventario-app/productos"
  //private urlBase = "http://localhost:8081/api/transfer"

  private urlBase2 = "http://localhost:8080/api/transfer"

  constructor( private clienteHttp: HttpClient ) { }


  obtenerProductosLista(): Observable<Producto[]>{
  return this.clienteHttp.get<Producto[]>(this.urlBase);
  }

  //se recibe un objeto de tipo producto que el que se envia un la peticion de tipo post
  //regresa un objeto de tipo observable
  agregarProducto(producto: Producto): Observable<Object>{
    return this.clienteHttp.post(this.urlBase2, producto); //se envia producto
  }

  obtenerProductoPorId(id: number){
    return this.clienteHttp.get<Producto>(`${this.urlBase}/${id}`);
  }

 //se recibe el id de tipo producto
 //se recibe el objeto de tipo Producto donde trae lo valores del formulario
 //los cambios ya actualizados

 //el metodo regresa un tipo observable y regresa un objeto de tipo object
 //con put enviamos el id y la informacion que viene del formulario con nueva actualizacion
  editarProducto(id: number, producto: Producto): Observable<Object>{
    return this.clienteHttp.put(`${this.urlBase}/${id}`, producto);
  }

  eliminarProducto(id: number):Observable<Object>{
    return this.clienteHttp.delete(`${this.urlBase}/${id}`);
  }

}
