import { Component, OnInit } from '@angular/core';
import { OurService, BreadCrumb, Rtf, Section } from '@common/model';
import { Util } from '@app/common/util';
import { ContentfulService } from '@app/service/contentful/contentful.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-our-service',
  templateUrl: './our-service.component.html',
  styleUrls: ['./our-service.component.css']
})
export class OurServiceComponent implements OnInit {

  public ourService = new OurService
  constructor(private contentfulService: ContentfulService,
    private util: Util,) { }

  ngOnInit(): void {
    this.ourService.breadCrumb = this.formBreadCrumb()
    this.contentfulService.getDataFromContententFul(this.util.SERVICE_CONTENT_TYPE).pipe(take(1))
      .subscribe(data => {
        let pageData = data['items'];
        let entryData
        let assetData

        if (data['includes'].Entry?.length > 0) {
          entryData = this.contentfulService.formatData(data['includes'].Entry)
        }

        if (data['includes'].Asset?.length > 0) {
          assetData = this.contentfulService.formatData(data['includes'].Asset)
        }

        this.ourService.rtf = this.fetchRtfDetails(pageData, entryData, assetData)
      });
  }

  fetchRtfDetails(rtfList, entryData, assetData) {
    let rtfDetails: Rtf[] = []
    let sectionArray: Section[]
    let rtf: Rtf
    let sectionObj: Section
    let details
    let sectionDetails

    rtfList.forEach(element => {
      rtf = new Rtf
      details = element.fields
      if (details) {
        rtf.title = details.title
        rtf.id = details.id
        sectionArray = []
        details.sections.forEach(section => {
          sectionObj = new Section
          sectionDetails = entryData[section.sys.id].fields
          sectionObj.title = sectionDetails.title
          sectionObj.description = sectionDetails.description
          sectionObj.media = this.contentfulService.fetchMediaDetails(sectionDetails.image.sys.id, entryData, assetData)
          sectionArray.push(sectionObj)
        });
        rtf.sections = sectionArray
        rtfDetails.push(rtf)
      }
    });
    return rtfDetails
  }

  formBreadCrumb() {
    let braedCrumbDetails = {}
    let list = []
    braedCrumbDetails['title'] = 'Our Services'
    list.push(new BreadCrumb(
      'Home',
      '/home'
    ))
    list.push(new BreadCrumb(
      'Services',
      'our-service'
    ))
    braedCrumbDetails['list'] = list
    return braedCrumbDetails
  }

}
