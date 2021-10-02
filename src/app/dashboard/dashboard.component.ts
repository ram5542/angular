import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { ApiService } from '../shared/service/api/apiservice.service';
import { CommonApiFunctionService } from '../shared/service/commonapifunctions.service';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { CacheService } from '../providers/cacheService.service';
// import { CardDetailComponent } from '../shared/dashboard/card-detail/card-detail.component';
import { TokenExpiryService } from '../shared/service/api/tokenExpiry.service';
import { CommonService } from '../shared/service/common/common.service';
import { ClipboardService } from 'ngx-clipboard'
import { ToastrManager } from 'ng6-toastr-notifications';
import Swal from 'sweetalert2';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { HttpClient } from '@angular/common/http';
// import * as $ from 'jquery';

declare const $: any;

export interface Options {
  heading?: string;
  removeFooter?: boolean;
  mapHeader?: boolean;
}

@Component({
  selector: 'dashboard',
  styleUrls: ['./dashboard.component.css'],
  templateUrl: './dashboard.component.html',
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  public data;
  public dashboarddata: any = {};
  public profileData;
  public profilePics: string[];
  public TOTALWORKINGINCOME;
  public newsandupdates; 
  public celebPics: string[];
  public chosen: boolean = false;
  public chosenpic: string;
  public chosenPrev: string;
  public medata;
  public getaddressofadmin;
  public reward;
  public tableview = {};
  public tabledata = {};
  constructor(private http: HttpClient,private api: ApiService, public common: CommonService, private tokenExpService: TokenExpiryService, private _commonapi: CommonApiFunctionService, private _cacheservice: CacheService, private chgDetectRef: ChangeDetectorRef,
    private _clipboardService: ClipboardService, private ng2ImgMax: Ng2ImgMaxService,
    private toastr: ToastrManager) {
  }
  ngOnInit() {
    // const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' };
    // const body = { TrackingNumber: '1Z98X1W70450616183' };
    // this.http.post<any>('https://www.ups.com/track/api/Track/GetStatus?loc=en_US', body, { headers }).subscribe(data => {
    //     this.postId = data.id;
    // });
    this.RewardStatusUser();
    $('#loading-wrapper').hide();
    $('#dashboardpopup').modal('show');
    var t = this;
    let i;
    t.profilePics = [];
    for(i = 1; i <= 8; i++) {
      t.profilePics.push('i' + i);
    }
    t.celebPics = [];
    for(i = 1; i <= 8; i++){
      t.celebPics.push(''+i);
    }
    // this.rewardData();
    this.me();
  }
public  copyToClipboard(copy){
  var $temp = $("<input>");
  $("body").append($temp);
  var dummy = $temp.val($(copy).val()).select();
  dummy.focus();
  document.execCommand("copy");
  $temp.remove();
  this.toastr.successToastr('Referals Link Copied!', 'Success!');
}
public abc(event){
  $(event).select();
  document.execCommand("copy");
}
// public crypto(event){
//   $(event).select();
//   document.execCommand("copy");
// }
// public  copyToClipboard1(copy){
//   var $temp = $("<input>");
//   $("body").append($temp);
//   var dummy = $temp.val($(copy).val()).select();
//   dummy.focus();
//   document.execCommand("copy");
//   $temp.remove();
//   this.toastr.successToastr('Address Copied!', 'Success!');
// }

// public closepopup(){
//    $('myModal_a').modal('hide');
// }

me(){
  this.api.get('/secure/getquickinfo').subscribe(data=>{
    // console.log(data);
    if(data.status == 1){
      this.medata = data.data[0];
      this.TOTALWORKINGINCOME= this.medata['totalreferralincome']+this.medata['totallevelincome'];
    }else{
      
    }
  },err=>{
    this.tokenExpService.isTokenValid();
    // console.log(err);
  })
}
RewardStatusUser(){
  this.api.get('/secure/RewardStatusUser').subscribe(data=>{
    // console.log(data);
    this.tabledata['records'] = '';
			let rec = [];
			if ((data.status == 1) || (data.status == 'success')) {
				this.reward = data;
				$('#loading-wrapper').hide();
				this.tableview['failmessage'] = '';
				this.tabledata['recordsTotal'] = data.recordsTotal;
				this.tabledata['headers'] = Object.keys(data.data[0]);
				for (let i = 0; i < data.data.length; i++) {
					rec.push(Object.values(data.data[i]));
				}
				this.tabledata['records'] = rec;
				this.tableview['success'] = this.tabledata;
				console.log(this.tabledata['records'])
			}
			else if ((data.status == 0) || (data.status == 'fail')) {
				$('#loading-wrapper').hide();
				this.tabledata['recordsTotal'] = 0;
				this.tableview['failmessage'] = 'No Records Found';
			}
    if(data.status == 1){
      this.reward = data.data;
    }else{
      
    }
  },err=>{
    this.tokenExpService.isTokenValid();
    // console.log(err);
  })
}
topupfunjo(amount){
    var addfundamount = amount;
    var addfundamountregx = /^[1-9][0-9]{0,2}(?:,?[0-9]{3}){0,3}(?:\.[0-9]{1,2})?$/;
    if ((amount == undefined || amount == null || amount == '')) {
      this.toastr.errorToastr('Fields Cannot be Empty', 'Error', { toastLife: 5000 });
    }  else if (amount == undefined || amount == null || amount == '') {
      this.toastr.errorToastr('Please Enter Amount', 'Error', { toastLife: 5000 });
    } else if (!addfundamountregx.test(addfundamount)) {
      this.toastr.errorToastr('Only Numbers are allowed', 'Error', { toastLife: 5000 });
    } else if(this.medata['WalletBalance'] != 0) {
      $('#loader').show();
      var obj = {
        "amount": addfundamount,
        "toid": this.medata['Memberid'],
        'wtype': '2',
      }
      this.api.post('/secure/upgrade', obj).subscribe(result => {
        if (result.status == 'success' || result.status == 1) {
          this.toastr.successToastr(result.data, 'Success');
          setTimeout(() => {
            // this.router.navigate(['/packages-report']);
          }, 2000);
        } else {
          this.toastr.warningToastr(result.data, 'Error');
        }

      }, error => {
        this.toastr.warningToastr("Something went wrong. Please try again later", 'Error');
        // this.tokenExpService.isTokenValid();
      });
    }else {
      this.toastr.warningToastr("Balance Not Available in FUND Wallet", 'Error');
    }
}
withdraw(amount){
  var addfundamount = amount;
  var addfundamountregx = /^[1-9][0-9]{0,2}(?:,?[0-9]{3}){0,3}(?:\.[0-9]{1,2})?$/;
  if ((amount == undefined || amount == null || amount == '')) {
    this.toastr.errorToastr('Fields Cannot be Empty', 'Error', { toastLife: 5000 });
  }  else if (amount == undefined || amount == null || amount == '') {
    this.toastr.errorToastr('Please Enter Amount', 'Error', { toastLife: 5000 });
  } else if (!addfundamountregx.test(addfundamount)) {
    this.toastr.errorToastr('Only Numbers are allowed', 'Error', { toastLife: 5000 });
  } else {
    $('#loader').show();
    var obj = {
      "amount": addfundamount
    }
    this.api.post('/secure/withdrawal', obj).subscribe(result => {
      if (result.status == 'success' || result.status == 1) {
        this.toastr.successToastr(result.data, 'Success');
        setTimeout(() => {
          // this.router.navigate(['/packages-report']);
        }, 2000);
      } else {
        this.toastr.warningToastr(result.message, 'Error');
      }

    }, error => {
      this.toastr.warningToastr("Something went wrong. Please try again later", 'Error');
      // this.tokenExpService.isTokenValid();
    });
  }
}
}
