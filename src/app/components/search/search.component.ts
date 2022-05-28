import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LibrosService } from 'src/app/services/libros.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  arraylibros: any = [];
  sku: string | undefined;


  loading: boolean | undefined;

  constructor( private http: HttpClient,
               private libros: LibrosService,
               private activatedRoute: ActivatedRoute,
               private router: Router) {


   }

   ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.sku = params.sku;
    });
    this.libros.getLibros().subscribe((response:any) => {
      this.arraylibros = response.data;
    })

    const temp = this.arraylibros.filter((d: any) => {
      return d.sku.toLowerCase().indexOf(this.sku) !== -1 || ! this.sku;
    });
    console.log(this.arraylibros);
    this.arraylibros = temp;
  }

  updateFilter(sku:any) {
    const val = sku;
    console.log(this.arraylibros);

  }


}
