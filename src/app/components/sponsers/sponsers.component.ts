import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sponsers',
  templateUrl: './sponsers.component.html',
  styleUrls: ['./sponsers.component.css']
})
export class SponsersComponent implements OnInit {

  @Input() sponserDetails
  public defaultImage = '/assets/196x102.png';
  constructor() { }

  ngOnInit(): void {
  }

}
