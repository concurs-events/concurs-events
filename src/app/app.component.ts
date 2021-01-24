import { Component, OnInit } from '@angular/core';
import { HeaderDetails, Nav } from '@app/common/model';
import { Util } from '@app/common/util';
import { ContentfulService } from '@app/service/contentful/contentful.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public headerDetail: HeaderDetails

  constructor(private contentfulService: ContentfulService,
    private util: Util,) { }

  ngOnInit(): void {
    this.contentfulService.getDataFromContententFul(this.util.HEADER_CONTENT_TYPE).pipe(take(1))
      .subscribe(data => {
        let pageData = data['items'];
        let pageFields
        let entryData
        let assetData

        if (pageData != null && pageData.length > 0) {
          pageFields = pageData[0].fields

          if (data['includes'].Entry?.length > 0) {
            entryData = this.contentfulService.formatData(data['includes'].Entry)
          }

          if (data['includes'].Asset?.length > 0) {
            assetData = this.contentfulService.formatData(data['includes'].Asset)
          }

          let headerDetail = new HeaderDetails

          if ('logo' in pageFields) {
            headerDetail.logo = this.contentfulService.fetchMediaDetails(pageFields.logo.sys.id, entryData, assetData)
          }

          if ('nav' in pageFields) {
            let navList: Nav[] = []
            pageFields.nav.forEach(element => {
              element = entryData[element.sys.id].fields
              navList.push(new Nav(
                element.name,
                element.link,
                element.fragment
              ))
            });
            headerDetail.nav = navList
            this.headerDetail = headerDetail

          }

        }
      });
  }
}
