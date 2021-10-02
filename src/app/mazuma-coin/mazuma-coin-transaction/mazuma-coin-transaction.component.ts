
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
declare const $: any;
import { CommonApiFunctionService } from '../../shared/service/commonapifunctions.service';
import { ApiService } from '../../shared/service/api/apiservice.service';
import { TokenExpiryService } from '../../shared/service/api/tokenExpiry.service';

@Component({
  selector: 'app-mazuma-coin-transaction',
  templateUrl: './mazuma-coin-transaction.component.html',
  styleUrls: ['./mazuma-coin-transaction.component.css']
})
export class MazumaCoinTransactionComponent implements OnInit {
  public bodydata: any = {};
  public records;
  public start = 0;
  public referralType;
  constructor(private api: ApiService,
    private _common: CommonApiFunctionService,
    private tokenExpService: TokenExpiryService) { }
  ngOnInit() {
    this.bodydata['length'] = '50';
    this.bodydata['start'] = 0;
    this.bodydata['wtype'] = 4;
    this.loadData(this.bodydata['start']);
    $('#loading-wrapper').show();
  }

  public loadData(start) {
    this._common.getTableApiData('/secure/transaction/4?start='+start).subscribe(data=>{
      $('#loading-wrapper').hide();
      this.records = data;
      this.referralType = "Funjo Transaction";
    }, err => {
      // this.tokenExpService.isTokenValid();
    })
  }

  public onPageChange(event) {
    this.records = '';
    this.start = (event * 50) - 50;
    this.bodydata['start'] = this.start;
    this.loadData(this.bodydata);
  }
}

