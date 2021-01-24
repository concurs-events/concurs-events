import { Component, OnInit } from '@angular/core';
import { AboutUs, BreadCrumb } from '@common/model';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  public aboutDetails = new AboutUs

  constructor() { }

  ngOnInit(): void {
    this.aboutDetails.breadCrumb = this.formBreadCrumb()
  }

  formBreadCrumb() {
    let braedCrumbDetails = {}
    let list = []
    braedCrumbDetails['title'] = 'About Us'
    list.push(new BreadCrumb(
      'Home',
      '/home'
    ))
    list.push(new BreadCrumb(
      'About',
      'about'
    ))
    braedCrumbDetails['list'] = list
    return braedCrumbDetails
  }

}
