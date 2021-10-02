import { AfterContentInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { TokenExpiryService } from '../../shared/service/api/tokenExpiry.service';
import { TokenService } from '../../shared/service/api/tokenservice.service';
import { Http } from '@angular/http';
import swal from 'sweetalert2';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ApiService } from '../../shared/service/api/apiservice.service';
declare const $: any;
import { AuthgService } from '../../shared/service/authguard/auth.service';
import { PasswordMatchPattern } from '../../shared/all-pattern/password-match-pattern';
import { MobilePatternValidator } from '../../shared/all-pattern/mobile-pattern-validator';
declare var require: any;
const cc = require('./countries.json');
@Component({
  selector: 'app-register-cmp',
  styleUrls: ['./register.component.css'],
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit, AfterContentInit {
  register: FormGroup;
  data: any;
  myParams: object = {};
  myStyle: object = {};
  public regData: any = {};
  public submitted = false;
  hsponsor: string;
  userid: string;
  public flag: any;
  public hplacement: any;
  public citySelect: any;
  public correctdata = {};
  public registerflag = false;
  public showname;
  public userflag: any;
  public showflag;
  public countryFlag: any;
  public dialcode;
  public dial_code;
  public loginID;
  public loginid;
  public pass;
  public CountryName: string;
  public countries ;
  public uservalue;
  // public onChangeCountry(e) {
  //   this.countryFlag = e;
  //   const a = this.countries.find(data => data.name === e);
  //      this.dialcode = a.dial_code;
  //  }

  constructor(private tokenService: TokenService,
    private authgService: AuthgService,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private http: Http,
    private route: ActivatedRoute,
    private texpiry: TokenExpiryService
  ) {
    if (this.tokenService.getToken()) {
      window.sessionStorage.removeItem('X-UserToken');
      window.sessionStorage.removeItem('X-UserTokenSign');
    }

  }

  ngAfterContentInit() {
    $(".label-floating input").val("");
    $(document).on('input', 'input:text', function () {
      if ($(this).val() != "") {
        $(this).parent('.label-floating').removeClass("is-empty");
      } else {
        $(this).parent('.label-floating').addClass("is-empty");
      }
    });
    $(".label-floating input").focusin(function () {
      if ($(this).val() != "") {
        $(this).parent('.label-floating').removeClass("is-empty");
        // console.log('1')
      } else {
        $(this).parent('.label-floating').addClass("is-empty");
        // console.log('2')
      }
    });
    $(".label-floating input").focusout(function () {
      if ($(this).val() != "") {
        $(this).parent('.label-floating').removeClass("is-empty");
        // console.log('1')
      } else {
        $(this).parent('.label-floating').addClass("is-empty");
        // console.log('2')
      }
    })
  }

  ngOnInit() {
    this.apiService.get('/getcountry').subscribe(data => {
      this.countries = data.data;
      // console.log(this.countries)
    }, err => {
      // this.tokenExpService.isTokenValid();
    });
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
        },

      }
    };
    this.hsponsor = this.route.snapshot.queryParams['id'];
    const leg = this.route.snapshot.queryParams['leg'];
    this.userid = this.route.snapshot.queryParams['userid'];
    if (this.hsponsor === undefined) {
      this.hsponsor = '';
      this.showflag = 0;
    } else if (this.hsponsor !== undefined) {
      this.showflag = 1;
      this.getUserName(this.hsponsor, 1);
    }
    if (this.userid == undefined) {
      this.userid = '';
      this.userflag = 0;
    } else if (this.userid != undefined) {
      this.getUserName(this.userid, '0');
    }
    if (this.hsponsor != '' && this.hsponsor != undefined) {
      $('#sponserId').attr('readonly', true);
      $('#sel1').attr('disabled', true);
    } else {
      $('#sponserId').attr('readonly', false);
      $('#sel1').attr('disabled', false);
    }

    if (this.citySelect == '') {
      this.citySelect = '-- Select City --';
    }
    const rightside = 'R';
    const leftside = 'L';
    if (leg === rightside) {
      this.hplacement = 'R';
    } else if (leg === leftside) {
      this.hplacement = 'L';
    } else {
      this.hplacement = '';
    }
    this.register = this.formBuilder.group({
      userid: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9_\-]{4,20}$"), Validators.minLength(4), Validators.maxLength(20)]],
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]),
      mobile: new FormControl('', [Validators.required, MobilePatternValidator(/^(?=.*[0-9]).{8,12}$/), Validators.minLength(8), Validators.maxLength(10)]),
      countryName: new FormControl('', [Validators.required]),
      // placement: [this.hplacement, Validators.required],
      sponsorId: [this.hsponsor, Validators.required],
      name: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]),
      password: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: PasswordMatchPattern('password', 'confirmPassword'),
    });
  }

  get reg() {
    return this.register;
  }

  get f() {
    return this.register.controls;
  }

  public onChangeCountry(e) {
    this.countryFlag = e;
    const a = this.countries.find(data => data.code === e);
    // this.dialcode = a.dial_code;

  }

  // addDialCode(e) {
  //   this.dial_code = this.countries.map(r => {
  //     return r.dial_code;
  //   });
  //   this.CountryName = this.register.value.countryName;
  // }

  onRegister() {
    this.submitted = true;
    const data = this.register.value;
    if (data.new == undefined) {
      data.new = '';
    }
    if (this.register.valid) {
      if (this.showflag === 2) {
        swal({
          title: 'error!',
          text: 'Please Enter valid Sponsor ID',
          type: 'error',
          showConfirmButton: true
        })
      } else {

        this.regData = {
          'sponsorid': this.hsponsor,
          'email': data.email,
          'name': data.name,
          'country': data.countryName,
          'password': data.password,
          'mobile': data.mobile.toString(),
          // 'leg': data.placement,
          // "refid": data.new,
          'loginid': data.userid,
        },
          $('#loading-wrapper').show();
        this.apiService.post('/auth/registration', this.regData).subscribe(result => {
          $('#loading-wrapper').hide();
          this.data = result;
          if ((this.data.status === 'success') || (this.data.status === 1)) {
            this.register.reset();
            this.loginID = this.data.loginid;
            this.pass = this.data.password;
            $('#registerModal').modal('show');
          } else {
            $('#loading-wrapper').hide();
            swal({
              type: 'warning',
              title: this.data.data,
              timer: 2000,
              buttonsStyling: false,
              showConfirmButton: false
            });
          }
        });
      }
    } else {
      return;
    }
  }

  getUserName(obj, condition) {
    if (obj != '') {
      this.apiService.get('/auth/getusername/' + obj).subscribe(result => {
        this.data = result;
        if (condition) {
          if ((this.data.status === 'success') || (this.data.status === 1)) {
            this.hsponsor = obj;
            this.showname = this.data.data;
            this.showflag = 1;
            console.log(this.showname)
          }
          else if (this.data.status == 0) {
            this.hsponsor = obj;
            this.showname = 'Sponsor Not Exists';
            this.showflag = 2;
          }
        }
        else if (!condition) {
          if ((this.data.status === 'fail') || (this.data.status === 0)) {
            this.userid = obj;
            this.uservalue = 'OK';
            this.userflag = 1;
          } else {
            this.userid = obj;
            this.uservalue = 'User Id Already Exists';
            this.userflag = 0;
          }

        }
      }, err => {
        this.texpiry.isTokenValid();
      });
    }


  }

  setUserNameOnFocus(obj) {
    obj = '';
    this.showname = '';
    this.showflag = 0;
  }

  public yesPopup() {
    $('#registerModal').modal('hide');
    this.router.navigate(['/login']);
  }

  indexChanged(index) {

  }



}
