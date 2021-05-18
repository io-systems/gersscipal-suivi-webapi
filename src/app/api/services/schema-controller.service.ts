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
export class SchemaControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation schemaControllerGetSchema
   */
  static readonly SchemaControllerGetSchemaPath = '/schema/{schema}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSchema()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSchema$Response(params: {
    schema: string;
  }): Observable<StrictHttpResponse<Array<{  }>>> {

    const rb = new RequestBuilder(this.rootUrl, SchemaControllerService.SchemaControllerGetSchemaPath, 'get');
    if (params) {
      rb.path('schema', params.schema, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<{  }>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSchema$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSchema(params: {
    schema: string;
  }): Observable<Array<{  }>> {

    return this.getSchema$Response(params).pipe(
      map((r: StrictHttpResponse<Array<{  }>>) => r.body as Array<{  }>)
    );
  }

  /**
   * Path part for operation schemaControllerGetSchemas
   */
  static readonly SchemaControllerGetSchemasPath = '/schema';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSchemas()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSchemas$Response(params?: {
  }): Observable<StrictHttpResponse<Array<string>>> {

    const rb = new RequestBuilder(this.rootUrl, SchemaControllerService.SchemaControllerGetSchemasPath, 'get');
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
   * To access the full response (for headers, for example), `getSchemas$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSchemas(params?: {
  }): Observable<Array<string>> {

    return this.getSchemas$Response(params).pipe(
      map((r: StrictHttpResponse<Array<string>>) => r.body as Array<string>)
    );
  }

}
