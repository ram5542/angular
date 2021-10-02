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

@Component({
  selector: 'fund-transfer',
  styleUrls: ['./fund-transfer.component.css'],
  templateUrl: './fund-transfer.component.html'
})
export class FundTransferComponent implements OnInit {

  public transferglowmoney: FormGroup; public balance: any;
  public showname;
  public showflag;
  public showflag2;
  hsponsor: string;
  userid: string;
  public data: any;
  public useridd;
  public amounts;
  public scodes;
  constructor(private router: Router, private toastr: ToastrManager, private api: ApiService, private tokenExpService: TokenExpiryService, private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.LoadWalletBalace();
    this.transferglowmoney = this.formBuilder.group({
      toid: ['', [Validators.required]],
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
     



        if (this.showflag == 1) {

          if(this.transferglowmoney.value.amount > 0){
          var obj = {
            toid: this.transferglowmoney.value.toid,
            amount: this.transferglowmoney.value.amount,
            scode: this.transferglowmoney.value.scode,
            wtypeto: 2,
            wtypefrom: 2
          }
  
          $('#loading-wrapper').show();
          this.api.post('/secure/transferfund', obj).subscribe(data => {
            $('#loading-wrapper').hide();
            if (data.status == 1) {
              this.toastr.successToastr(data.data, 'Success!');
              this.LoadWalletBalace();
              this.router.navigate(['/cash-wallet-transactions']);
              this.showname = '';
              this.showflag = '';
              this.transferglowmoney.reset();
            }
            else {
              this.toastr.errorToastr(data.data, 'Error!');
            }
          }, err => {
            $('#loading-wrapper').hide();
            this.tokenExpService.isTokenValid();
          });
         }else{
            this.toastr.errorToastr('Enter amount should be valid number.', 'Error!');
          }
        }



      // }else{
      //   this.toastr.errorToastr('Enter amount should be valid number.', 'Error!');
      // }


   
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
        this.tokenExpService.isTokenValid();
      });
    }


  }

  setUserNameOnFocus(obj) {
    // obj.value = '';
    this.showname = '';
    this.showflag = 0;
  }

LoadWalletBalace(){
  this.api.get('/secure/getwalletbalance/2').subscribe(data => {
    this.balance = data.data;
  }, err => {
    this.tokenExpService.isTokenValid();
  })
}
}