
import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import {animate, style, transition, trigger} from '@angular/animations';
declare const $: any;
import { CommonApiFunctionService } from '../../../shared/service/commonapifunctions.service';
import { ApiService } from '../../../shared/service/api/apiservice.service';
import { TokenExpiryService } from '../../../shared/service/api/tokenExpiry.service';


@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {
public bodydata:any = {};
public records:any ={};
public records1:any ={};
public start;
public referralType;
public referralType1;
	constructor(private api:ApiService,
              private _common: CommonApiFunctionService,
              private tokenExpService: TokenExpiryService){}
  ngOnInit() {
      this.bodydata['length'] = '50';
      this.bodydata['start'] = 0;
      // this.bodydata['wtype'] = 1;
      this.loadData();  
      this.loadData1(); 
      $('#loading-wrapper').show();  
      this.records= '';
    } 


    public loadData(){
      this.records= '';
      // this.api.get('/secure/getcurrentpayout/',this.bodydata).subscribe(data=>{
      this._common.getTableApiData('/secure/getcurrentpayout/').subscribe(data=>{
        $('#loading-wrapper').hide();
            this.records = data;
            this.referralType = "Current Payout Details";
    },err=>{
          // this.tokenExpService.isTokenValid();
    })
    }
    public loadData1(){
      this.records1= '';
      // this.api.get('/secure/getcurrentpayout/',this.bodydata).subscribe(data=>{
      this._common.getTableApiData('/secure/getpayoutdetails/').subscribe(data=>{
        $('#loading-wrapper').hide();
            this.records1 = data;
            this.referralType1 = "Payout Details";
    },err=>{
          // this.tokenExpService.isTokenValid();
    })
    }
    public onPageChange(event) {
      this.records = '';
      this.start = (event*50)-50;
      this.bodydata['start'] = this.start;
      this.loadData();
    }
    public onPageChange1(event) {
      this.records1 = '';
      this.start = (event*50)-50;
      this.bodydata['start'] = this.start;
      this.loadData1();
    }
 }
