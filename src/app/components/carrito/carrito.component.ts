import { Router } from '@angular/router';
import { LibrosService } from './../../services/libros.service';
import { Component, OnInit, OnChanges, SimpleChanges, DoCheck, AfterViewChecked } from '@angular/core';
import Swal from 'sweetalert2'
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit{
  arraylibros = [];
  public loginForm = this.fb.group({
    // frankserranobasilio@gmail.com
    nombre: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    celular: ['', Validators.required]
  });
  constructor(private libro:LibrosService,
              private router: Router,
              private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.arraylibros = this.libro.getDatosLocalStorage()
   this.validarCarrito();
  }

  eliminarLibro(libro:any){

    let datacarrito = localStorage.getItem("carrito") || '';
    let arrayCarritoActual = [];

            arrayCarritoActual = JSON.parse(datacarrito);

          for (var i = 0; i<arrayCarritoActual.length; i++){
            if(arrayCarritoActual[i].id == libro.id){
              // arrayCarritoActual.splice(i,1);
              this.arraylibros.splice(i,1)
              localStorage.setItem("carrito", JSON.stringify(this.arraylibros));
            }
          }
          window.location.reload();

          console.log(this.arraylibros);
  }
  validarCarrito(){
    if(this.arraylibros.length === 0){
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })

      swalWithBootstrapButtons.fire({
        title: 'No tiene libros en su  carrito de Compras?',
        icon: 'info',
        showCancelButton: false,
        confirmButtonText: 'Si',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {

          this.router.navigate(['/home']);
        }
      })
    }
    return true;
  }
  guardar(){
    if (this.loginForm.invalid){
      return;
    }

    let detail = []

    for(var i = 0; i< this.arraylibros.length; i++){


      let objeto =    {
            product_id : this.arraylibros[i]['id'],
            price : this.arraylibros[i]['price'],
            quantity: this.arraylibros[i]['cantidad']
          }
      detail.push(objeto)

    }
    let cuerpoEnvio = {
      client : this.loginForm.value.nombre,
      detail: detail
    }
    console.log(cuerpoEnvio);
    this.libro.enviarPedidoLibro(cuerpoEnvio).subscribe((response:any) => {
       console.log(response);
       if(response.ready){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Se realizo la compra exitosamente',
          showConfirmButton: false,
          timer: 1500
        })
        localStorage.removeItem('carrito');
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
       }
     })
  }

}
