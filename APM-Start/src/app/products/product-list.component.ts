import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { IProduct } from './products';

@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  pageTitle: string = 'Product List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;

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
    this.products = this.productService.getProducts();
    this.filteredProducts = this.products;
    this.listFilter = '';
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
