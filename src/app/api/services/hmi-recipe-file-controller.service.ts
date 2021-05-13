/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class HmiRecipeFileControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation hmiRecipeFileControllerCreateCsvFile
   */
  static readonly HmiRecipeFileControllerCreateCsvFilePath = '/hmi-recipe-file/create-csv-file';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createCsvFile()` instead.
   *
   * This method doesn't expect any request body.
   */
  createCsvFile$Response(params?: {
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, HmiRecipeFileControllerService.HmiRecipeFileControllerCreateCsvFilePath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createCsvFile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  createCsvFile(params?: {
  }): Observable<void> {

    return this.createCsvFile$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation hmiRecipeFileControllerGetFile
   */
  static readonly HmiRecipeFileControllerGetFilePath = '/hmi-recipe-file/{filename}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getFile()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFile$Response(params: {
    filename: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, HmiRecipeFileControllerService.HmiRecipeFileControllerGetFilePath, 'get');
    if (params) {
      rb.path('filename', params.filename, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getFile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFile(params: {
    filename: string;
  }): Observable<void> {

    return this.getFile$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation hmiRecipeFileControllerGetFileList
   */
  static readonly HmiRecipeFileControllerGetFileListPath = '/hmi-recipe-file';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getFileList()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFileList$Response(params?: {
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, HmiRecipeFileControllerService.HmiRecipeFileControllerGetFileListPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getFileList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFileList(params?: {
  }): Observable<void> {

    return this.getFileList$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
