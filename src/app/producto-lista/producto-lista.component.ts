import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-producto-lista',
  templateUrl: './producto-lista.component.html'

})
export class ProductoListaComponent {

  productos: Producto[];

  //se conecta a la capa de servicio de angular
  //llamar el metodo de obtenerProductoslista
  constructor( private ProductoService: ProductoService,
               private enrutador: Router){}

  ngOnInit(){
    //cargamos productos
    this.obtenerProductos();
  }



  private obtenerProductos(){
    //consumir los datos del observable (subcribirnos) patron de diseño observable
    //al llamar el metodo obtenerProductosLista() regresa aun objeto de tipo observable
    //entonces hay que subcribirse
    this.ProductoService.obtenerProductosLista().subscribe(
      (datos => {
        //recibe un arreglo de tipo producto
        this.productos= datos;
      })

    );
  }

  editarProducto(id: number){
    this.enrutador.navigate(['editar-producto', id]);
  }


  //nos subcribimos porque estamos recibiendo un bjeto de tipo observable
  //recibimos la informacion del observable (datos) y mandamos a llamar el metodo obtenerProductos
  eliminarProducto(id:number){
    this.ProductoService.eliminarProducto(id).subscribe(
      {
        next:(datos) => this.obtenerProductos(),
        error: (errores)=> console.log(errores)
      }
    );
  }
}
