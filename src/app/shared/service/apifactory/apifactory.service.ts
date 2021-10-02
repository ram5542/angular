import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TokenService } from '../api/tokenservice.service';
import { ApiService } from '../api/apiservice.service';
import { TokenExpiryService } from '../api/tokenExpiry.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()

export class apiFactoryService{

public profileData:any;

constructor(private api: ApiService, private ts: TokenService, private tes: TokenExpiryService){}

getprofile(){
 	return this.api.get('/secure/me').map(response=>{if(response.status == 1){ return response.data[0]}}).catch((err: Response|any)=>{
 		return Observable.throw(err);
 	});
 }

 getSponsorDetails(){
 	return this.api.get('/secure/sponsordetails').map(response=>{if(response.status == 1){ return response.data[0]}}).catch((err: Response|any)=>{
 		return Observable.throw(err);
 	});
 }






}