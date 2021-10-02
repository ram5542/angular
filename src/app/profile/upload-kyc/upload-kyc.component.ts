import { Component, OnInit, OnChanges, AfterViewInit, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../shared/service/api/apiservice.service';
import { TokenExpiryService } from '../../shared/service/api/tokenExpiry.service';
import { CommonService } from '../../shared/service/common/common.service';
import swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { TokenService } from '../../shared/service/api/tokenservice.service';
import { FileHolder } from 'angular2-image-upload';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { Http } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';

declare const $: any;
declare var require: any;


@Component({
  selector: 'upload-kyc',
  templateUrl: './upload-kyc.component.html'
})
export class UploadKycComponent implements OnInit{
  public bankForm: FormGroup;
  public formtype:any = {};
  public profile_img;
  public kycimg={};
  public Upload = 'Upload';
  public fileflag = true;
  public aadharp = false;
  public photop = false;
  public chequep = false;
  public panp = false;
  public disab = false;
  public profiledata = {};
  public kycData;
  public flag:boolean = false; 
  public value = "Upload";
  uploadedImage: File;
  public imagePreview;
  
  public kycdata={};
  public base64textString = [];
  public file_srcs: string[] = [];
  public debug_size_before: string[] = [];
  public debug_size_after: string[] = []; 
  public profile_imgg;
  constructor(
              private api: ApiService,
              private tokenExpService: TokenExpiryService,
              private tokenService: TokenService,
              private router: Router,
              private http: Http,
              public common: CommonService,
              public fb :FormBuilder,
              private chgDetectRef:ChangeDetectorRef){}
              ngOnInit(){
                this.bankForm = this.fb.group({
                  acholdername: ['', Validators.required],
                  bankname: ['', Validators.required],
                  branchname: ['', Validators.required],
                  acno: ['', Validators.required],
                  ifscode: ['', Validators.required],
                  panno: ['', Validators.required]
              });
          
                this.getKycDetails();
          }
          
          getKycDetails() {
            this.api.get('/secure/getkycdetails').subscribe(data=>{
              if(data.status == 1){
                 this.kycData=data.data;
                  this.setDefaultDataInProfile();
                this.kycimg['status'] = data.data;
                if(this.kycimg['status'].status=='Approved' || this.kycimg['status'].status=='Approval Pending'){
                      this.kycimg['pan'] = data.datapan;
                      this.kycimg['address'] = data.aadhar;
                      this.kycimg['photoid'] = data.cheque;
                      // this.disab = true;
                      this.bankForm.disable();
                      this.fileflag=false;
                }else if(this.kycimg['status'].status=='Rejected'){
                  this.kycdata['docimgshowpan'] = data.datapan;
                  this.kycdata['docimgshowaddress'] = data.aadhar;
                  this.kycdata['docimgshowphotoid'] = data.cheque;
                  // this.disab = false;
                }
              }else{
                this.kycdata['start'] = "starting";
                // this.kycdata['docimgshowpan'] ='assets/img/no-image.png';
                // this.kycdata['docimgshowaddress'] ='assets/img/no-image.png';
                // this.kycdata['docimgshowphotoid'] = 'assets/img/no-image.png';
                  //  this.disab = false;
              }
            }, err=>{
                  this.tokenExpService.isTokenValid();
              });
          }
          
              public setDefaultDataInProfile() {
                  Object.keys(this.kycData).forEach(field1 => {
                   
                    Object.keys(this.bankForm.controls).forEach(field => {
                     
                      if (field.toLowerCase() === field1.toLowerCase()) {
                        this.bankForm.get(field).setValue(this.kycData[field1]);
                      }
                    });
                  });
              }
          
              onUpdateBank(){
              if(this.bankForm.valid){
                  var objj = {
                   acholdername : this.bankForm.value.acholdername,
                   bankname : this.bankForm.value.bankname,
                   branchname : this.bankForm.value.branchname,
                   acno : this.bankForm.value.acno,
                   ifscode : this.bankForm.value.ifscode,
                   panno : this.bankForm.value.panno,
                   pancarddoc : this.kycdata['docimgshowpan'],
                   aadhardoc : this.kycdata['docimgshowaddress'],
                   chequedoc  : this.kycdata['docimgshowphotoid']
                  }
                  console.log(objj);
                        this.flag = true;
                        this.value = "Processing...";
                   this.api.post('/secure/kycinsert', objj).subscribe(data=>{
                      if(data.status==1){
                        this.flag = false; 
                        this.value = "Upload";
                        this.bankForm.reset();
                        this.fileflag = this.fileflag;
                        swal({
                          type: 'success',
                          title: 'Success!',
                          text: data.message,
                          buttonsStyling: false,
                          showConfirmButton: false,
                          timer: 2000
                      }).catch(swal.noop);
                     this.getKycDetails();
                      }
                      else if(data.status==0){
                        this.flag = false;
                         this.value = "Upload";
                         swal({
                          type: 'error',
                          title: 'Warning!',
                          text: data.message,
                          buttonsStyling: false,
                          showConfirmButton: false,
                          timer: 1500
                      }).catch(swal.noop);
                        this.getKycDetails();
                      }
                   },err=>{
                      this.tokenExpService.isTokenValid();
                  });
              }
              else{
                this.validateAllFormFields( this.bankForm);
              //   swal({
              //     type: 'error',
              //     title: 'Warning!',
              //     text: "Field Cannot Be Empty",
              //     buttonsStyling: false,
              //     showConfirmButton: false,
              //     timer: 1500
              // }).catch(swal.noop);
              }
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
          
          
          public fileChange(input,name){
          // console.log(input.files);
          this.file_srcs = [];
          this.readFiles(input.files,name);  
          }
          
          public readFile(file,name, reader, callback){
          reader.onload = () => {
          callback(reader.result);
          this.profile_imgg=reader.result;
          
          if(name=='pancard'){
          this.kycdata['doctype']=name;
          this.kycdata['doctext']=name;
          this.kycdata['docimg']=this.profile_img;
          // this.kycdata['docimgshowpan']=this.profile_img;
          
          }
          if(name=='address'){
          this.kycdata['doctype']=name;
          this.kycdata['doctext']=name;
          this.kycdata['docimg']=this.profile_img;
          
          }
          
          
          if(name=='photoid'){
          this.kycdata['doctype']=name;
          this.kycdata['doctext']=name;
          this.kycdata['docimg']=this.profile_img;
          
          }
          
          
          }
          reader.readAsDataURL(file);
          }
          
          
          public readFiles(files,name, index=0){
          let reader = new FileReader();
          if(index in files){
          this.readFile(files[index], name,reader, (result) =>{
          var img = document.createElement("img");
          img.src = result;
          this.resize(img, 576, 576, name,(resized_jpeg, before, after)=>{
          this.debug_size_before.push(before);
          this.debug_size_after.push(after);
          this.file_srcs.push(resized_jpeg);
          
          // console.log(this.file_srcs[0]);
          // var decodedBase64 = atob(this.file_srcs[0]);
          // console.log(decodedBase64);
          // console.log(this.debug_size_before);
          // console.log(this.debug_size_after);
          
          if(name=='pancard'){
            this.kycdata['docimgshowpan'] = resized_jpeg; 
          }else if(name == 'address'){
             this.kycdata['docimgshowaddress'] = resized_jpeg;
          }else if(name == 'photoid'){
              this.kycdata['docimgshowphotoid'] = resized_jpeg;
          }
          // this.readFiles(files, index+1);
          });
          });
          }else{
          this.chgDetectRef.detectChanges(); 
          }
          }
          
          
          public resize(img, MAX_WIDTH:number, MAX_HEIGHT:number, name,callback){
          return img.onload = () => {
            // console.log(img.width);
            // console.log(img.height);
          
          var width = img.width;
          var height = img.height;
          if (width > height) {
          if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          // console.log(height);
          
          width = MAX_WIDTH;
          // console.log(width);
          }
          } else {
          if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          // console.log('second' + width);
          height = MAX_HEIGHT;
          // console.log('second' +height);
          }
          }
          var canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
           
          var ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0,  width, height);
          var dataUrl = canvas.toDataURL('image/jpeg');
          callback(dataUrl, img.src.length, dataUrl.length);
          };
          }

}