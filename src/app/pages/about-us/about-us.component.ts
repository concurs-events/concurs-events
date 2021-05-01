import { Component, OnInit } from '@angular/core';
import { Util } from '@app/common/util';
import { ContentfulService } from '@app/service/contentful/contentful.service';
import { AboutUs, BreadCrumb, Section, Testimonial } from '@common/model';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  public aboutDetails = new AboutUs

  constructor(private contentfulService: ContentfulService,
    private util: Util) { }

  ngOnInit(): void {
    this.aboutDetails.breadCrumb = this.formBreadCrumb()
    this.contentfulService.getDataFromContententFul(this.util.ABOUT_CONTENT_TYPE).pipe(take(1))
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

          if ('aboutDesc' in pageFields) {
            let aboutArray: Section[] = []
            let sectionObj: Section
            pageFields.aboutDesc.forEach(element => {
              element = entryData[element.sys.id]?.fields
              sectionObj = new Section
              sectionObj.title = element.title
              sectionObj.description = documentToHtmlString(element.desc)
              aboutArray.push(sectionObj)
            });
            this.aboutDetails.about = aboutArray
          }

          if ('testimonial' in pageFields) {
            let testimonialList: Testimonial[] = []
            let testimonialObj: Testimonial
            pageFields.testimonial.forEach(element => {
              element = entryData[element.sys.id]?.fields
              testimonialObj = new Testimonial
              testimonialObj.name = element.name
              testimonialObj.designation = element.designation
              testimonialObj.message = element.message
              testimonialObj.media = this.contentfulService.fetchMediaDetails(element.image.sys.id, entryData, assetData)
              testimonialList.push(testimonialObj)
            });
            this.aboutDetails.testimonailList = testimonialList
          }
        }
      });
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
