import { Component, OnInit } from '@angular/core';
declare const $: any;
import { CommonApiFunctionService } from '../../shared/service/commonapifunctions.service';
import { ApiService } from '../../shared/service/api/apiservice.service';
import { TokenExpiryService } from '../../shared/service/api/tokenExpiry.service';

@Component({
  selector: 'app-token-bonus',
  templateUrl: './token-bonus.component.html',
  styleUrls: ['./token-bonus.component.css']
})
export class TokenBonusComponent implements OnInit {
  public bodydata: any = {};
  public tableview = {};
  public records;
  public start;
  public referralType;
  constructor(private api: ApiService,
    private _common: CommonApiFunctionService,
    private tokenExpService: TokenExpiryService) { }
  ngOnInit() {
    this.bodydata['length'] = '50';
    this.bodydata['start'] = 0;
    this.bodydata['wtype'] = 3;
    this.loadData(this.bodydata);
    $('#loading-wrapper').show();
  }

  public loadData(bodydata) {
    this.api.get('/secure/getgenerationincome?start=' + this.bodydata['start'] + '&length=' + this.bodydata['length']).subscribe(data => {
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
        console.log(this.bodydata['records'])
      }
      else if ((data.status == 0) || (data.status == 'fail')) {
        $('#loading-wrapper').hide();
        this.bodydata['recordsTotal'] = 0;
        this.tableview['failmessage'] = 'No Records Found';
      }
    });
  }

  // public onPageChange(event) {
  //   this.tabledata['start'] = (event * 10) - 10;
  //   this.loadData();
  // }

  public onPageChange(event) {
    this.records = '';
    this.start = (event * 50) - 50;
    this.bodydata['start'] = this.start;
    this.loadData(this.bodydata);
  }
}




