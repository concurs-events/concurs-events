import { AfterContentInit, AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  @Input() contactDetails
  public iframe

  constructor(protected _sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    console.log('details', this.contactDetails)
    this.iframe = this._sanitizer.bypassSecurityTrustHtml(this.contactDetails.loction)
  }

  getIframeUrl(location) {
    this.iframe = this._sanitizer.bypassSecurityTrustHtml(location)
  }

}
