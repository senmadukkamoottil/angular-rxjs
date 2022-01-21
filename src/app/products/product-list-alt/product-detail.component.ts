import { Component } from '@angular/core';
import { combineLatest, EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent {
  pageTitle = 'Product Detail';
  errorMessage = '';
  constructor(private productService: ProductService) { }
  selectedCategory$ = this.productService.selectedCategoryAction$;

  product$ = combineLatest(([this.productService.products$, this.selectedCategory$])).pipe(
    map(([product, categoryId]) => {
      console.log(categoryId);
      return product.filter(product=> product.id === categoryId)
    })
  )



}
