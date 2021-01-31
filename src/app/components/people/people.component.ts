import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  @Input() peopleDetails
  public defaultImage = '/assets/263x303.png';
  constructor() { }

  ngOnInit(): void {
  }

}
