import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { AuthgService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivateChild {

constructor(private authgService: AuthgService, private router: Router) {}

canActivateChild(): boolean {

if (!this.authgService.isAuthenticate()) {
this.router.navigateByUrl('/login');
return false;
}
return true;
}
}
