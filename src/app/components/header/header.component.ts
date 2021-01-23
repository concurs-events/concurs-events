import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, Input, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() headerDetail;

  constructor(@Inject(DOCUMENT) private document: Document, public router: Router, private elem: ElementRef,) {
    // router.events.subscribe(s => {
    //   if (s instanceof NavigationEnd) {
    //     const tree = router.parseUrl(router.url);
    //     if (tree.fragment) {
    //       const element = document.querySelector("#" + tree.fragment);
    //       if (element) { element.scrollIntoView(true); }
    //     }
    //   }
    // });
  }

  ngOnInit(): void {
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50) {
      this.document.getElementById('header').classList.add('fixed-menu');
    } else {
      this.document.getElementById('header').classList.remove('fixed-menu');
    }
  }

  navigate(event) {
    let obj = event.currentTarget
    this.elem.nativeElement.querySelector('.active')?.classList.remove('active')
    obj.classList.add('active')
  }
}
