import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/service/api/apiservice.service';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenExpiryService } from '../../shared/service/api/tokenExpiry.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CommonService } from 'src/app/shared/service';
declare const $: any;

@Component({
  selector: 'app-transfer-to-funjo',
  templateUrl: './transfer-to-funjo.component.html',
  styleUrls: ['./transfer-to-funjo.component.css']
})
export class TransferToFunjoComponent implements OnInit {
  public transferglowmoney: FormGroup; public balance: any;
  public showname;
  public showflag;
  public showflag2;
  hsponsor: string;
  userid: string;
  public me;
  public data: any;
  public useridd;
  public amounts;
  public scodes;
  constructor( public common: CommonService,private router: Router, private toastr: ToastrManager, private api: ApiService, private tokenExpService: TokenExpiryService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.me = this.common.allsecuremedata;
    this.LoadWalletBalace();
    this.transferglowmoney = this.formBuilder.group({
      amount: ['', [Validators.required]],
      scode: ['', [Validators.required]]
    });
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  displayFieldCss(form: FormGroup, field: string) {
    return {
      'has-error': this.isFieldValid(form, field),
      'has-feedback': this.isFieldValid(form, field)
    };
  }

  isFieldValid(form: FormGroup, field: string) {
    return !form.get(field).valid && form.get(field).touched;
  }

  onTransfer() {
    if (this.transferglowmoney.valid) {
      if (this.balance  > 0) {
        if (this.transferglowmoney.value.amount > 0) {
          var obj = {
            toid: this.me['userid'],
            amount: this.transferglowmoney.value.amount,
            scode: this.transferglowmoney.value.scode,
            wtypeto: 2,
            wtypefrom: 1
          }

          $('#loading-wrapper').show();
          this.api.post('/secure/transferfund', obj).subscribe(data => {
            $('#loading-wrapper').hide();
            if ((data.status == "success") || (data.status == 1)) {
              this.toastr.successToastr(data.data, 'Success!');
              this.LoadWalletBalace();
              this.router.navigate(['/funjo-transfer']);
              this.showname = '';
              this.showflag = '';
              this.transferglowmoney.reset();
            }
            else {
              this.toastr.errorToastr(data.data, 'Error!');
            }
          }, err => {
            $('#loading-wrapper').hide();
            // this.tokenExpService.isTokenValid();
          });
        } else {
          this.toastr.errorToastr('Enter amount should be valid number.', 'Error!');
        }
      }else{
        this.toastr.warningToastr('Funjo Balance Not Available', 'Error!');
      }
    } else {
      this.validateAllFormFields(this.transferglowmoney);
    }
  }

  getUserName(obj, condition) {
    if (obj.value != '') {
      this.api.get('/auth/getusername/' + obj.value).subscribe(result => {
        this.data = result;
        if (condition) {
          if (this.data.status === "success" || this.data.status === 1) {
            this.hsponsor = obj.value;
            this.showname = this.data.data;
            this.showflag = 1;
            this.showflag2 = 1;
          }
          else if (this.data.status == "fail" || this.data.status == 0) {
            this.hsponsor = obj.value;
            this.showname = 'User Not Exists';
            this.showflag = 2;
          }
        }
        else if (!condition) {
          if (this.data.status !== "success" || this.data.status !== 1) {
            this.userid = obj.value;
            obj.value += '[OK]';
          } else {
            this.userid = obj.value;
            obj.value += '[User Already Exists]';
          }
        }
      }, err => {
        // this.tokenExpService.isTokenValid();
      });
    }


  }

  setUserNameOnFocus(obj) {
    // obj.value = '';
    this.showname = '';
    this.showflag = 0;
  }

  LoadWalletBalace() {
    const obj = {
      wtype : 1
    }
    this.api.post('/secure/getwalletbalance/',obj).subscribe(data => {
      
      if(data.data['balance'] == 0){
        this.balance = '0';
      } else {
        this.balance = data.data['balance'];
      }
    }, err => {
      // this.tokenExpService.isTokenValid();
    })
  }
}
