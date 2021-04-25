import { Component, OnInit } from '@angular/core';
import { Contact, BreadCrumb } from '@common/model';
import { Util } from '@app/common/util';
import { ContentfulService } from '@app/service/contentful/contentful.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  public contactDetails: Contact = new Contact
  public showLocation = false

  constructor(private contentfulService: ContentfulService,
    private util: Util,) { }

  ngOnInit(): void {
    this.contactDetails.breadCrumb = this.formBreadCrumb()
    this.contentfulService.getDataFromContententFul(this.util.CONTACT_CONTENT_TYPE).pipe(take(1))
      .subscribe(data => {
        let pageData = data['items'];
        let pageFields

        if (pageData != null && pageData.length > 0) {
          pageFields = pageData[0].fields
          this.contactDetails.title = pageFields.title
          this.contactDetails.shortDesc = pageFields.shortDesc
          this.contactDetails.address = pageFields.address
          this.contactDetails.email = pageFields.email
          this.contactDetails.phone = pageFields.phone
          this.contactDetails.website = pageFields.website
          this.contactDetails.loction = pageFields.location
          this.showLocation = true
        }
      });
  }

  formBreadCrumb() {
    let braedCrumbDetails = {}
    let list = []
    braedCrumbDetails['title'] = 'Contact Us'
    list.push(new BreadCrumb(
      'Home',
      '/home'
    ))
    list.push(new BreadCrumb(
      'Contact',
      'contact'
    ))
    braedCrumbDetails['list'] = list
    return braedCrumbDetails
  }

}
