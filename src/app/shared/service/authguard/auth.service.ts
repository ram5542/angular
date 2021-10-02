// import { Injectable } from '@angular/core';
// import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import { TokenService } from '../api/tokenservice.service';
// import { ApiService } from '../api/apiservice.service';

// @Injectable()
// export class AuthgService{


// constructor(
// private tokenService: TokenService,
// private api: ApiService
// ) {}

// public isAuthenticate(): boolean{

// return (!!this.tokenService.getToken() && !!this.tokenService.getSign());

// }
// }
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TokenService } from '../api/tokenservice.service';
import { ApiService } from '../api/apiservice.service';

@Injectable()
export class AuthgService{

	constructor(
		private tokenService: TokenService,
		private api: ApiService
	){}

	public isAuthenticate(): boolean{

		return (!!this.tokenService.getToken() && !!this.tokenService.getSign());
	}
	public isToken(): boolean{
		return (!!this.tokenService.getToken());
	}
}
