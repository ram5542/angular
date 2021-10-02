import { Injectable } from '@angular/core';
import { ApiService } from './api/apiservice.service';
import { TokenExpiryService } from './api/tokenExpiry.service';
import { MyHelperLibrary } from '../helper/helper';


@Injectable()
export class CommonApiFunctionService {
public records;
	constructor(private api: ApiService, private token: TokenExpiryService) {}
		public getTableApiData(api_url?: any){
			const obj = new MyHelperLibrary();
			return this.api.get(api_url).map((res: Response)=>{
			this.records = obj.loadTableData(res['data'],res['recordsTotal'],res['status']);
			return this.records;
		})
	}
	public getApiData(api_url?: any) {
		return this.api.get(api_url).map((res: Response) => {
			return this.records = res['data'];
		});
	}

	public getTableDataPost(api_url, filterdata) {
		const obj = new MyHelperLibrary();
		return this.api.post(api_url, filterdata).map((res: Response)=>{
			this.records = obj.loadTableData(res['data'],res['recordsTotal'],res['status']);
			return this.records;
		});
	}
}