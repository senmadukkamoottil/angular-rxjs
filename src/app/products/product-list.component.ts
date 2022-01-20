import { Component, OnInit } from '@angular/core';

import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';

import { Product } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Product List';
  errorMessage = '';
  categories;

  products$: Observable<Product[]>;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.products$ = this.productService.getProducts().pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );;
  }

  onAdd(): void {
    console.log('Not yet implemented');
  }

  onSelected(categoryId: string): void {
    console.log('Not yet implemented');
  }

/*
  Combine latest code with out async pipe - normal observable
  getCombinedData() {
    const product$ = this.http.get<Product[]>(this.productsUrl)
    const productCategories$ = this.http.get<ProductCategory[]>('api/productCategories');
    return combineLatest([product$, productCategories$]).pipe(
      map( ([products, categories]) => 
        products.map(product => ({
          ...product,
          category: categories.find( c => c.id === product.categoryId).name
        })))
    );
  }*/
}
