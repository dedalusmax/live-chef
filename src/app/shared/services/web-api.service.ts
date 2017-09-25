import { Injectable } from '@angular/core';
import { Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class WebApiService extends Http {

  constructor(backend: XHRBackend, options: RequestOptions) {
    super(backend, options);
  }

  getList(apiPath: string) {
    return super.get(apiPath)
      .map((response: Response) => {
        return response.json();
      })
      .catch((error: any) => {
        return Observable.throw(error);
      });
  }

  getById(apiPath: string, id: number) {
    return super.get(apiPath + '/' + id)
      .map((response: Response) => {
        return response.json();
      })
      .catch((error: any) => {
        return Observable.throw(error);
      });
  }

  save<T>(apiPath: string, data: T) {
    return super.post(apiPath, data)
      .map((response: Response) => {
        return response.json();
      })
      .catch((error: any) => {
        return Observable.throw(error);
      });
  }
}
