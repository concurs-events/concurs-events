import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})
export class TestimonialComponent implements OnInit, AfterViewInit {

  @Input() testimonialList
  public defaultImage = '/assets/76x76.png';

  constructor() { }

  ngAfterViewInit(): void {
    let node = document.createElement('script');
    node.src = 'assets/js/main.js';
    node.type = 'text/javascript';
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  ngOnInit(): void {
  }

}
