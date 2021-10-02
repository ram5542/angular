import { Injectable } from '@angular/core';
//import { HttpHeaders, HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../../../../environments/environment';
//import { Router } from '@angular/router';
import { TokenService } from './tokenservice.service';

@Injectable()
export class ApiService{

  authCheck: any;

  constructor(private http: Http,
    private tokenService: TokenService){}

   private setHeaders(): Headers {
    const headersConfig = {
      'Content-Type': 'application/json'
    };

    if (this.tokenService.getToken() && this.tokenService.getSign()) {

    headersConfig['X-UserToken'] = `${this.tokenService.getToken()}`;
    headersConfig['X-UserTokenSign'] = `${this.tokenService.getSign()}`;
    }
    return new Headers(headersConfig);
  }

  private formatErrors(error: any) {
     // return Observable.throw(error.json());
     return Observable.throw(error);
  }

  // private authenticate(){
  //   this.http.get(`${environment.api_url}/user/me`, { headers: this.setHeaders(), search: params })
  //   .catch(this.formatErrors)
  //   .map((res: Response) => res.json()).subscribe(data=>{
  //     this.authCheck = data;
  //     if(data)
  //   })
  //   var t = this;
  //   return new Promise(function(resolve, reject){
  //     if(this.tokenService.getToken()){
  //       t.http.get(`${environment.api_url}/user/me`, {headers: this.setHeaders(), search: params})
  //       .catch(this.formatErrors)
  //       .map((res: Response) => res.json())
  //       .subscribe(data=>{
  //         t.authCheck = data;
  //         if(t.authCheck.httpStatusCode == 400){
  //           return reject();
  //         }else if(t.authCheck.status === 'success'){
  //           return resolve();
  //         }
  //       })
  //     }else{
  //       resolve()
  //     }
  //   });
  // }

  get(path: string, params: URLSearchParams = new URLSearchParams()): Observable<any> {
    return this.http.get(`${environment.api_url}${path}`, { headers: this.setHeaders(), search: params })
    .catch(this.formatErrors)
    .map((res: Response) => res.json());
    /*this.authenticate()
        .then(function(){
          return this.http.get(`${environment.api_url}${path}`, { headers: this.setHeaders(), search: params })
          .catch(this.formatErrors)
          .map((res: Response) => res.json());
        })
        .catch(function(){

        })*/
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.api_url}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() }
    )
    .catch(this.formatErrors)
    .map((res: Response) => res.json());
  }

  post(path: string, body: Object = {}): Observable<any> {

    return this.http.post(
      `${environment.api_url}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() }
    )
    .catch(this.formatErrors)
    .map((res: Response) => res.json());
  }

  delete(path: string): Observable<any> {
    return this.http.delete(
      `${environment.api_url}${path}`,
      { headers: this.setHeaders() }
    )
    .catch(this.formatErrors)
    .map((res: Response) => res.json());
  }
  
}
