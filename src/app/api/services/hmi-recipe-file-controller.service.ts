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
  }): Observable<StrictHttpResponse<{ 'filename'?: string }>> {

    const rb = new RequestBuilder(this.rootUrl, HmiRecipeFileControllerService.HmiRecipeFileControllerCreateCsvFilePath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ 'filename'?: string }>;
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
  }): Observable<{ 'filename'?: string }> {

    return this.createCsvFile$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'filename'?: string }>) => r.body as { 'filename'?: string })
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
  }): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, HmiRecipeFileControllerService.HmiRecipeFileControllerGetFilePath, 'get');
    if (params) {
      rb.path('filename', params.filename, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: 'application/csv'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Blob>;
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
  }): Observable<Blob> {

    return this.getFile$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

  /**
   * Path part for operation hmiRecipeFileControllerDeleteFile
   */
  static readonly HmiRecipeFileControllerDeleteFilePath = '/hmi-recipe-file/{filename}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteFile()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteFile$Response(params: {
    filename: string;
  }): Observable<StrictHttpResponse<Array<string>>> {

    const rb = new RequestBuilder(this.rootUrl, HmiRecipeFileControllerService.HmiRecipeFileControllerDeleteFilePath, 'delete');
    if (params) {
      rb.path('filename', params.filename, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<string>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteFile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteFile(params: {
    filename: string;
  }): Observable<Array<string>> {

    return this.deleteFile$Response(params).pipe(
      map((r: StrictHttpResponse<Array<string>>) => r.body as Array<string>)
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
  }): Observable<StrictHttpResponse<Array<string>>> {

    const rb = new RequestBuilder(this.rootUrl, HmiRecipeFileControllerService.HmiRecipeFileControllerGetFileListPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<string>>;
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
  }): Observable<Array<string>> {

    return this.getFileList$Response(params).pipe(
      map((r: StrictHttpResponse<Array<string>>) => r.body as Array<string>)
    );
  }

}
