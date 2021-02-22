import { Component, OnInit } from '@angular/core';
import { BreadCrumb, EventsListing, Timeline, TwoCol } from '@common/model';
import { Util } from '@app/common/util';
import { ContentfulService } from '@app/service/contentful/contentful.service';
import { take } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-events-listing',
  templateUrl: './events-listing.component.html',
  styleUrls: ['./events-listing.component.css'],
  providers: [DatePipe],
})
export class EventsListingComponent implements OnInit {

  public eventListingDetails = new EventsListing
  constructor(private contentfulService: ContentfulService,
    private util: Util,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.eventListingDetails.breadCrumb = this.formBreadCrumb()
    this.contentfulService.getDataFromContententFul(this.util.EVENT_CONTENT_TYPE).pipe(take(1))
      .subscribe(data => {
        let pageData = data['items'];
        let pageFields
        let entryData

        if (pageData != null && pageData.length > 0) {
          pageFields = pageData[0].fields

          if (data['includes'].Entry?.length > 0) {
            entryData = this.contentfulService.formatData(data['includes'].Entry)
          }

          if ('pastEvents' in pageFields) {
            this.eventListingDetails.pastEvents = this.fetchPastEvents(pageFields.pastEvents.sys.id, entryData, 'lt')
          }
          if ('upcomingEvents' in pageFields) {
            this.eventListingDetails.events = this.fetchPastEvents(pageFields.upcomingEvents.sys.id, entryData, 'gt')
          }
        }
      });
  }

  formBreadCrumb() {
    let braedCrumbDetails = {}
    let list = []
    braedCrumbDetails['title'] = 'Our Events'
    list.push(new BreadCrumb(
      'Home',
      '/home'
    ))
    list.push(new BreadCrumb(
      'Events',
      'events'
    ))
    braedCrumbDetails['list'] = list
    return braedCrumbDetails
  }

  fetchPastEvents(id, entryData, type) {
    let pastEvents: TwoCol = new TwoCol
    let curObj = entryData[id]?.fields
    pastEvents.title = curObj.tilte
    pastEvents.id = curObj.id
    pastEvents.shortDescription = curObj.shortDesc
    pastEvents.itemsList = this.contentfulService.getEventsList(type)
    return pastEvents
  }

}
