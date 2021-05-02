import { Component, OnInit } from '@angular/core';
import { Util } from '@app/common/util';
import { ContentfulService } from '@app/service/contentful/contentful.service';
import { take } from '../../../../node_modules/rxjs/operators';
import { HomeDetails, Herobanner, Rtf, Section, TwoCol, Timeline } from '@common/model'
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DatePipe],
})
export class HomeComponent implements OnInit {

  public homeDetails: HomeDetails = new HomeDetails;
  public showNewsLetter = false;
  constructor(private contentfulService: ContentfulService,
    private util: Util,
    private datePipe: DatePipe,) { }

  ngOnInit(): void {
    this.contentfulService.getDataFromContententFul(this.util.HOME_CONTENT_TYPE).pipe(take(1))
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
            this.homeDetails.heroBanner = this.fetchHeroBanner(pageFields.heroBanner.sys.id, entryData, assetData)
          }
          if ('rtf' in pageFields) {
            this.homeDetails.rtf = this.fetchRtfDetails(pageFields.rtf, entryData, assetData)
          }
          if ('pastEvents' in pageFields) {
            this.homeDetails.pastEvents = this.fetchPastEvents(pageFields.pastEvents.sys.id, entryData, 'lt', '4')
          }
          if ('upcomingEvents' in pageFields) {
            this.homeDetails.events = this.fetchPastEvents(pageFields.upcomingEvents.sys.id, entryData, 'gt', '3')
          }
          if ('gallery' in pageFields) {
            this.homeDetails.gallery = this.fetchGallery(pageFields.gallery.sys.id, entryData, assetData)
          }
        }
        this.showNewsLetter = true
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

  fetchRtfDetails(rtfList, entryData, assetData) {
    let rtfDetails: Rtf[] = []
    let sectionArray: Section[]
    let rtf: Rtf
    let sectionObj: Section
    let details
    let sectionDetails

    rtfList.forEach(element => {
      rtf = new Rtf
      details = entryData[element.sys.id]?.fields
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

  fetchPastEvents(id, entryData, type, limit?) {
    let pastEvents: TwoCol = new TwoCol
    let curObj = entryData[id]?.fields
    pastEvents.title = curObj.tilte
    pastEvents.id = curObj.id
    pastEvents.shortDescription = curObj.shortDesc
    pastEvents.itemsList = this.contentfulService.getEventsList(type, limit)
    return pastEvents
  }

  fetchGallery(id, entryData, assetData) {
    let galleryObj: TwoCol = new TwoCol
    let curObj = entryData[id].fields
    let mediaList = []
    if (curObj) {
      galleryObj.title = curObj.tilte
      galleryObj.id = curObj.id
      galleryObj.shortDescription = curObj.shortDesc
      curObj.lists?.forEach(element => {
        mediaList.push(this.contentfulService.fetchMediaDetails(element.sys.id, entryData, assetData))
      });
      galleryObj.itemsList = mediaList
    }
    return galleryObj
  }

}
