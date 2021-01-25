import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  @Input() rtfList
  public defaultImage = '/assets/img_px.gif';

  constructor() { }

  ngOnInit(): void {
  }

}
