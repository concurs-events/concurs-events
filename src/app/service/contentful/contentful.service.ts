import { Injectable } from '@angular/core';
import { Util } from '@app/common/util';
import { MediaDetails } from '@common/model';
import { Router } from '@angular/router';

import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContentfulService {

  constructor(private util: Util,
    private http: HttpClient,
    private router: Router) { }

  getDataFromContententFul(contentType, urlSlug?) {
    let accessKey = this.util.CF_DELIVERY_ACCESS_KEY
    let params = new HttpParams().set('content_type', contentType).set('access_token', accessKey).set('include', '4')
    if (this.util.notBlankOrEmpty(urlSlug)) {
      params.set('urlSlug', urlSlug)
    }
    let options = { params }
    return this.http.get(this.util.CF_DELIVERY_API, options);
  }

  /**
  * @see formatData Method that format the entry and Assets data [ access directly without loop ]
  * @version 1.0
  * @param data - includes with Entry and Assets Details
  * @return Array of object
  */
  formatData(data) {
    var fieldsDetails = {};
    data.map(function (details) {
      fieldsDetails[details.sys.id] = details;
    })
    return fieldsDetails;
  }

  fetchMediaDetails(id, entryData, assetData) {
    let mediaDetails = new MediaDetails
    let mediaComponent = entryData[id]?.fields
    let media
    if (mediaComponent) {
      mediaDetails.name = mediaComponent.name
      mediaDetails.title = mediaComponent.title
      mediaDetails.altText = mediaComponent.altText
      mediaDetails.width = mediaComponent.width
      mediaDetails.height = mediaComponent.height
      media = assetData[mediaComponent.media.sys.id].fields
      mediaDetails.url = media?.file?.url
    }
    return mediaDetails
  }

  /**
* @see getPageUrl method to generate the url slug
* @version 1.0
* @param removeQueryParam
* @return pageUrl
*/
  getPageUrl(removeQueryParam?: boolean) {
    let urlTree = this.router.parseUrl(this.router.url)
    urlTree.fragment = undefined
    if (removeQueryParam) {
      urlTree.queryParams = {}
    }
    return urlTree.toString()
  }
}
