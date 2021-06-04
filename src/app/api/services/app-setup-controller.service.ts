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
export class AppSetupControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation appSetupControllerGetKey
   */
  static readonly AppSetupControllerGetKeyPath = '/app-setup/{key}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getKey()` instead.
   *
   * This method doesn't expect any request body.
   */
  getKey$Response(params: {
    key: string;
  }): Observable<StrictHttpResponse<{ 'key'?: string, 'value'?: {  } }>> {

    const rb = new RequestBuilder(this.rootUrl, AppSetupControllerService.AppSetupControllerGetKeyPath, 'get');
    if (params) {
      rb.path('key', params.key, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ 'key'?: string, 'value'?: {  } }>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getKey$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getKey(params: {
    key: string;
  }): Observable<{ 'key'?: string, 'value'?: {  } }> {

    return this.getKey$Response(params).pipe(
      map((r: StrictHttpResponse<{ 'key'?: string, 'value'?: {  } }>) => r.body as { 'key'?: string, 'value'?: {  } })
    );
  }

  /**
   * Path part for operation appSetupControllerCreateKey
   */
  static readonly AppSetupControllerCreateKeyPath = '/app-setup/{key}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createKey()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createKey$Response(params: {
    key: string;

    /**
     * Valeur du paramètre
     */
    body?: {  }
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AppSetupControllerService.AppSetupControllerCreateKeyPath, 'post');
    if (params) {
      rb.path('key', params.key, {});
      rb.body(params.body, 'application/json');
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
   * To access the full response (for headers, for example), `createKey$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createKey(params: {
    key: string;

    /**
     * Valeur du paramètre
     */
    body?: {  }
  }): Observable<void> {

    return this.createKey$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation appSetupControllerDeleteKey
   */
  static readonly AppSetupControllerDeleteKeyPath = '/app-setup/{key}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteKey()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteKey$Response(params: {
    key: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AppSetupControllerService.AppSetupControllerDeleteKeyPath, 'delete');
    if (params) {
      rb.path('key', params.key, {});
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
   * To access the full response (for headers, for example), `deleteKey$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteKey(params: {
    key: string;
  }): Observable<void> {

    return this.deleteKey$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
