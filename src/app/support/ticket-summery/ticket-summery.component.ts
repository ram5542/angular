import{ Component,OnInit } from'@angular/core';
import{ Router,ActivatedRoute, Params } from '@angular/router';
import { ApiService } from '../../shared/service/api/apiservice.service';
import { TokenExpiryService } from '../../shared/service/api/tokenExpiry.service';
import { CommonService } from '../../shared/service/common/common.service';
declare const $:any;
// import { CacheService } from '../../../providers/cache.service';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { ToastrManager } from 'ng6-toastr-notifications';


@Component({
	selector:'ticket-summery',
	templateUrl:'./ticket-summery.component.html',
  styleUrls: ['./ticket-summery.component.css']
})
export class TicketSummaryComponent implements OnInit{
  public title = "Ticket History";
  public data; public keys : any;
  public page: number = 1;
  public start=0;
  public itemsTotal;
  public msg;

  constructor(private api: ApiService,
              private tokenExpService: TokenExpiryService,
              private router: Router,
              private common: CommonService,
               private ng2ImgMax: Ng2ImgMaxService,private toastr: ToastrManager){}
              
ngOnInit()
{

  this.loadData();
}

public onPageChange(start){
  this.start = (start*50)-50;
  this.loadData();
}

public loadData(){
  this.api.post('/secure/ticketgetlist', {department: ''}).subscribe(data=>{
      if(data.status==1){
        this.data=data.data;
        this.itemsTotal = data.recordsTotal;
        this.keys = Object.keys(this.data[0]);
      }else {
        this.msg = "No Record Found!";
      }
       
    }, err => {
      this.tokenExpService.isTokenValid();
              });
    }

    public onChat(data){
     
      this.router.navigate(['/support/ticket-history', data.id]);
    }

}




//Chat Window Component

@Component({
  selector:'ticket-history',
  templateUrl:'./ticket-history.component.html',
  styleUrls: ['./ticket-summery.component.css']
})
export class TicketHistoryComponent implements OnInit{
  public maintitle = "Ticket History";
  public title = "Ticket History";
  public id; public recordsdetails;
  public start = 0;
  public ticketData;
  public page: number = 1; public chat = {};public chatmessage;public ticket = {};public department;
  public ticketcommonData = {};
  public uploadedImage;
  public ticketImage;
  public chatimage = [];
  public viewTicketImage;
  public flag:boolean=true;
  constructor(private api: ApiService,
              private tokenExpService: TokenExpiryService,
              private router: Router,
              private common: CommonService,
              private act: ActivatedRoute,
              private toastr: ToastrManager,
              private ng2ImgMax: Ng2ImgMaxService){}
  ngOnInit()
  {
    $('#loading-wrapper').show(); 
    
    this.ticketImage = '';
   this.viewTicketImage = '';
    this.ticket['status'] = 0;

    setTimeout(()=>{
      this.ticketcommonData['profiledata']   = this.common.allsecuremedata; 
      this.common.allsecuremedata = this.common.allsecuremedata; 
      this.common.pic = this.common.pic;

      this.act.params.subscribe((params: Params) => {
      this.id = params['id'];
      });
       
      this.loadData();
      this.loadDataNew();

     },2500)
  
  }

  public loadData(){
  
        this.api.post('/secure/ticketgetdetails',{id: this.id}).subscribe(result=>{
          $('#loading-wrapper').hide(); 
           this.chat['window'] = result.data;
           let a = this.chat['window'].find(x => x.id == this.id);
           this.ticket['ticketno'] = a.ticketno;
           this.ticket['status'] = a.Status;
           this.ticket['department'] = a.department;
          
        }, err=>{
          this.tokenExpService.isTokenValid();
       })


  }

  public loadDataNew(dept:string = ''){      
        this.api.post('/secure/ticketgetlist', {department: dept}).subscribe(result=>{
          $('#loading-wrapper').hide(); 
          if(result.status ==1){
            this.ticket['table'] = result.data; 
            this.ticket['message'] = ''; 
            this.ticket['length']= result.data.length;
          }
          else if(result.status == 0){
           this.ticket['table'] = [];
           this.ticket['message'] = "No Record Found"; 
           this.ticket['length'] = 1;
         }

        }, err=>{
         this.tokenExpService.isTokenValid();
        })

      }

      public onClick(dataClicked){

        $('#loading-wrapper').show();
        this.id = dataClicked.id;
        this.loadData();
        
        $('#sidepanel').removeClass('leftArrow100');
        $('#Rightcontent').removeClass('rightArrow0');
        $('#sidepanel').addClass('leftArrow0');
        $('#Rightcontent').addClass('rightArrow100');

      }


