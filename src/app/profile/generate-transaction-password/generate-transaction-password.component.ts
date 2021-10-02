import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';

import { ApiService } from '../../shared/service/api/apiservice.service';
import { TokenService } from '../../shared/service/api/tokenservice.service';
import { PasswordValidation } from '../../shared/validationforms/password-validator.component';
import { Router } from '@angular/router';
import { TokenExpiryService } from '../../shared/service/api/tokenExpiry.service';
import { UserInterfaceService } from '../../shared/service/notification/notification.service';
import swal from 'sweetalert2';
declare const $: any;

@Component({
  selector: 'app-generate-transaction-password',
  templateUrl: './generate-transaction-password.component.html',
  styleUrls: ['./generate-transaction-password.component.css']
})
export class GenerateTransactionPasswordComponent implements OnInit {
  walletPassword: FormGroup;
  public loginData;
  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private tokenService: TokenService,
    private router: Router,
    private tokenExpService: TokenExpiryService,
    private uis: UserInterfaceService
  ) { }

  ngOnInit() {

  }

  genWalletPassword() {
    this.api.post('/secure/generatewalletpassword').subscribe(data => {
      if(data.status == 1){
        swal({
          type: 'success',
          title: 'Success!',
          text: data.data,
          buttonsStyling: false,
          showConfirmButton: false,
          timer: 1500
      }).catch(swal.noop);
      } else {
        swal({
          type: 'error',
          title: 'Error!',
          text: data.data,
          buttonsStyling: false,
          showConfirmButton: false,
          timer: 1500
      }).catch(swal.noop);
      }
    }, err => {
      // this.tokenExpService.isTokenValid();
    });
  }

}
