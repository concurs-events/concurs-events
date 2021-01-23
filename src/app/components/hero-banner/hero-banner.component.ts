import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero-banner',
  templateUrl: './hero-banner.component.html',
  styleUrls: ['./hero-banner.component.css']
})
export class HeroBannerComponent implements OnInit {

  @Input() heroBanner

  constructor() { }

  ngOnInit(): void {
  }

}
