import { Injectable } from '@angular/core';
import { ApiService } from '../api/apiservice.service';
import { TokenExpiryService } from '../api/tokenExpiry.service';



@Injectable()
export class CommonApiService {
public records = {};
public status: any;
	constructor(private api: ApiService, private token: TokenExpiryService) {}
		getTableData(api_url: any){
			let rec =[];
			return this.api.get(api_url).map((res: Response)=>{

				  const header = Object.keys(res['data'][0]);

                 for(let i=0; i< res['data'].length; i++){
					rec.push(Object.values(res['data'][i]));
				}
				this.status =	res['status']; 
				console.log(this.status);
				if(this.status == 'success'){
				this.records['header'] = header;
                this.records['record'] = rec;
                this.records['totalRows'] = res['recordsTotal'];
                this.records['recordsPerPage'] = res['recordsFiltered'];
                return this.records;
				}else{
				this.records['message'] = "No Record Found";
				return this.records;
				}      
		})
	}
}