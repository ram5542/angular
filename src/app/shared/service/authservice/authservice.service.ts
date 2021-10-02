import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
// import { Observable } from 'rxjs/Rx';
import { Observable, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { ApiService } from '../api/apiservice.service';
import { TokenService } from '../api/tokenservice.service';



@Injectable()
export class AuthService{

	result: any;
	constructor( private apiService: ApiService,
				 private http: HttpClient,
				 private tokenService: TokenService,
				 private route: Router
				){}

onLogin(user) {
		return this.apiService.post('/auth/login', user);
	}

		onLogout() {
			this.tokenService.destroyToken();
			this.route.navigate(['/login']);
			// this.route.navigateByUrl('/login');

		}

}