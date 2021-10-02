import { Component, OnInit, ElementRef, ViewEncapsulation, OnChanges, AfterContentInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/service/authservice/authservice.service';
import { TokenService } from '../../shared/service/api/tokenservice.service';
import { CommonService } from '../../shared/service/common/common.service';
import { Observable } from 'rxjs';
import swal from 'sweetalert2';
import * as $ from 'jquery';
@Component({
    selector: 'app-login',
    styleUrls: ['./login.component.css'],
    templateUrl: './login.component.html',
    encapsulation: ViewEncapsulation.None
})



export class LoginComponent implements OnInit, AfterContentInit {
    model: any = {};
    public loginForm: FormGroup;
    private loginCredentials;
    // private model: any = {};
    private data;
    myParams: object = {};
    myStyle: object = {};
    public user = '';
    public pass = '';
    public remme = false;
    public position = 'bottom-right';
    private title: string;
    private msg: string;
    private showClose = true;
    private timeout = 5000;
    private theme = 'bootstrap';
    public submitted = false;
    private username: string;
    private type = 'default';
    private images = [];
    // angular slider
    index = 0;
    infinite = true;
    direction = 'right';
    directionToggle = true;
    autoplay = true;
    avatars = [3, 2, 1].map((x, i) => {
        const num = x;
        return {
            url: `assets/img/${num}.jpg`,
            title: `${num}`
        };
    });
    constructor(private formBuilder: FormBuilder,
        private authService: AuthService,
        private tokenService: TokenService,
        private router: Router,
        private commonService: CommonService
    ) { }
    ngAfterContentInit() {
        $(".label-floating input").val("");
        $(document).on('input', 'input:text', function() {
            if ($(this).val() != "") {
                $(this).parent('.label-floating').removeClass("is-empty");
            } else {
                $(this).parent('.label-floating').addClass("is-empty");
            }
        });
        $(".label-floating input").focusin(function () {
            if ($(this).val() != "") {
                $(this).parent('.label-floating').removeClass("is-empty");
            } else {
                $(this).parent('.label-floating').addClass("is-empty");
            }
        });
        $(".label-floating input").focusout(function () {
            if ($(this).val() != "") {
                $(this).parent('.label-floating').removeClass("is-empty");
            } else {
                $(this).parent('.label-floating').addClass("is-empty");
            }
        })        
    }
    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
        });
        if ('user' in localStorage && 'pass' in localStorage) {
            this.remme = true;
            this.user = localStorage.getItem('user');
            this.pass = localStorage.getItem('pass');
        }
        this.myStyle = {
            'position': 'fixed',
            'width': '100%',
            'height': '100%',
            'z-index': -1,
            'top': 0,
            'left': 0,
            'right': 0,
            'bottom': 0,
            // 'background-image': 'url(assets/img/banner.jpg)'
        };
        setTimeout(function () {
            $('.card').removeClass('card-hidden');
        }, 700);
        this.myParams = {
            particles: {
                number: {
                    value: 150,
                },
                color: {
                    value: '#fff'
                },
                shape: {
                    type: 'star'
                    // image: {
                    //       src: '../../../assets/img/coin_1.png'
                    // }
                },

            }
        };
        if ("user" in localStorage && "pass" in localStorage) {
            this.remme = true;
            this.model.username = localStorage.getItem("user");
            this.model.password = localStorage.getItem("pass");
        }

    }
    onSubmit() {
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
            // $('#loginSubmit').innerHTML = 'completed all field';
        }
        this.submitted = true;
    }
    isFieldValid(field: string) {
        return !this.loginForm.get(field).valid && this.loginForm.get(field).touched;
    }
    displayFieldCss(field: string) {
        return {
            'has-error': this.isFieldValid(field),
            'has-feedback': this.isFieldValid(field)
        };
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
    get login() { return this.loginForm; }
    get f() { return this.loginForm.controls; }

    onLogin() {
        const data = this.loginForm.value;
        if (this.loginForm.valid) {
            this.loginCredentials = {
                'loginid': data.username,
                'password': data.password
            };
            $('#loading-wrapper').show();
            this.authService.onLogin(this.loginCredentials).subscribe(result => {

                this.data = result;
                if ((this.data.status === 'success') || (this.data.status === 1)) {
                    if (this.remme) {
                        localStorage.setItem('user', data.username);
                        localStorage.setItem('pass', data.password);
                    } else {
                        localStorage.removeItem('user');
                        localStorage.removeItem('pass');
                    }
                    this.tokenService.saveToken(this.data.data.token, this.data.data.sign);
                    this.router.navigateByUrl('/dashboard');
                } else if ((this.data.status === 'fail') || (this.data.status === 0)) {
                    $('#loading-wrapper').hide();
                    $('.edit-form').css('z-index', '-99999');
                    swal({
                        type: 'error',
                        title: this.data.data,
                        // timer: 2000,
                        buttonsStyling: true,
                        showConfirmButton: true
                    }).then(Response => {
                        $('.edit-form').css('z-index', '99999');
                    });
                }
            },
                error => {
                    $('#loading-wrapper').hide();
                    $('.edit-form').css('z-index', '-99999');
                    swal({
                        type: 'warning',
                        title: 'Some ERROR occured!',
                        text: 'Please try again...',
                        // timer: 2000,
                        buttonsStyling: true,
                        showConfirmButton: true
                    }).then(Response => {
                        $('.edit-form').css('z-index', '99999');
                    });
                });
        } else {
            this.validateAllFormFields(this.loginForm);
        }
    }
    indexChanged(index) {
    }


}
