import { Component, OnInit } from '@angular/core';
import { IProduct } from './products';

@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls:["./product-list.component.css"]
})
export class ProductListComponent implements OnInit {
  pageTitle: string = 'Product List';
  imageWidth = 50;
  imageMargin = 2;
  showImage=false;
  
  
  private _listFilter : string = "";
  public get listFilter() : string {
    return this._listFilter;
  }
  public set listFilter(v : string) {
    console.log(`listFilter ${v}`);
    this._listFilter  = v;
    this.filteredProducts = this.performFilter(v);
  }
  
  get imageToggleText():string {
    return this.showImage?"Hide image":"Show Image";
  }

  filteredProducts:IProduct[] = [];

  products: IProduct[] = [
    {
      productId: 1,
      productName: 'Leaf Rake',
      productCode: 'GDN-0011',
      releaseDate: 'March 19, 2021',
      description: 'Leaf rake with 48-inch wooden handle.',
      price: 19.95,
      starRating: 3.2,
      imageUrl: 'assets/images/leaf_rake.png',
    },
    {
      productId: 2,
      productName: 'Garden Cart',
      productCode: 'GDN-0023',
      releaseDate: 'March 18, 2021',
      description: '15 gallon capacity rolling garden cart',
      price: 32.99,
      starRating: 4.2,
      imageUrl: 'assets/images/garden_cart.png',
    },
    {
      productId: 5,
      productName: 'Hammer',
      productCode: 'TBX-0048',
      releaseDate: 'May 21, 2021',
      description: 'Curved claw steel hammer',
      price: 8.9,
      starRating: 4.8,
      imageUrl: 'assets/images/hammer.png',
    },
  ];

  ngOnInit(): void {
    console.log("ngOnInit");
    this.listFilter = "";
  }

  toggleImage(ev:MouseEvent):void{
      console.log("toggleImage", ev.currentTarget);
      this.showImage = !this.showImage;
  }

  performFilter(filterVal:string):IProduct[]{
    filterVal = filterVal.toLocaleLowerCase();
    return this.products.filter( p=> p.productName.toLocaleLowerCase().includes(filterVal));
  }
}
