import { Component, OnInit } from '@angular/core';

import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { ProductCategory } from '../product-categories/product-category';

import { Product } from './product';
import { ProductService } from './product.service';
import { ProductCategoryService } from '../product-categories/product-category.service';
import { map } from 'rxjs/internal/operators/map';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Product List';
  errorMessage = '';
  categories;

  products$ = this.productService.products$.pipe(
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  constructor(private productService: ProductService, private productCategoryService: ProductCategoryService) { }

  ngOnInit(): void {
    /*this.products$ = this.productService.getProducts().pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );*/
    this.getProductCategories();
  }

  onAdd(): void {
    console.log('Not yet implemented');
  }

  onSelected(categoryId: string): void {
    console.log('Not yet implemented', categoryId);
  }

  getProductCategories() {
    this.productCategoryService.getProductCategories().pipe(
      ).subscribe(productCategories => {
        this.categories = productCategories;
      });
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
