import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
declare const $: any;
import { CommonApiFunctionService } from '../../shared/service/commonapifunctions.service';
import { ApiService } from '../../shared/service/api/apiservice.service';
import { TokenExpiryService } from '../../shared/service/api/tokenExpiry.service';

@Component({
  selector: 'usdt-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
  
})
export class USDTWalletTransactionsComponent implements OnInit {
  public bodydata: any = {};
  public tableview: any = {};
  public records;
  public start = 0;
  public referralType;
  constructor(private api: ApiService,
    private _common: CommonApiFunctionService,
    private tokenExpService: TokenExpiryService) { }
  ngOnInit() {
    this.bodydata['length'] = '50';
    this.bodydata['start'] = 0;
    this.bodydata['wtype'] = 1;
    this.bodydata['coinname'] = 'usdt';
    this.loadData();
    $('#loading-wrapper').show();
    
  }

  public loadData() {
    let obj ={
      'coinname':'usdt'
    }
    this.api.post('/secure/getaddfundhistory', obj).subscribe(data=>{
      this.bodydata['records'] = '';
      let rec = [];
      if ((data.status == 1) || (data.status == 'success')) {
        $('#loading-wrapper').hide();
        this.tableview['failmessage'] = '';
        this.bodydata['recordsTotal'] = data.recordsTotal;

        this.bodydata['headers'] = Object.keys(data.data[0]);
        for (let i = 0; i < data.data.length; i++) {
          rec.push(Object.values(data.data[i]));
        }
        this.bodydata['records'] = rec;
        this.tableview['success'] = this.bodydata;
        console.log(this.bodydata['records']);
      }
      else if ((data.status == 0) || (data.status == 'fail')) {
        $('#loading-wrapper').hide();
        this.bodydata['recordsTotal'] = 0;
        this.tableview['failmessage'] = 'No Records Found';
      }
    });
  }

  public onPageChange(event) {
    this.records = '';
    this.start = (event * 50) - 50;
    this.bodydata['start'] = this.start;
    this.loadData();
  }
}

