import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './product.service';
import { IProduct } from './products';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  get pageTitle() {
    return 'Product Detail: ' + this.product?.productName;
  }

  product: IProduct | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.productService.getProducts().subscribe({
      next: (products) => {
        const product = products.find((p) => p.productId === id);
        this.product = product;
      },
    });
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }
}
