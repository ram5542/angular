import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService,TokenService} from '../shared/service';

declare const $: any;

@Component({
    selector: 'app-adminlogin-cmp',
    template: `<div>
                <form name="form1" method="post" action="https://myfunjo.io/user/#/admin">
                    <input name="X-UserToken" type="hidden" value="{{usertoken}}" #username>
                    <input name="X-UserTokenSign" type="hidden" value="{{passwordtoken}}" #password>
                    <button type="hidden" (click)="adminUserLogin(username.value, password.value)">Login</button>
                </form>
            </div>`
})

export class AdminLoginComponent implements OnInit {
    public usertoken;
    public passwordtoken;
    constructor( private router: Router,
                 private activatedroute: ActivatedRoute,
                 private tokenService: TokenService,
                 private api: ApiService,
                 ) {}
    ngOnInit() {
        this.tokenService.saveToken(this.activatedroute.snapshot.queryParams['token'], this.activatedroute.snapshot.queryParams['sign']);
        if (this.tokenService.getToken() && this.tokenService.getSign()) 
        {
            
            this.api.get('/secure/me').subscribe(result => {
            if (result.status == 1){
                this.router.navigate(['/dashboard']);
                // sessionStorage.setItem('active_status', JSON.stringify(result.data[0].active));
                
                //    if(result.data[0].active == 1){
                 
                // }else{
                // // this.router.navigate(['/support/submit-query']);
                // }
          } 
        }, err => {
          //this.tokenExpService.isTokenValid();
        });


            // this.router.navigateByUrl('/dashboard');
        }
    }
    adminUserLogin(tokenn, sign) {
        const token = {};
        token['X-UserToken'] = tokenn;
        token['X-UserTokenSign'] = sign;
    }
}
