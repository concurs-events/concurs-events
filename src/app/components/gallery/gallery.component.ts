import { Component, Input, OnInit } from '@angular/core';
import { Lightbox, LightboxConfig } from 'ngx-lightbox';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  @Input() gallery
  private album = [];

  constructor(private _lightbox: Lightbox, private _lightboxConfig: LightboxConfig) {
    _lightboxConfig.disableScrolling = true;
    _lightboxConfig.wrapAround = true;
    _lightboxConfig.centerVertically = true;
  }

  ngOnInit(): void {
    if (this.gallery) {
      this.gallery.itemsList.forEach(element => {
        const album = {
          src: element.url
        };
        this.album.push(album);
      });
    }
  }

  open(index: number): void {
    // open lightbox
    this._lightbox.open(this.album, index);
  }

  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }

}
