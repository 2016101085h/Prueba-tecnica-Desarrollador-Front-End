import { LibrosService } from './../../services/libros.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  datos: any;
  loading: boolean;

  constructor( private http: HttpClient,
               private libros: LibrosService,
               private router: Router) {

    this.loading = true;


   }
   getLibros(){
    this.libros.getLibros().subscribe((data: any ) => {
      // console.log(data);
      this.datos = data.data;

      this.loading = false;
    });
   }

  ngOnInit() {
    this.getLibros();
  }
  buscarLibro(sku:any) {
    const val = sku.toLowerCase();
    const temp = this.datos.filter((d:any) => {
      return d.sku.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.datos = temp;
    if(sku == '' ){
      this.getLibros();
    }
  }


}
