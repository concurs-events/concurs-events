import { Component, OnInit } from '@angular/core';
import { Contact, EventDesc, EventDetails, Herobanner, TwoCol } from '@app/common/model';
import { Util } from '@app/common/util';
import { ContentfulService } from '@app/service/contentful/contentful.service';
import { take } from 'rxjs/operators';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
  providers: [DatePipe],
})
export class EventDetailsComponent implements OnInit {

  public eventsDetails: EventDetails
  public contactDetails

  constructor(private contentfulService: ContentfulService,
    private util: Util,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.eventsDetails = new EventDetails
    let urlSlug = this.contentfulService.getPageUrl(true)
    this.contentfulService.getDataFromContententFul(this.util.EVENT_DETAILS_CONTENT_TYPE, urlSlug).pipe(take(1))
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

          if ('heroBanner' in pageFields) {
            this.eventsDetails.heroBanner = this.fetchHeroBanner(pageFields.heroBanner.sys.id, entryData, assetData)
          }

          this.eventsDetails.startDate = pageFields.startDate
          console.log(pageFields)
          if ('eventDesc' in pageFields) {
            this.eventsDetails.eventDesc = this.fetchEventDesc(pageFields.eventDesc.sys.id, entryData, assetData)
          }

          if ('people' in pageFields) {
            this.eventsDetails.people = this.fetchPeople(pageFields.people.sys.id, entryData, assetData)
          }

          if ('sponsors' in pageFields) {
            this.eventsDetails.sponser = this.fetchPeople(pageFields.sponsors.sys.id, entryData, assetData)
          }

          if ('location' in pageFields) {
            this.fetchLocation(pageFields.location.sys.id, entryData)
          }
        }
      });
  }

  fetchHeroBanner(id, entryData, assetData) {
    let heroBanner = new Herobanner
    let entry = entryData[id]?.fields
    heroBanner.title = entry.title
    heroBanner.description = entry.description
    heroBanner.heroImage = this.contentfulService.fetchMediaDetails(entry.heroImage.sys.id, entryData, assetData)
    return heroBanner
  }

  fetchEventDesc(id, entryData, assetData) {
    let obj = entryData[id].fields
    let eventDescObj: EventDesc = new EventDesc
    if (obj) {
      eventDescObj.title = obj.title
      eventDescObj.description = documentToHtmlString(obj.description)
      eventDescObj.address = obj.address
      eventDescObj.date = this.datePipe.transform(
        obj.date,
        "dd MMM yyyy"
      );
      if ('image' in obj) {
        eventDescObj.media = this.contentfulService.fetchMediaDetails(obj.image.sys.id, entryData, assetData)
      }
    }
    return eventDescObj
  }

  fetchPeople(id, entryData, assetData) {
    let obj = entryData[id].fields
    let peopleObj: TwoCol = new TwoCol
    let mediaList = []
    if (obj) {
      peopleObj.title = obj.tilte
      peopleObj.shortDescription = obj.shortDesc
      obj.lists?.forEach(element => {
        mediaList.push(this.contentfulService.fetchMediaDetails(element.sys.id, entryData, assetData))
      });
      peopleObj.itemsList = mediaList
    }
    return peopleObj
  }

  fetchLocation(id, entryData) {
    let obj = entryData[id].fields
    let contact: Contact = new Contact
    contact.title = obj.title
    contact.shortDesc = obj.shortDesc
    contact.address = obj.address
    contact.email = obj.email
    contact.phone = obj.phone
    contact.website = obj.website
    contact.loction = obj.location
    this.contactDetails = contact
  }

}
