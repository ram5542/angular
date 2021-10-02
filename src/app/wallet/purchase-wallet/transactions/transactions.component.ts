import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
declare const $: any;
import { CommonApiFunctionService } from '../../../shared/service/commonapifunctions.service';
import { ApiService } from '../../../shared/service/api/apiservice.service';
import { TokenExpiryService } from '../../../shared/service/api/tokenExpiry.service';

@Component({
  selector: 'transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
  
})
export class PurchaseWalletTransactionsComponent implements OnInit {
public bodydata:any = {};
public records;
public start;
public referralType;
	constructor(private api:ApiService,
              private _common: CommonApiFunctionService,
              private tokenExpService: TokenExpiryService){}
  ngOnInit() {
      this.bodydata['length'] = '50';
      this.bodydata['start'] = 0;
      this.bodydata['wtype'] = 2;
      this.loadData(this.bodydata);   
      $('#loading-wrapper').show();    
    }

    public loadData(bodydata){
      this._common.getTableDataPost('/secure/getwalletstatement/',this.bodydata).subscribe(data=>{
        $('#loading-wrapper').hide();
            this.records = data;
            this.referralType = "Transaction Details";
    },err=>{
          this.tokenExpService.isTokenValid();
    })
    }

    public onPageChange(event) {
      this.records = '';
      this.start = (event*50)-50;
      this.bodydata['start'] = this.start;
      this.loadData(this.bodydata);
    }
 }
