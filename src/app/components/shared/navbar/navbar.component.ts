import { LibrosService } from './../../../services/libros.service';
import { Component, OnChanges, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnChanges {
  arrayCarrito = 0;
  constructor(private libro : LibrosService,
              private router: Router) { }

  ngOnInit() {
   this.arrayCarrito =  this.libro.getDatosLocalStorage().length;
    console.log(this.arrayCarrito);
  }
  ngOnChanges() {


  }
  irACarrito(){
    if(this.arrayCarrito ===  0){
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'No tiene libros en el carrito',
        showConfirmButton: false,
        timer: 1500
      })
    }else{
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })

      swalWithBootstrapButtons.fire({
        title: 'Desear ir al carrito de Compras?',
        icon: 'info',
        showCancelButton: false,
        confirmButtonText: 'Si',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {

          this.router.navigate(['/carrito']);
        }
      })
    }
  }
  // buscarLibro( sku: string) {

  //   this.router.navigate(['/libro', sku]);

  // }

}
