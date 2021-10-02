import { Component, OnInit} from '@angular/core';
import { ApiService } from '../../../shared/service/api/apiservice.service';
import { TokenService } from '../../../shared/service/api/tokenservice.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenExpiryService } from '../../../shared/service/api/tokenExpiry.service';
import swal from 'sweetalert2';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CommonApiFunctionService } from '../../../shared/service/commonapifunctions.service';
declare const $: any;

@Component({
  selector: 'withdraw',
  styleUrls: ['./withdraw.component.css'],
  templateUrl: './withdraw.component.html'
})
export class WithdrawComponent implements OnInit {
  public wallet: any = {};
  public bodydata: any = {};
  public referralType;
  public records;
  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private router: Router,
    private tokenService: TokenService,
    private tokenExpService: TokenExpiryService,
    public toastr: ToastrManager,
    private _commonapi: CommonApiFunctionService,
  ) { }

  ngOnInit() {
    var walletType = {
      wtype: 1
    }

    this.api.post('/secure/getwalletbalance', walletType).subscribe(data => {
      if (data.data.balance >= 0) {
        this.wallet = data.data;
      } else {
        this.wallet = 0;
      }
    }, err => {
      // this.tokenExpService.isTokenValid();
    })

    this.bodydata['start'] = 0;
    this.loadData(this.bodydata['start']);
  }

  getWithdrawl(amount) {
    var addfundamount = amount.value;
    var addfundamountregx = /^[1-9][0-9]{0,2}(?:,?[0-9]{3}){0,3}(?:\.[0-9]{1,2})?$/;
    if ((amount.value != '')) {
      if (!addfundamountregx.test(addfundamount)) {
        swal({
          type: 'error',
          text: "Only Numbers are allowed",
          timer: 2000,
          buttonsStyling: false,
          showConfirmButton: false
        })
      } else if (this.wallet['balance'] < addfundamount) {
        swal({
          type: 'error',
          text: "Insufficient balance",
          timer: 2000,
          buttonsStyling: false,
          showConfirmButton: false
        })
      } else {
        this.wallet['amount'] = amount.value;
        //  this.wallet['scode']  = pass.value;
        var obj = {
          amount: this.wallet['amount'],
          toid: 0,
          wtype: 1
        }
        $('#loading-wrapper').show();
        this.api.post('/secure/withdrawal', obj).subscribe(data => {
          if ((data.status === 1) || (data.status === 'success')) {
            $('#loading-wrapper').hide();
            swal({
              type: 'success',
              text: data.data
            }).then(response => {
              //  this.router.navigateByUrl('/main-wallet-transactions');
              this.records = '';
              this.bodydata['start'] = 0;
              this.loadData(this.bodydata['start']);
            });
          } else {
            $('#loading-wrapper').hide();
            swal({
              type: 'error',
              text: data.message,
              timer: 2000,
              buttonsStyling: false,
              showConfirmButton: false
            });
          }
        }, err => {
          // this.tokenExpService.isTokenValid();
        });
      }
    } else {
      swal({
        type: 'error',
        text: "Field Can't be Empty",
        timer: 2000,
        buttonsStyling: false,
        showConfirmButton: false
      })
    }
  }

  public loadData(start) {
    this.bodydata['start'] = start;
    this.bodydata['wtype'] = 1;
    this._commonapi.getTableDataPost('/secure/withdrawalstatus', this.bodydata).subscribe(data => {
      this.referralType = "Withdrawal List";
      this.records = data;
    }, err => {
      // this.tokenExpService.isTokenValid();
    })

  }
  public onPageChange(event) {
    this.records = '';
    this.bodydata['start'] = (event * 50) - 50;
    this.loadData(this.bodydata['start']);
  }
}
