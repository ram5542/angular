import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/service/api/apiservice.service';
import { TokenExpiryService } from '../../shared/service/api/tokenExpiry.service';
import { CommonService } from '../../shared/service/common/common.service';
import { apiFactoryService } from '../../shared/service/apifactory/apifactory.service';



@Component({
	selector: 'sponsor-info',
	templateUrl: './sponsor-info.component.html'
})
export class SponsorInfoComponent implements OnInit{

	public sponsorData;
	constructor(private api: ApiService,
		private tokenExpService: TokenExpiryService,
		public common: CommonService,
    private apifactory: apiFactoryService){}

	ngOnInit() {
		this.sponsorDetails();
	}

	 sponsorDetails(){
       this.apifactory.getSponsorDetails().subscribe(data=>{
      this.sponsorData = data;
     
    },err=>{
               this.tokenExpService.isTokenValid();
           });
    }
}

