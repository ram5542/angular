import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { AuthgService } from './auth.service';

@Injectable()
export class SecurityQuestionAuthGuardService implements CanActivateChild {

	constructor(private authgService: AuthgService, private router: Router){}

	canActivateChild(): boolean {

		if(!this.authgService.isToken()){
			this.router.navigateByUrl('/security-question');
			return false;
		}
		return true;
	}
}