import { Injectable } from '@angular/core';


@Injectable()
export class TokenService {

  getToken(): string {
    return window.sessionStorage['X-UserToken'];
  }
  
  getSign(): string {
    return  window.sessionStorage['X-UserTokenSign'];
  }

  saveToken(token: string, sign: string) {
    window.sessionStorage['X-UserToken'] = token;
    window.sessionStorage['X-UserTokenSign'] = sign;
  }

  destroyToken() {
    window.sessionStorage.removeItem('X-UserToken');
    window.sessionStorage.removeItem('X-UserTokenSign');
  }

  setOTP(token){
    window.sessionStorage['X-UserOTP'] = token;
  }

  getOTP(){
    return window.sessionStorage['X-UserOTP'];
  }

  destroyOTP(){
    window.sessionStorage.removeItem('X-UserOTP');
  }

}
