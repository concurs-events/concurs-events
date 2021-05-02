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
  public iframeStyle = ' style="width: 100%;position: absolute;top: 0;left: 0;bottom: 0;right: 0;width: 100%;height: 100%;border: 0;"'

  constructor(protected _sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    let iframe = this.contactDetails.loction
    iframe = iframe.substring(0, iframe.indexOf("src=")) + this.iframeStyle + iframe.substring(iframe.indexOf("src="))
    this.iframe = this._sanitizer.bypassSecurityTrustHtml(iframe)
  }

  getIframeUrl(location) {
    this.iframe = this._sanitizer.bypassSecurityTrustHtml(location)
  }

}
