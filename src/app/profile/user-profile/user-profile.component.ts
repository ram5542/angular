import { Component, OnInit, OnChanges, AfterViewInit, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../shared/service/api/apiservice.service';
import { TokenExpiryService } from '../../shared/service/api/tokenExpiry.service';
import { CommonService } from '../../shared/service/common/common.service';
import Swal from 'sweetalert2';
import { apiFactoryService } from '../../shared/service/apifactory/apifactory.service';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { UserInterfaceService } from '../../shared/service/notification/notification.service';
import { TokenService } from '../../shared/service/api/tokenservice.service';
// import {IMyDpOptions, IMyDateModel} from 'mydatepicker';
import {IMyOptions} from 'mydatepicker';
// import { Ng2ImgMaxService } from 'ng2-img-max';
import { Http } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/shared/service';

declare const $: any;
interface FileReaderEventTarget extends EventTarget {
    result: string;
}

interface FileReaderEvent extends Event {
    target: FileReaderEventTarget;
    getMessage(): string;
}
export enum AllValues {
  Male = "M",
  Female = "F"
}


@Component({
  selector: 'user-profile',
  styleUrls:['./user-profile.component.css'],
  templateUrl: './user-profile.component.html'
})
export class UserProfileComponent implements OnInit{
  
  otpTransfer: FormGroup;
  profileForm:FormGroup;
display='none';
  loginData: any;
  resendBtn: boolean;
  public model = {};
  public flagbtn:boolean = false;
  public flagradio:boolean = false;
  user: any;
  data: any;
  public mainwallet;
  public Rewardarchived;
  public celebPics: string[];
  public profilePics: string[];
  public chosen: boolean = false;
  public chosenpic: string;
  public chosenPrev: string;
    public profileData = {};
    public profileData1 = {};
    public sponsorData;
    public dob;
    public gender;
    public genders = [];
    public countryFlag: any;
    public countries;
    allValues = AllValues;
    myValue: AllValues = AllValues.Male;
    valueOptions = Object.keys(AllValues);

public dateformate:any;
    private myDatePickerOptions: IMyOptions = {
      dateFormat: 'dd/mm/yyyy',
  };
  constructor(
    private api: ApiService,
    private tokenExpService: TokenExpiryService,
    public common: CommonService,
    private apifactory: apiFactoryService,
    private fb: FormBuilder,
    private tokenService: TokenService,
    private uis: UserInterfaceService,
    private authService: AuthService,
  ){
    
  }

  ngOnInit() {
    this.api.get('/getcountry').subscribe(data=>{
      this.countries = data.data
    },err=>{});
    
    this.profileForm = this.fb.group({
      userid:new FormControl(),
      username:new FormControl(),
      gender:new FormControl(),
      sponsorid:new FormControl(),
      email:new FormControl(),
      city:new FormControl(),
      country:new FormControl(),
      mobile:new FormControl(),
      dob:new FormControl(),
      funjoaddress:new FormControl(),
      tokenaddress:new FormControl()

    
      
      
      // first:[''],
      // last:[''],
   
     
     
   
      
     
    });
  //  if(this.profileData['yocoinaddress'] == ''){
  //   Swal ({
  //        text: "Please Update Your YOBank Address First!"
  //   });
  //   console.log(this.myValue)
  //  }
    

     this.otpTransfer = this.fb.group({
      "otpVal": ['', Validators.required]
    })
    
 
      this.genders = [
        {value: "M", name:"Male"},
        {value: "F", name:"Female"}
      ];

      let i;
        this.profilePics = [];
        for(i=1;i<=8;i++){
          this.profilePics.push('i'+i);
        }

        this.celebPics = [];
        for(i=1;i<=8;i++){
          this.celebPics.push(''+i);
        }

    

        this.loadme();
       
}
    loadme(){
      this.apifactory.getprofile().subscribe(data=>{
        this.profileData1 = data;
         Object.keys(this.profileData1).forEach(field1 => {
          //  console.log(Object.keys(data))
        Object.keys(this.profileForm.controls).forEach(field => {
          // console.log(Object.keys(this.profileForm.controls))
          if (field.toLowerCase() === field1.toLowerCase()) {
            // alert();
              this.profileForm.get(field).patchValue(this.profileData1[field1]);
              // console.log(this.profileForm.value);
              if(this.profileData[field1] != ''){
                // this.profileForm.controls[field].disable();
                // this.showFlag = false;
              }
          }
        });
      });
         this.dateformate = new Date('2016/09/10');     
    }, err=>{
            // this.tokenExpService.isTokenValid();
        });
    }
    savePic(){
    this.api.post('/secure/setprofileimg', {profileimg: this.chosenpic}).subscribe(data=>{
      this.data = data;
      if(this.data.status === 'success'){
        $('#myModal').modal("hide");
        this.api.get('/secure/me').subscribe(data=>{
          this.data = data;
          if(this.data.status == 1){
            this.common.pic = this.data.data[0]['Profile Image'];
            this.profileData['profilepic'] = this.data.data[0]['Profile Image'];
          }
        }, err=>{
            // this.tokenExpService.isTokenValid();
        });
        Swal({
            type: 'success',
            title: 'Success!',
            text: this.data.data,
            buttonsStyling: false,
            showConfirmButton: false,
            timer: 1500
        }).catch(Swal.noop);
      }
    }, err=>{
        // this.tokenExpService.isTokenValid();
    });
  }

  chosePic(pic){
  var t = this;
  t.chosen = true;
  t.chosenPrev = t.chosenpic;
  t.chosenpic = pic;
  $("#img-"+pic).css({"transform": "scale(1.1, 1.1)", "z-index": 2, "border-color": "#000"});
  $("#img-"+t.chosenPrev).css({"transform": "scale(1,1)", "z-index": 1, "border-color": "#ddd"}); 
  }

   public onDateChanged(event) {
     console.log(event);
    //     event properties are: event.date, event.jsdate, event.formatted and event.epoc
    }

  public onUpdate(){
    var obj = this.profileForm.value;
    console.log(obj);

    this.api.post('/secure/updateuserprofile', obj).subscribe(data=>{
      this.data = data;
            if(this.data.status === 1){
              this.profileData1 = data; 
              Swal({
                type: 'success',
                title: 'Success!',
                text: data.data
            })
            this.loadme();
            }else{
              Swal({
                type: 'warning',
                title: 'Warning!',
                text: data.data
            })
            }
          
      }, err=>{
        // this.tokenExpService.isTokenValid();
      })

   
  }

  sendOTP(){
        let data = this.otpTransfer.value;
        var t = this;
        if(data.otpVal){
          var obj = {
            token: t.tokenService.getOTP(),
            otp: data.otpVal
          };
          //console.log(obj);
          t.api.post('/secure/updateuserprofilestep3', obj).subscribe(data=>{
            t.data = data;
            if(t.data.status === 1){
               $('#myModal3').modal('hide');
               this.otpTransfer.reset();
               t.tokenService.destroyOTP();
               Swal({
                type: 'success',
                title: 'Success!',
                text: "Updated Successfully!",
                buttonsStyling: false,
                confirmButtonClass: 'btn btn-success'
                }).then((result)=> {
                if(result.value){
                  this.authService.onLogout();                  
                }
              })
             
            } else if(t.data.status === 0){
              this.otpTransfer.reset();
              Swal({
                type: 'warning',
                title: 'Warning!',
                text: data.message
            })
              // this.uis.showNotification('top', 'right', data.message, 'warning');
             
            }
          }, err => {
            // this.tokenExpService.isTokenValid();
          });
        }
    }

    // onCloseHandled(){
    //   this.display = 'none';
    // }
    public onChangeCountry(e) {
      console.log(e)
      this.countryFlag = e;
      // console.log(this.countries);
      const a = this.countries.find(data => data.CountryCode === e);
    console.log(a);
  this.profileData['country'] = a.CountryName;
    }
    onchangepara(){
      this.flagbtn = true;
    }
    onchangeradio(){
      this.flagradio = true;
    }
    selectCountry(country){
      console.log(country);
    }
}
