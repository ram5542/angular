import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';
import { ApiService } from '../../shared/service/api/apiservice.service';
import { TokenExpiryService } from '../../shared/service/api/tokenExpiry.service';
import { CommonService } from '../../shared/service/common/common.service';
declare const $: any;
import { TokenService } from '../../shared/service/api/tokenservice.service';
@Component({
  selector: 'app-topup-funjo',
  templateUrl: './topup-funjo.component.html',
  styleUrls: ['./topup-funjo.component.css']
})
export class TopupFunjoComponent implements OnInit {
  public packageData: any;
  public packagedata: any = {};
  public userid: string;
  public scode: any;
  public username;
  public flag: boolean = false;
  public purchasebtnflag: boolean = false;
  public step1: boolean = true;
  public isClickOnce: boolean = false;
  public submitflag: boolean = false;
  public finalsubmitflag: boolean = false;
  public showname;
  public showflag;
  public data;
  public uservalue;
  public userflag;
  constructor(private api: ApiService,
    private tokenService: TokenService,
    private toastr: ToastrManager, public router: Router) { }

  ngOnInit() {
    this.usdtwalletbalances()
    this.cashwalletbalances();
    this.api.get('/secure/getallpackages').subscribe(data => {
      this.packageData = data;
      // [
      //   {'ItemName': data.data[0].ItemName, 'ItemId': data.data[0].ItemId, 'amount': data.data[0].amount, 'eligible': data.data[0].eligible, 'class':'pack-color1'},
      //   {'ItemName': data.data[1].ItemName, 'ItemId': data.data[1].ItemId, 'amount': data.data[1].amount, 'eligible': data.data[1].eligible, 'class':'pack-color1', 'rp':'20 RP'},
      //   {'ItemName': data.data[2].ItemName, 'ItemId': data.data[2].ItemId, 'amount': data.data[2].amount, 'eligible': data.data[2].eligible, 'class':'pack-color2', 'rp':'60 RP'},
      //   {'ItemName': data.data[3].ItemName, 'ItemId': data.data[3].ItemId, 'amount': data.data[3].amount, 'eligible': data.data[3].eligible, 'class':'pack-color3', 'rp':'100 RP'},
      //   {'ItemName': data.data[4].ItemName, 'ItemId': data.data[4].ItemId, 'amount': data.data[4].amount, 'eligible': data.data[4].eligible, 'class':'pack-color4', 'rp':'200 RP'},
      //   {'ItemName': data.data[5].ItemName, 'ItemId': data.data[5].ItemId, 'amount': data.data[5].amount, 'eligible': data.data[5].eligible, 'class':'pack-color5', 'rp':'400 RP'},
      //   {'ItemName': data.data[6].ItemName, 'ItemId': data.data[6].ItemId, 'amount': data.data[6].amount, 'eligible': data.data[6].eligible, 'class':'pack-color6', 'rp':'1000 RP'}
      // ]
    })
  }
  usdtwalletbalances(){
    var walletType = {
      wtype: 5
    }
    this.api.post('/secure/getwalletbalance', walletType).subscribe(data => {
      this.packagedata['usdtwalletbalances'] = data.data;
      this.packagedata['usdtwalletbalancestotal'] = data.data.balance;
      // this.packagedata['usdWalletBalancesFlag'] = true;
    }, error => {
      // this.packagedata['usdWalletBalancesFlag'] = false;
    });
  }
  public cashwalletbalances() {
    var walletType = {
      wtype: 2
    }
    this.api.post('/secure/getwalletbalance', walletType).subscribe(data => {
      this.packagedata['cashwalletbalances'] = data.data;
      this.packagedata['cashwalletbalancestotal'] = data.data.balance;
      // this.packagedata['usdWalletBalancesFlag'] = true;
    }, error => {
      // this.packagedata['usdWalletBalancesFlag'] = false;
    });
  }

  onUpgrade(amount, loginid) {
    this.isClickOnce = true;
    var addfundamount = amount;
    var addfundamountregx = /^[1-9][0-9]{0,2}(?:,?[0-9]{3}){0,3}(?:\.[0-9]{1,2})?$/;
    if ((amount == undefined || amount == null || amount == '') && loginid == '') {
      this.toastr.errorToastr('Fields Cannot be Empty', 'Error', { toastLife: 5000 });
    } else if (loginid == '') {
      this.toastr.errorToastr('Please Enter Transaction loginid', 'Error', { toastLife: 5000 });
    } else if (amount == undefined || amount == null || amount == '') {
      this.toastr.errorToastr('Please Enter Amount', 'Error', { toastLife: 5000 });
    } else if (!addfundamountregx.test(addfundamount)) {
      this.toastr.errorToastr('Only Numbers are allowed', 'Error', { toastLife: 5000 });
    } else if (this.packagedata['cashwalletbalancestotal'] < addfundamount) {
      this.toastr.errorToastr('Insufficient balance', 'Error', { toastLife: 5000 });
    } else {
      $('#loader').show();
      this.isClickOnce = true;
      var obj = {
        "amount": addfundamount,
        "toid": loginid,
        'wtype': '5',
        'type':'75% Funjo Wallet / 25% USDT Wallet'
      }
      this.api.post('/secure/upgrade', obj).subscribe(result => {
        if (result.status == 'success' || result.status == 1) {
          this.finalsubmitflag = false;
          $('#packageModal').modal('hide');
          this.cashwalletbalances();
          this.toastr.successToastr(result.data, 'Success');
          setTimeout(() => {
            this.router.navigate(['/package-summary']);
          }, 2000);
        } else {
          this.finalsubmitflag = false;
          $('#packageModal').modal('hide');
          this.toastr.warningToastr(result.data, 'Error');
        }

      }, error => {
        this.finalsubmitflag = false;
        this.toastr.warningToastr("Something went wrong. Please try again later", 'Error');
        // this.tokenExpService.isTokenValid();
      });
    }
  }
  setUserNameOnFocus(obj) {
    obj = '';
    this.showname = '';
    this.showflag = 0;
    this.getUserName(obj);
  }
  getUserName(obj) {
    this.api.get('/auth/getusername/' + obj).subscribe(result => {
      this.data = result;
      if ((this.data.status != 'fail') || (this.data.status == 'success')) {
        // this.userid = data;
        this.uservalue = this.data.data;
        this.userflag = 1;
      } else {
        // this.userid = obj;
        this.uservalue =  this.data.data;
        this.userflag = 0;
      }
    }, err => {
      // this.texpiry.isTokenValid();
    });

  }

}
