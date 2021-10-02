import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { TokenService } from '../shared/service/api/tokenservice.service';

@Component({
  selector: 'app-auth',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AuthComponent implements OnInit {

  constructor(private tokenService: TokenService, private router: Router)
  {}
  ngOnInit() {
    if(this.tokenService.getToken())
    {
      this.router.navigate(['/dashboard']);
    }
     } 
    
  }

