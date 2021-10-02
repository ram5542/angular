import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { ApiService } from '../../shared/service/api/apiservice.service';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenExpiryService } from '../../shared/service/api/tokenExpiry.service';
import { ToastrManager } from 'ng6-toastr-notifications';
declare const $: any;
import { interval } from 'rxjs';
import { ClipboardService } from 'ngx-clipboard'
import { AmountPatternValidator } from '../../shared/all-pattern/amount-pattern-validator';
@Component({
  selector: 'app-add-fund-usdt',
  templateUrl: './add-fund.component.html',
  styleUrls: ['./add-fund.component.css']
})
export class AddFundUSDTComponent implements OnInit {
  public addfund: FormGroup;
  public addFundSecondForm: FormGroup;
  public submitted = false;
  private fundData: object;
  public walletbalance;
  public flag: boolean = false;
  public addfundamount;
  public invoiceno;
  public requestid;
  public createdate;
  public totalconfirmationsrequired;
  public confirmations;
  public bodydata: any = {};
  public firstSection: boolean = true;
  public secondSection: boolean = false;
  public thirdSection: boolean = false;
  public fiurthSection: boolean = false;
  public confirmationsFlag: boolean = false;
  public minutes: number;
  public seconds: number;
  public qr;
  public coinType;
  public coinaddress;
  public start = 0;
  public itemsTotal;
  public page: any;
  public data: any;
  public length: number = 50;
  public statusMessage;
  public statusMessageFlag: boolean = false;;
  public confirmationsFlagOne: boolean = false;
  public confirmationsFlagTwo: boolean = false;


  constructor(private router: Router,
    private toastr: ToastrManager,
    private _clipboardService: ClipboardService,
    private _api: ApiService,
    private _tokenExpService: TokenExpiryService,
    private formBuilder: FormBuilder) {
    this.page = 1;
  }
  ngOnInit() {
    this.fundData = {};
    this.addfund = this.formBuilder.group({
      amount: new FormControl('', [Validators.required, AmountPatternValidator(/^[0-9]*(\.[0-9]{0,8})?$/)]),
      // cointype: ['', Validators.required]
    });
    this.addFundSecondForm = this.formBuilder.group({
      transno: ['', Validators.required],
    });
    var walletType = {
      wtype: 5
    }
    this._api.post('/secure/getwalletbalance', walletType).subscribe(data => {
      if (data.data['balance'] == 0) {
        this.walletbalance = '0';
      } else {
        this.walletbalance = data.data['balance'];
      }
    }, err => {
      // this.tokenExpService.isTokenValid();
    })
  }
  get f() { return this.addfund.controls; }
  get ft() { return this.addFundSecondForm.controls; }

  public onAddFund() {
    this.submitted = true;
    let addfundValue = this.addfund.value;
    this.coinType = this.addfund.value.cointype;
    if (this.addfund.invalid) {
      return;
    } else {
      this.fundData = {
        "amount": addfundValue.amount,
        "coinname": 'usdt'
      }

      if (addfundValue.amount >= 10) {
        $('#loader').show();
        this._api.post('/secure/addfund', this.fundData).subscribe(data => {
          if (data.status == 1 || data.status == 'success') {
            $('#loader').hide();
            this.firstSection = false;
            this.secondSection = true;
            this.thirdSection = false;
            this.fiurthSection = false;
            // this.qr = data.qr;
            // this.addfundamount = addfundValue.amount;
            this.invoiceno = data.data.invoiceno;
            console.log(data)
            this.requestid = data.data.requestid;
            this.coinaddress = data.data.coinaddress;
            // this.coinname = data.coinname;
            this.timerCounter();
            const source = interval(30000);
            // const subscribe = source.subscribe(val => this.timerApi('nosubmitdata'));

          } else {
            $('#loader').hide();
            this.firstSection = true;
            this.secondSection = false;
            this.thirdSection = false;
            this.fiurthSection = false;
            this.toastr.warningToastr(data.data);
          }
        }, error => {
          //this._tokenExpService.isTokenValid();
        });
      } else {
        this.toastr.warningToastr('Enter Minimum 10 Funjo');
      }
    }
  }
  updatetransactionnumber(trans){
    const transno = trans;
    const obj = {
      'transno' : trans,
      'invno': this.invoiceno
    }
    $('#loader').show();
    if(transno != ''){
      this._api.post('/secure/updatetransactionnumber', obj).subscribe(data => {
        if (data.status == 1) {
          $('#loader').hide();
          this.firstSection = true;
          this.secondSection = false;
          this.thirdSection = false;
          this.fiurthSection = false;
          // this.addfund.reset();
          this.router.navigateByUrl('/usdt-transactions');
          this.toastr.successToastr(data.data);
        } else {
          $('#loader').hide();
          this.firstSection = true;
          this.secondSection = false;
          this.thirdSection = false;
          this.fiurthSection = false;
          this.toastr.warningToastr(data.data);
        }
      }, error => {
        //this._tokenExpService.isTokenValid();
      });
    }else{
      this.toastr.warningToastr('please enter valid transno');
    }
       
  }

  public backFirst() {
    this.firstSection = true;
    this.secondSection = false;
    this.thirdSection = false;
  }


  public onBackSecond() {
    this.firstSection = true;
    this.secondSection = false;
    this.thirdSection = false;
    this.fiurthSection = false;
  }
  cancelPopup() {
    $('#addFundModal').modal('hide');
  }

  // Set Timer 10 Minuts
  public timerCounter() {
    this.minutes = 20;
    this.seconds = 0;
    $(".countdown").html(this.minutes + ":" + this.seconds);
    this.newstartTimer();
  }

  public newstartTimer() {
    if ((this.minutes) < 0) {
      this.firstSection = false;
      this.secondSection = false;
      this.thirdSection = false;
      this.fiurthSection = true;
    } else {
      $(".countdown").html(this.minutes + ":" + this.seconds);
      if (this.seconds == 0) {
        this.minutes--;
        if (this.minutes < 20) {
          this.minutes = 0 + this.minutes;
          this.seconds = 59;
        }
      }
      this.seconds--;
    }
    setTimeout(() => { this.newstartTimer(); }, 1000);
  }

  public checkSecond(sec) {
    if (sec < 10 && sec >= 0) {
      sec = "0" + sec;
    } // add zero in front of numbers < 10
    if (sec < 0) { sec = "59" }
    return sec;
  }

  copied(e, type) {
    if (type === 'L') {
      this.toastr.successToastr('BTC Value Copied!', 'Success!');
    }
    if (type === 'R') {
      this.toastr.successToastr('BTC Address Copied!', 'Success!');
    }
  }

}