      public onSearch(department){

        var myArray = this.ticket['table'];

        var item73 = myArray.filter(function(item) {
         return item.department == department;
        });

     
         (department == '')?department ='': department= department;

         department = this.titleCase(department);

         if(department == 'Sales' || department == 'Tech Support' || department == 'Billing and Accounts' || department == 'Abuse and Legal Cell'|| department == ''  ){
           this.loadDataNew(department);
         }

         // this.loadDataNew(department);
      }

      titleCase(str) {
          var splitStr = str.toLowerCase().split(' ');
          for (var i = 0; i < splitStr.length; i++) {
             splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1); 
          }
            return splitStr.join(' '); 
      }

      public updateChat()
      {
         if(this.chatmessage == undefined || this.chatmessage == '')
         {
           this.toastr.errorToastr('Please Type Your Message....'); 
         }else{
            var id = this.id;
            var newentry = this.ticket['table'].find(x => x.id == id);
            var date = new Date();
            var newobj={
              Message:this.chatmessage,
              ProfileImage:"",
              Sender:"user",
              Status:0,
              department:newentry.department,
              id:'',
              ondate: date.getFullYear()+ '-' +(date.getMonth() + 1) + '-' + date.getDate(),
              subject: newentry.Subject,
              ticketDate:"",
              ticketno:"0"
             };
         
           this.chat['window'].push(newobj);
           var obj ={
                department : this.ticket['department'],
                subject : newentry.Subject,
                message: this.chatmessage,
                rootid: newentry.rootid,
                docimg:  this.ticketImage
              }
         this.flag=false;
          this.api.post('/secure/ticketcreateupdate',obj).subscribe(data=>{
               this.ticketImage = '';
               this.chatmessage = '';

               if(data.status == 1){
                 this.toastr.successToastr(data.message); 

                 this.disableSendButton();
                 this.loadData();
               }else{
                 this.toastr.errorToastr(data.message);
               }
              
          }, err=>{
             this.tokenExpService.isTokenValid();
            });  
         }

          
      }

     
    public closepopup(){
      $('#popup_img').hide();
    }
    public showimg(event){
        $('#popup_img').show();
        $('#loading-wrapper').show();
        this.chatimage['img']='';
        this.api.post('/getimage',{filepath: event}).subscribe(result=>{
          $('#loading-wrapper').hide();
           this.chatimage['img']=result;
           if(result.status=="fail"){
             this.chatimage['img']=event;
           }
       },err=>{
        this.tokenExpService.isTokenValid();
       }); 
      }


      onImageChange(event) 
      {
        $('#loading-wrapper').show(); 
  
        let image = event.target.files[0];
       
  
        this.ng2ImgMax.resizeImage(image, 1920, 1080).subscribe(
        result => {
          this.ng2ImgMax.compressImage(result, 0.080).subscribe(
          result1 => {
            this.uploadedImage = result1;
  
            if (this.uploadedImage) 
              {
                  const reader = new FileReader();
                  reader.onload = this.handleReaderLoaded.bind(this);
                  reader.readAsBinaryString(this.uploadedImage);
              }
           },
              error => {
  
                this.uploadedImage = result;
  
                if (this.uploadedImage) 
                  {
                      const reader = new FileReader();
                      reader.onload = this.handleReaderLoaded.bind(this);
                      reader.readAsBinaryString(this.uploadedImage);
                  }
  
                //this.toastr.errorToastr(error.reason); 
              
              });
          },
          error => {
           this.toastr.errorToastr(error.reason);  
          });
    }

  handleReaderLoaded(e) 
  {
     $('#loading-wrapper').hide(); 

      this.ticketImage = ('data:image/png;base64,' + btoa(e.target.result));
      this.viewTicketImage = ('data:image/png;base64,' + btoa(e.target.result));
  }

  public createTicket(){
    $('#myModal').modal('show');
  }
  
  public leftArraowClick()
  {
    
    $('#sidepanel').removeClass('leftArrow100');
    $('#Rightcontent').removeClass('rightArrow0');

    $('#sidepanel').addClass('leftArrow0');
    $('#Rightcontent').addClass('rightArrow100');
  }

  public rightArraowClick()
  {
    $('#sidepanel').removeClass('leftArrow0');
    $('#Rightcontent').removeClass('rightArrow100');

    $('#sidepanel').addClass('leftArrow100');
    $('#Rightcontent').addClass('rightArrow0');
  }

  public onRemoved() {
    this.viewTicketImage = '';
  }

  public disableSendButton(){
    this.flag=true;
  }


}