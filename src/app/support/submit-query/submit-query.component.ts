import { Component, OnInit, ElementRef, ViewEncapsulation, ViewContainerRef } from '@angular/core';
import{ Router } from '@angular/router';
import { ApiService } from '../../shared/service/api/apiservice.service';
import { TokenExpiryService } from '../../shared/service/api/tokenExpiry.service';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Ng2ImgMaxService } from 'ng2-img-max';
import swal from 'sweetalert2';
import { ToastrManager } from 'ng6-toastr-notifications';
declare const $: any;
@Component({
	selector:'submit-query',
  templateUrl:'./submit-query.component.html',
  styleUrls: ['./submit-query.component.css']
})
export class SubmitQueryComponent implements OnInit{
  public title = 'Query';
  public user: any = {}; 
  public depart;
  public btnflag=true;
  public ticketImage;
  public uploadedImage;
	constructor(private api: ApiService,
	private tokenExpService: TokenExpiryService,
	private router: Router,
	private formBuilder: FormBuilder,vcr: ViewContainerRef,
  private ng2ImgMax: Ng2ImgMaxService,

   private toastr: ToastrManager)
  {   }

ngOnInit(){

this.user.department = "";
this.user.subject = '';
this.user.description='';

    this.api.get('/secure/getticketdepartments').subscribe(data=>{
      if((data.status === 'success') || (data.status === 1)){
        this.depart = data.data[0];
      }
    }, err=>{
            // this.tokenExpService.isTokenValid();
        });
  }
  onSelectionChange(selectDep){
    this.user.department = selectDep;
  }
  onSubmitQuery()
  {
       this.btnflag=false;
     
       var obj ={
        department : this.user.department,
        subject : this.user.subject,
        message: this.user.description,
        rootid: "0",
        docimg: this.ticketImage
      }

  
      if(obj.department != '' && obj.subject != ''  && obj.message!= '')
      {
          $('#loading-wrapper').show();
          this.api.post('/secure/ticketcreateupdate',obj).subscribe(data=>{
            $('#loading-wrapper').hide();
            if(data.status == 1){

               this.btnflag=true;
               this.toastr.successToastr('Query submitted Successfully!'); 
                this.user = {};
               this.router.navigate(['/support/ticket-summary']);
               
            }
          }, err=>{
              //  this.tokenExpService.isTokenValid();
          });        
      }else {
        this.btnflag=true;
        this.toastr.errorToastr('Fields Can not Be Empty!'); 
      }

  }

  onImageChange(event) 
    {
      $('#loading-wrapper').show(); 
      this.ticketImage = '';
      let image = event.target.files[0];
      this.ng2ImgMax.resizeImage(image, 1920, 1080).subscribe(
      result => 
      {
        this.ng2ImgMax.compressImage(result, 0.080).subscribe(
        result1 => 
        {

          this.uploadedImage = result1;

          if (this.uploadedImage) 
            {
                const reader = new FileReader();
                reader.onload = this.handleReaderLoaded.bind(this);
                reader.readAsBinaryString(this.uploadedImage);
            }
         },
            error => {
            //  this.toastr.errorToastr(error.reason); 
           
            });
        },
        error => {
          // this.toastr.errorToastr(error.reason); 
          
          
        });
  }

  handleReaderLoaded(e) 
  {
     $('#loading-wrapper').hide(); 
      this.ticketImage = ('data:image/png;base64,' + btoa(e.target.result));
  }


  
}