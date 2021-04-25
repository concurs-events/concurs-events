import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Util } from '@app/common/util';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  constructor(private util: Util,
    private http: HttpClient,) { }

  postUserData(body): Observable<any> {
    return this.http.post<any>(this.util.NETLIFY_CONTACT_FUNCTION, body);
  }

  sendEmail(body): Observable<any> {
    return this.http.post<any>(this.util.NETLIFY_EMAIL_FUNCTION, body);
  }
}
