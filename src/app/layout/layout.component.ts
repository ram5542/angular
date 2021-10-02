import { Component, OnInit, ViewChild, ViewEncapsulation, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../shared/service/authservice/authservice.service';
import { CommonService } from '../shared/service/common/common.service';
import { ApiService } from '../shared/service/api/apiservice.service';
import { TokenExpiryService } from '../shared/service/api/tokenExpiry.service';
import { TokenService } from '../shared/service/api/tokenservice.service';
import { CommonApiFunctionService } from '../shared/service/commonapifunctions.service';
import * as $ from 'jquery';
import PerfectScrollbar from 'perfect-scrollbar';
export interface Options {
  heading?: string;
  removeFooter?: boolean;
  mapHeader?: boolean;
}
//Metadata
export interface RouteInfo {
  path: string;
  title: string;
  type: string;
  icontype: string;
  collapse?: string;
  children?: ChildrenItems[];
}
export interface ChildrenItems {
  path: string;
  title: string;
  type?: string;
  href?: string;
}


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LayoutComponent implements OnInit {
  public menuItems: any[];
  user: string;
  pic: string;
  public profileData: any;
  public membername;
  public profilePics: string[];
  public celebPics: string[];
  public data;
  public dashboard = {};
  public url: any;
  location: Location;
  public _min: number = 0;
  public _sec: number = 0;
  public _btc: number;
  public _eth: number;
  public _Active: string;
  constructor(
    private authService: AuthService,
    private element: ElementRef,
    public common: CommonService,
    private api: ApiService,
    private tokenExpService: TokenExpiryService,
    private router: Router,
    public tokenService: TokenService,
    public _commonapi: CommonApiFunctionService,) { }

  ngOnInit() {
    $('.nav-link').click(function () {
      $('.collapse').removeClass('show');
      $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });
    $('.nav-item').click(function () {
      $('.g-sidenav-pinned').removeClass('g-sidenav-hide');
      // alert()
    });
    let isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
    $('body').removeClass('g-sidenav-hide');
    if (isMobile) {
      $('body').removeClass('g-sidenav-pinned');
      $('body').removeClass('g-sidenav-hidden');
      $('body').removeClass('g-sidenav-show');
      $('body').addClass('g-sidenav-hide');
      $('.sidenav-toggler.active').click(function () { 
        alert()       
        $('body').removeClass('g-sidenav-hidden');
      });
      
      $('.sidenav-toggler').click(function () { 
        if ($('body').hasClass('g-sidenav-hide')) {
          $('body').removeClass('g-sidenav-hide');
        } else {
          $('body').addClass('g-sidenav-hide');
        }
      });

      // $('#main-contant').click(function () {
      //   if ($('body').hasClass('g-sidenav-show')) {
      //     $('body').addClass('g-sidenav-hide');
      //     $('body').removeClass('g-sidenav-show');
      //     $('body').removeClass('g-sidenav-pinned ');
      //   } else {          
      //     $('body').addClass('g-sidenav-show');          
      //     $('body').addClass('g-sidenav-pinned ');
      //     $('body').removeClass('g-sidenav-hide');
      //   }
      // });

      $('.flex-column .nav-link').click(function(){
        $('backdrop').remove();
        $('body').removeClass('g-sidenav-pinned');
        $('body').removeClass('g-sidenav-hidden');
        $('body').removeClass('g-sidenav-show');
        $('body').addClass('g-sidenav-hide');
      })
      $('.dashboard').click(function(){
        $('backdrop').remove();
        $('body').removeClass('g-sidenav-pinned');
        $('body').removeClass('g-sidenav-hidden');
        $('body').removeClass('g-sidenav-show');
        $('body').addClass('g-sidenav-hide');
      })
      
    }
    
    this.api.get('/secure/me').subscribe(data => {
      this.dashboard['userdata'] = data.data[0];
      // console.log(this.dashboard['userdata'])
      this.common.allsecuremedata = this.dashboard['userdata'];
    }, err => {
      this.tokenExpService.isTokenValid();
    });
  }

  ngAfterViewInit() {
    this.runOnRouteChange();       
  }

  runOnRouteChange(): void {

    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      const elemSidebar = <HTMLElement>document.querySelector('.scrollbar-inner');
      const elemMainPanel = <HTMLElement>document.querySelector('.scrollbar-inner');
      let ps = new PerfectScrollbar(elemMainPanel);
      ps = new PerfectScrollbar(elemSidebar);
      ps.update();
    }
  }

  isMac(): boolean {
    let bool = false;
    if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
      bool = true;
    }
    return bool;
  }

  onLogout() {
    this.authService.onLogout();
  }

}
