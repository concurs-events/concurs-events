import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-evt-desc',
  templateUrl: './evt-desc.component.html',
  styleUrls: ['./evt-desc.component.css']
})
export class EvtDescComponent implements OnInit {

  @Input() eventDesc
  public defaultImage = '/assets/470x629.png';

  constructor() { }

  ngOnInit(): void {
  }

}
