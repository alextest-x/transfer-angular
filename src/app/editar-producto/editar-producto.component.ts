import { Component } from '@angular/core';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',

})
export class EditarProductoComponent {

  producto: Producto= new Producto();
  id:number;

  //ActivatedRoute recibe el parametro del id de la url
  constructor( private productoServicio: ProductoService,
               private ruta: ActivatedRoute,
               private enrutador: Router ){}

 //metodo que se manda a llamar despues del constructor

 ngOnInit(){
  //obtiene el valor del id de la ruta del componente
  //snapshot accede a los parametros de id de la base de datos
  this.id= this.ruta.snapshot.params['id'];
  this.productoServicio.obtenerProductoPorId(this.id).subscribe(

    //nos subcribimos a la repuesta enviamos al id y si hay respuesta se asigna a la
    //variable de producto y sino al error

    {
      // regresamos el objeto que estamos solicitando o un error
      // los datos que se reciben el objeto de tipo producto
      // (datos) asigna a la variable this.producto donde ya tiene la informacion del backend
      next: (datos) => this.producto = datos
      ,
      error: (errores:any) => console.log(errores)

    }
  );
 }

  onSubmit(){
  this.guardarProducto();
  }


  guardarProducto(){
    this.productoServicio.editarProducto(this.id, this.producto).subscribe(
      {
        next: (datos) => this.irProductoLista(),
        error: (errores) => console.log(errores)
      }
    );
  }

  irProductoLista(){
this.enrutador.navigate(['/productos']);
  }

}
