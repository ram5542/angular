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

declare interface ValidatorFn {
    (c: AbstractControl): {
        [key: string]: any;
    };
}

@Component({
	selector: 'change-password',
	templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent implements OnInit{
	loginPassword: FormGroup;
	walletPassword: FormGroup;
	otpTransfer: FormGroup;
	loginData: any;
	resendBtn: boolean;
	wallet: string = '';
	
	constructor(
		private formBuilder: FormBuilder,
		private api: ApiService,
		private tokenService: TokenService,
		private router: Router,
		private tokenExpService: TokenExpiryService,
		private uis: UserInterfaceService
	){}

	ngOnInit(){

		this.loginPassword = this.formBuilder.group({
	        
	        currentPassword: ['', [Validators.required]],
	        
	        password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
	        confirmPassword: ['', Validators.required],
	       }, {
	         validator: PasswordValidation.MatchPassword 
	     });

		this.walletPassword = this.formBuilder.group({
	        
	        currentPassword: ['', [Validators.required]],
	        
	        password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
	        confirmPassword: ['', Validators.required],
	       }, {
	         validator: PasswordValidation.MatchPassword 
	    	 });

			this.otpTransfer = this.formBuilder.group({
				otpVal: ['', [Validators.required]]
			});

	}

	onUpdate(pwdtype) {
		if(pwdtype==='login'){
            this.changePassword();
		}else if(pwdtype==='transaction'){
			this.changeWalletPassword();
		}
	}

    changePassword(){

    	    if(this.loginPassword.valid){
    	    		var obj = {
						oldpassword: this.loginPassword.value.currentPassword,
						newpassword: this.loginPassword.value.password
					};
    	    	this.api.post('/secure/changepassword', obj).subscribe(data=> {
				this.loginData = data;
				if ((data.status != 'fail') || (data.status == 'success')) {
					swal({
		                type: 'success',
		                text: this.loginData.data,
		                timer: 2000,
		                buttonsStyling: false,
		                showConfirmButton: false
		            }).catch(swal.noop);
					this.loginPassword.reset();
				}else{
					this.fail();
					swal({
		                type: 'warning',
		                text: this.loginData.data,
		                timer: 2000,
		                buttonsStyling: false,
		                showConfirmButton: false
		            }).catch(swal.noop);
				}
				}, err=>{
					this.tokenExpService.isTokenValid();
			    });
    	    }else {
			this.uis.validateAllFormFields(this.loginPassword);
		}
    			
    }

    changeWalletPassword(){
    	 if(this.walletPassword.valid){
    	 		var obj = {
					oldpassword: this.walletPassword.value.currentPassword,
					newpassword: this.walletPassword.value.password
				};
    	    	this.api.post('/secure/change-trans-password', obj).subscribe(data=>{
				
				this.loginData = data;
				if ((data.status != 'fail') || (data.status == 'success')) {
					swal({
		                type: 'success',
		                text: this.loginData.data,
		                timer: 2000,
		                buttonsStyling: false,
		                showConfirmButton: false
		            }).catch(swal.noop);
					this.walletPassword.reset();
				}else {
					this.fail();
					swal({
		                type: 'warning',
		                text: this.loginData.data,
		                timer: 2000,
		                buttonsStyling: false,
		                showConfirmButton: false
		            }).catch(swal.noop);
				}
				}, err=>{
					this.tokenExpService.isTokenValid();
			    });
    	    }else {
			this.uis.validateAllFormFields(this.walletPassword);
		}
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

	fail(){
        var snd = new  Audio("../../assets/audio/alcatel_fail.mp3");  
            snd.play();
    }

    success(){
        var snd = new  Audio("../../assets/audio/google_glass_success.mp3");  
            snd.play();
    }
}