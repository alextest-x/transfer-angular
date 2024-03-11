import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html'

})
export class AgregarProductoComponent {

   producto: Producto = new Producto();


   //enrutador dirige la respuesta al listado de producto ya que haya obtenido la respuesta del backend
   constructor( private productoServicio: ProductoService,
                private enrutador: Router){}

    onSubmit(){
     this.guardarProducto();
    }

    guardarProducto(){
      this.productoServicio.agregarProducto(this.producto).subscribe(
        {   //datos es el objeto que se mando a imprimir a la base de datos se cargan los datos
            //y despues que recibimos la respuesta indica que ya se proceso la repuesta
            //entonces redirigir l respuesta a a irLista

          next: (datos) => {
            this.irListarProducto();

         },

          error: (error: any) => {
            console.log(error);

          }
        }
      )
    }


    //usamos el enrutador para redirigir la respuesta y se cargen los productos de nuevo

    irListarProducto(){
      this.enrutador.navigate(['/productos'])

    }



}
