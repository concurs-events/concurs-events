import { DOCUMENT } from '@angular/common';
import { Component, Input, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { interval } from 'rxjs';


@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {

  @Input() startDate
  public counter
  public showCounter = false
  public days = 0
  public minutes = 0
  public hours = 0
  public seconds = 0

  constructor(@Inject(DOCUMENT) private document: Document,) { }

  ngOnInit(): void {
    let startDate = new Date(this.startDate);
    let currentDate = new Date()
    let days, hours, minutes, seconds;
    console.log(startDate)
    console.log(currentDate)
    console.log(startDate > currentDate)
    if (startDate > currentDate) {
      this.showCounter = true
      this.counter = interval(1000).subscribe(x => {
        let time = Math.floor((startDate.getTime() - new Date().getTime()) / 1000);
        days = Math.floor(time / 86400);
        time -= days * 86400;
        hours = Math.floor(time / 3600) % 24;
        time -= hours * 3600;
        minutes = Math.floor(time / 60) % 60;
        time -= minutes * 60;
        seconds = time % 60;
        this.days = days
        this.hours = hours
        this.minutes = minutes
        this.seconds = seconds
      });
    }
  }

}
