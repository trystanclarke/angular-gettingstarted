import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'pm-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css'],
})
export class StarComponent {
  @Input()
  rating = 0;

  get cropWidth() {
    return (this.rating * 75) / 5;
  }

  @Output()
  ratingClicked: EventEmitter<string> = new EventEmitter<string>();

  onClick(evt: MouseEvent) {
    this.ratingClicked.emit(`The rating ${this.rating} was clicked`);
  }
}
