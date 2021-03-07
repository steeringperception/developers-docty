import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient
  ) { }

  private fullUrl(url: string, queryParams: any = {}) {
    let query = [`?date=${Date.now()}`];
    for (let k in queryParams) {
      query.push(`${k}=${queryParams[k]}`)
    }
    if (url.includes("http")) {
      return url + query.join('&');
    } else {
      return environment.apiBaseUrl + url + query.join('&')
    }
  }

  private options(headers: any) {
    return {
      headers: headers,
      // observe: 'body' | 'events' | 'response',
      // params: HttpParams | { [param: string]: string | string[]
      reportProgress: true,
      // responseType: "json",
      // withCredentials: true,
    }
  }

  get(url: string, queryParams: any = {}, headers: any = {}) {
    url = this.fullUrl(url, queryParams);
    return this.http.get(url, this.options(headers))
  }
  post(url: string, data: any, headers: any = {}) {
    url = this.fullUrl(url);
    return this.http.post(url, data, this.options(headers))
  }
  put(url: string, data: any, headers: any = {}) {
    url = this.fullUrl(url);
    return this.http.put(url, data, this.options(headers))
  }
  patch(url: string, data: any, headers: any = {}) {
    url = this.fullUrl(url);
    return this.http.patch(url, data, this.options(headers))
  }
  delete(url: string, headers: any = {}) {
    url = this.fullUrl(url);
    return this.http.delete(url, this.options(headers))
  }
  jsonp(url: string) {
    url = this.fullUrl(url);
    this.http.jsonp(url, 'calback')
  }
}
