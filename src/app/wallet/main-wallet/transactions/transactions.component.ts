import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import {animate, style, transition, trigger} from '@angular/animations';
declare const $: any;
import { CommonApiFunctionService } from '../../../shared/service/commonapifunctions.service';
import { ApiService } from '../../../shared/service/api/apiservice.service';
import { TokenExpiryService } from '../../../shared/service/api/tokenExpiry.service';



@Component({
  selector: 'transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],

})
export class MainWalletTransactionsComponent implements OnInit {
public bodydata:any = {};
public records:any ={};
public start;
public referralType;
	constructor(private api:ApiService,
              private _common: CommonApiFunctionService,
              private tokenExpService: TokenExpiryService){}
  ngOnInit() {
      this.bodydata['length'] = '50';
      this.bodydata['start'] = 0;
      this.bodydata['wtype'] = 1;
          this.loadData(this.bodydata['start']);
      $('#loading-wrapper').show();

    }


    public loadData(start){
      this.records= '';

      this._common.getTableApiData('/secure/transaction/1?start='+start).subscribe(data=>{
        $('#loading-wrapper').hide();
            this.records = data;
            this.referralType = "Main Wallet Statement";
    },err=>{
          // this.tokenExpService.isTokenValid();
    })
    }
    public onPageChange(event) {
      this.records = '';
      this.bodydata['start'] = (event*50)-50;
      this.loadData(this.bodydata['start']);
    }
 }
