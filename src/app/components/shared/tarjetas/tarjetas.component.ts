import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.css']
})
export class TarjetasComponent implements OnInit {
  cantidad = 1;
  @Input() libro: any = {};
  @Input() index: number | undefined;

  constructor(
    private router: Router,
    private toastr: ToastrService
  ) {


  }

  ngOnInit() {
  }
  agregarAlCarrito(libro:any) {
    // console.log(this.index);
    this.router.navigate(['/heroe', this.index]);
    // this.heroeSeleccionado.emit(this.index);
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Esta seguro de agregar al carrito?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, agregalo!',
      cancelButtonText: 'No, cancela!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        let arrayCarrito = [];
        console.log(libro.id);
        if(this.validarLibro(libro.id)){
          this.toastr.warning('El producto ya fue agregado!');

        }else{

          let datacarrito = localStorage.getItem("carrito") || '';
          if(datacarrito !== '' && datacarrito != null){
            let arrayCarritoActual = JSON.parse(datacarrito);
            let libroactualizado = {...libro, cantidad: this.cantidad};
            arrayCarritoActual.push(libroactualizado);
            localStorage.setItem("carrito", JSON.stringify(arrayCarritoActual));
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Producto agregado',
              showConfirmButton: false,
              timer: 1500
            })
             setTimeout(() => {
                window.location.reload();
             }, 1000);


          }else{
            let libroactualizado = {...libro, cantidad: this.cantidad};
            arrayCarrito.push(libroactualizado);
            localStorage.setItem("carrito", JSON.stringify(arrayCarrito));


            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Producto agregado',
              showConfirmButton: false,
              timer: 1500
            })
             setTimeout(() => {
                window.location.reload();
             }, 1000);

          }

        }

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
        )
      }
    })

  }
  validarLibro(id:any){
    let valorCarrito = localStorage.getItem("carrito") || '';
    if(valorCarrito !== '' && valorCarrito != null){
      let arrayCarrito = JSON.parse(valorCarrito);
      let sw: any;
      if(arrayCarrito.length > 0){
        for(var i = 0; i< arrayCarrito.length; i++){
          if(arrayCarrito[i].id === id){
            sw =  true
          }
        }
        return sw;

      }

    }
  }



}
