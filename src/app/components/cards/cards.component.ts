import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  @Input() cardDetails
  @Input() alignCenter = false
  @Input() showViewAll = false
  public defaultImage = '/assets/800x650.png';

  constructor() { }

  ngOnInit(): void {
  }

}
