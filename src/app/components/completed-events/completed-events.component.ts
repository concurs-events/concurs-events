import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-completed-events',
  templateUrl: './completed-events.component.html',
  styleUrls: ['./completed-events.component.css']
})
export class CompletedEventsComponent implements OnInit {

  @Input() pastEvents

  constructor() { }

  ngOnInit(): void {
  }

}
