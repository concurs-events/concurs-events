import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() headerDetail;
  public isMobile
  public isTablet

  constructor(@Inject(DOCUMENT) private document: Document,
    public router: Router,
    private deviceService: DeviceDetectorService,
    private elem: ElementRef,) {
    this.isMobile = this.deviceService.isMobile();
    this.isTablet = this.deviceService.isTablet
  }

  ngOnInit(): void {
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50) {
      this.document.getElementById('header')?.classList.add('fixed-menu');
    } else {
      this.document.getElementById('header')?.classList.remove('fixed-menu');
    }
  }

  closeNav() {
    if (this.isMobile || this.isTablet) {
      let btn = this.elem.nativeElement.querySelector('#toggle')
      if (btn.getAttribute('aria-expanded')) {
        btn.setAttribute('aria-expanded', 'false')
        btn.classList.add('collapsed')
        this.elem.nativeElement.querySelector('#navbar-wd')?.classList.remove('show')
      }
    }
  }
}
