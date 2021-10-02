import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

import { ApiService } from '../../../shared/service/api/apiservice.service';
import { TokenExpiryService } from '../../../shared/service/api/tokenExpiry.service';
import { CommonService } from '../../../shared/service/common/common.service';

@Component({
selector: 'tree-user',
styleUrls: ['./tree-user.component.css'],
templateUrl: './tree-user.component.html',
encapsulation: ViewEncapsulation.None
})

export class TreeUserComponent implements OnInit{
changeText: boolean;
public s;
public data: any;
@Input() user: any;
public sponsorid;
@Output() userClicked = new EventEmitter();

constructor(private api: ApiService,
	private tokenExpService: TokenExpiryService, 
	public common: CommonService){
		this.changeText = false;
	}

ngOnInit() {	
	if((this.user.position%2)==0){
		this.s="L";
	}
	else{
		this.s="R";
	}
	  setTimeout(() => {
		this.common.allsecuremedata = this.common.allsecuremedata;
		this.sponsorid =  this.common.allsecuremedata['User Id'];
	  }, 2000);
    
}

onuserClicked(e) {
this.userClicked.emit(e);
}

onNewReg () {
	var url = 'https://yoplex.world/user/#/register?id=' + this.sponsorid + '&leg=' + this.s;
	// var url = 'http://localhost:4200/#/register?id=' + this.sponsorid + '&leg=' + this.s;

	window.open(url, '_blank');
    }

}
