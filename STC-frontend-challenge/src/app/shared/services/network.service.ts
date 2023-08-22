import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { HttpRequestModel, HttpResponseModel } from '../models/httpRequest.mode';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  constructor(private http: HttpClient) { }
  baseUrl = 'https://fakestoreapi.com/'
  getPaginated<T>(options: HttpRequestModel): Observable<HttpResponseModel<T>> {
    options.apiPath = this.transform(options.apiPath, options.urlParam);
    const params = this.prepareQuery(options.query);
    return this.http.get<HttpResponseModel<T>>(this.baseUrl + options.apiPath, {
      params,
      headers: options.headers,
    })
      .pipe(map(res => {
        return {
          count: (res as unknown as []).length,
          body: (res as unknown as []).slice(options.query ? options.query.offset : 0, options.query ? options.query.offset + options.query.itemsPerPage : 20)
        }
      }
      )
      )
  }


  get<T>(options: HttpRequestModel): Observable<T> {
    options.apiPath = this.transform(options.apiPath, options.urlParam);
    const params = this.prepareQuery(options.query);
    return this.http.get<T>(this.baseUrl + options.apiPath, {
      params,
      headers: options.headers,
    });
  }
  post(options: HttpRequestModel): Observable<any> {
    options.apiPath = this.transform(options.apiPath, options.urlParam);
    const params = this.prepareQuery(options.query);
    return this.http.post(
      this.baseUrl + options.apiPath,
      this.removeNullValues(options.body),
      {
        params,
        headers: options.headers,
      }
    );
  }

  put(options: HttpRequestModel): Observable<any> {
    options.apiPath = this.transform(options.apiPath, options.urlParam);
    const params = this.prepareQuery(options.query);
    return this.http.put(
      this.baseUrl + options.apiPath,
      this.removeNullValues(options.body),
      {
        params,
        headers: options.headers,
      }
    );
  }

  delete(options: HttpRequestModel): Observable<any> {
    options.apiPath = this.transform(options.apiPath, options.urlParam);
    return this.http.delete(
      this.baseUrl + options.apiPath,
      this.removeNullValues(options.body)
    );
  }
  prepareQuery(query: any) {
    let params = new HttpParams();
    for (let key in query) {
      if (query[key] !== undefined) params = params.set(key, query[key]);
    }
    return params;
  }

  transform(url: any, params: any) {
    return !!params
      ? Object.keys(params).reduce((acc, param) => {
        return acc.replace(`:${param}`, params[param]);
      }, url)
      : url;
  }
  removeNullValues(obj: any) {
    if (obj)
      if (Object.keys(obj).length) {
        Object.keys(obj)
          .filter((key) => obj[key] === null && obj[key] !== 0)
          .forEach((key) => {
            delete obj[key];
          });
      }
    return obj;
  }
}
