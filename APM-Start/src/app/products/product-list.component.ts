import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from './product.service';
import { IProduct } from './products';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle: string = 'Product List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  errorMessage: string = '';
  sub!: Subscription;

  private _listFilter: string = '';
  public get listFilter(): string {
    return this._listFilter;
  }
  public set listFilter(v: string) {
    console.log(`listFilter ${v}`);
    this._listFilter = v;
    this.filteredProducts = this.performFilter(v);
  }

  get imageToggleText(): string {
    return this.showImage ? 'Hide image' : 'Show Image';
  }

  filteredProducts: IProduct[] = [];

  products: IProduct[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    console.log('ngOnInit');
    this.sub = this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  toggleImage(ev: MouseEvent): void {
    console.log('toggleImage', ev.currentTarget);
    this.showImage = !this.showImage;
  }

  performFilter(filterVal: string): IProduct[] {
    filterVal = filterVal.toLocaleLowerCase();
    return this.products.filter((p) =>
      p.productName.toLocaleLowerCase().includes(filterVal)
    );
  }

  onRatingClicked(message: string) {
    this.pageTitle = 'Product List ' + message;
  }
}
