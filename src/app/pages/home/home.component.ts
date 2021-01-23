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
            this.homeDetails.pastEvents = this.fetchPastEvents(pageFields.pastEvents.sys.id, entryData)
          }
          if ('gallery' in pageFields) {
            this.homeDetails.gallery = this.fetchGallery(pageFields.gallery.sys.id, entryData, assetData)
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

  fetchPastEvents(id, entryData) {
    let pastEvents: TwoCol = new TwoCol
    let timelineList: Timeline[] = []
    let timelineObj: Timeline
    let curObj = entryData[id]?.fields
    if (curObj && curObj.lists && curObj.lists.length > 0) {
      pastEvents.title = curObj.tilte
      pastEvents.id = curObj.id
      pastEvents.shortDescription = curObj.shortDesc
      curObj.lists.forEach(element => {
        timelineObj = new Timeline
        element = entryData[element.sys.id].fields
        if (element) {
          timelineObj.date = this.datePipe.transform(
            element.date,
            "dd MMM yyyy"
          );
          timelineObj.title = element.title
          timelineObj.description = element.description
          timelineList.push(timelineObj)
        }
      });
      pastEvents.itemsList = timelineList
    }
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
