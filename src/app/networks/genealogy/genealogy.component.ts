import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiService } from '../../shared/service/api/apiservice.service';
import { TokenExpiryService } from '../../shared/service/api/tokenExpiry.service';
import { CommonService } from '../../shared/service/common/common.service';
// import { CommonApiService } from '../../../shared/service/commonapiservice/commonapiservice.service';
declare const $: any;

@Component({
  selector: 'app-genealogy-tree',
  styleUrls: ['./tree.css'],
  templateUrl: './genealogy.component.html',
  encapsulation: ViewEncapsulation.None,
})

export class GenealogyTreeComponent implements OnInit {

treeUsers: object;
userid: string;
allUsers: any;
data: any;
public memberId;

constructor(
private api: ApiService,
private tokenExpService: TokenExpiryService,
public common: CommonService,
) {}

ngOnInit() {
  $('#loading-wrapper').show();
   setTimeout(() => {
    this.common.allsecuremedata = this.common.allsecuremedata;

    console.log(this.common.allsecuremedata);

    this.memberId =  this.common.allsecuremedata['User Id'];
    this.treeLoader(this.memberId);
  }, 2000);
}

  treeLoader(id) {
    const t = this;
    if (id) {
    this.api.get('/secure/genealogybinarytree/' + id).subscribe(data => {
      $('#loading-wrapper').hide();
      if((data.status==="success") || (data.status=== 1)){
        this.treeUsers = data.data;
      }
    $('.full-content').removeClass('full-content');
    }, err => {
     this.tokenExpService.isTokenValid();
    });
    }
  }


  fireEvent(e){

      $('.user').removeClass('animated fadeInDown');
      $('.user').removeClass('animated fadeInLeft');
      $('.user').removeClass('animated fadeInRight');
      $('.user').removeClass('animated rotateInDownLeft');
      $('.user').removeClass('animated rotateInDownRight');

      $('.tree-tooltip').removeClass('fadeInDown');
      $('.tree-tooltip').removeClass('fadeInLeft');
      $('.tree-tooltip').removeClass('fadeInRight');
      $('.tree-tooltip').removeClass('rotateInDownLeft');
      $('.tree-tooltip').removeClass('rotateInDownRight');
      $('.tree-tooltip').addClass(e);   
  }

}
