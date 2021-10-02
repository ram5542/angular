import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
// import { TableData} from '../../md/md-datatable/md-datatable.component';
import { ApiService } from '../../../shared/service/api/apiservice.service';
import { TokenService } from '../../../shared/service/api/tokenservice.service';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenExpiryService } from '../../../shared/service/api/tokenExpiry.service';
import swal from 'sweetalert2';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CommonApiFunctionService } from '../../../shared/service/commonapifunctions.service';
declare const $: any;
import { Observable } from 'rxjs';
import { interval } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { ClipboardService } from 'ngx-clipboard'
import { AmountPatternValidator } from '../../../shared/all-pattern/amount-pattern-validator';
@Component({
  selector: 'app-add-fund',
  templateUrl: './add-fund.component.html',
  styleUrls: ['./add-fund.component.css']
})
export class AddFundComponent implements OnInit {
  public walletstatus = {};
  public addFundData = {};
  public addfund: FormGroup;
  public addFundSecondForm: FormGroup;
  public submitted = false;
  public submittedtrans = false;
  private fundData: object;
  public walletbalance;
  public btcaddress;
  public invoicenumber = 0;
  public excahngeValue;
  public walletbalanceData;
  public flag: boolean = false;
  public transactionNumber;
  public btcvalue;
  public addfundamount;
  public invoiceno;
  public requestid;
  public createdate;
  public totalconfirmationsrequired;
  public confirmations;

  public firstSection: boolean = true;
  public secondSection: boolean = false;
  public thirdSection: boolean = false;
  public fiurthSection: boolean = false;

  public confirmationsFlag: boolean = false;
  public minutes: number;
  public seconds: number;
  public qr;
  public coinType;
  public start = 0;
  public itemsTotal;
  public page: number = 1;
  public data: any;
  dataa: any;
  public length: number = 50;
  public tabledata = {};
  public tableview = {};
  public statusMessage;
  public statusMessageFlag: boolean = false;;
  public confirmationsFlagOne: boolean = false;
  public confirmationsFlagTwo: boolean = false;


  constructor(private router: Router,
    private toastr: ToastrManager,
    private _clipboardService: ClipboardService,
    private _api: ApiService,
    private _tokenExpService: TokenExpiryService,
    private formBuilder: FormBuilder) { }
  ngOnInit() {

    this.tabledata['start'] = 0;
    this.tabledata['length'] = 50;
    this.loadData();


    this.fundData = {};
    this.addfund = this.formBuilder.group({
      amount: new FormControl('', [Validators.required, AmountPatternValidator(/^[0-9]*(\.[0-9]{0,8})?$/)]),
      cointype: ['', Validators.required]
    });

    this.addFundSecondForm = this.formBuilder.group({
      transno: ['', Validators.required],
    });

    var walletbalance = {
      wtype: 2
    }
    this._api.get('/secure/getwalletbalance/2').subscribe(data => {
      this.walletbalanceData = data.data;
      this.walletbalance = data.data;
    }, err => {
      // this.tokenExpService.isTokenValid();
    })
    // this._api.post('/secure/getwalletbalance/2').subscribe(data => {
    //   this.walletbalanceData = data.data;
    //   this.walletbalance = data.data.balance;
    // }, error => {

    // });

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
        "coinname": this.coinType
      }

      if (addfundValue.amount >= 25) {
        $('#loading-wrapper').show();
        this._api.post('/secure/addfund', this.fundData).subscribe(data => {
          if (data.status == 1) {
            $('#loading-wrapper').hide();

            this.firstSection = false;
            this.secondSection = true;
            this.thirdSection = false;
            this.fiurthSection = false;

            this.btcaddress = data.btcaddress;
            this.qr = data.qr;
            this.btcvalue = data.valueinbtc;
            this.addfundamount = addfundValue.amount;
            this.invoiceno = data.invoiceno;
            this.requestid = data.requestid;


            this.timerCounter();
            const source = interval(30000);
            const subscribe = source.subscribe(val => this.timerApi('nosubmitdata'));


          } else {
            $('#loading-wrapper').hide();
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
        this.toastr.warningToastr('Enter Minimum 25$ Amount');
      }



    }
  }



  public backFirst() {
    this.firstSection = true;
    this.secondSection = false;
    this.thirdSection = false;
  }

  public timerApi(submitdata) {
    var requestedid = {
      'requestid': this.requestid,
      'coinname': 'btc'

    }

    this._api.post('/secure/checkaddfundstatus', requestedid).subscribe(data => {
      if (data.status == 1) {

        if (data.success == 1) {

          this.createdate = data.data.createdate;
          this.totalconfirmationsrequired = data.data.totalconfirmationsrequired;
          this.confirmations = data.data.confirmations;

          this.firstSection = false;
          this.secondSection = false;
          this.thirdSection = true;
          this.fiurthSection = false;

          this.statusMessage = '';
          this.statusMessageFlag = false;

          if (data.data.Confirmed == 1) {

            this.confirmationsFlagTwo = true;
            this.confirmationsFlagOne = false;
          } else {

            this.confirmationsFlagOne = true;
            this.confirmationsFlagTwo = false;
          }


        } else {

          if (submitdata == 'submitdata') {

            this.firstSection = false;
            this.secondSection = false;
            this.thirdSection = true;
            this.fiurthSection = false;
          }

          this.statusMessage = data.message;
          this.confirmationsFlagTwo = false;
          this.confirmationsFlagOne = false;
          this.statusMessageFlag = true;
        }

      } else {
        this.toastr.warningToastr(data.data);
      }

    }, error => {
    });
  }

  public onSubmitSecond() {
    this.timerApi('submitdata');
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
      // if(this.seconds < 20)
      // {
      //   this.minutes = 0;
      // }
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



  public loadData() {


    this._api.get('/secure/getpaymentlist').subscribe(data => {
      this.tabledata['records'] = '';
      let rec = [];
      if (data.status == 1) {
        this.tableview['failmessage'] = '';
        this.tabledata['recordsTotal'] = data.recordsTotal;

        this.tabledata['headers'] = Object.keys(data.data[0]);
        for (let i = 0; i < data.data.length; i++) {
          rec.push(Object.values(data.data[i]));
        }
        this.tabledata['records'] = rec;
        this.tableview['success'] = this.tabledata;

      }
      else if (data.status == 0) {
        this.tabledata['recordsTotal'] = 0;
        this.tableview['failmessage'] = 'No Records Found';
      }
    });
  }

  public onPageChange(event) {
    this.tabledata['start'] = (event * 50) - 50;
    this.loadData();
  }




}
