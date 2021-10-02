import { Component, OnInit } from '@angular/core';
declare const $: any;
import { ApiService } from '../../shared/service/api/apiservice.service';
import { TokenExpiryService } from '../../shared/service/api/tokenExpiry.service';

@Component({
	selector: 'app-package-summary',
	templateUrl: './package-summary.component.html',
	styleUrls: ['./package-summary.component.css']
})
export class PackageSummaryComponent implements OnInit {
	public title = "My Referals";
	public topupid;
	public itemsTotal;
	public data1: any;
	public msg;
	public keys1: any;
	public page: number = 1;
	public data: any;
	dataa: any;
	public length: number = 10;
	public tabledata = {};
	public flag: boolean = false;
	public tableview = {};
	public from_date: any;
	public to_date: any;
	public packageStatus;
	public p;
    pageOfItems: Array<any>;
	constructor(
		private api: ApiService,
		private tokenExpService: TokenExpiryService,

	) { }
	ngOnInit() {
		this.tabledata['start'] = 0;
		this.tabledata['length'] = 50;
		this.loadData();
		$('#loading-wrapper').show();
		
	}
	onChangePage(pageOfItems: Array<any>) {
        // update current page of items
        this.pageOfItems = pageOfItems;
    }
	public loadData() {
		// this.api.post('/secure/gettradingportfolio', this.tabledata).subscribe(data => {
			this.api.get('/secure/transaction/5?start=0').subscribe(data => {
			this.tabledata['records'] = '';
			let rec = [];
			if ((data.status == 1) || (data.status == 'success')) {
				$('#loading-wrapper').hide();
				this.tableview['failmessage'] = '';
				this.tabledata['recordsTotal'] = data.recordsTotal;

				this.tabledata['headers'] = Object.keys(data.data[0]);
				for (let i = 0; i < data.data.length; i++) {
					rec.push(Object.values(data.data[i]));
				}
				this.tabledata['records'] = rec;
				this.tableview['success'] = this.tabledata;
				// console.log(this.tabledata['records'])
			}
			else if ((data.status == 0) || (data.status == 'fail')) {
				$('#loading-wrapper').hide();
				this.tabledata['recordsTotal'] = 0;
				this.tableview['failmessage'] = 'No Records Found';
			}
		});
	}

	PackageDetail(data) {
		console.log(data)
		let topupid = data;
		let obj = {
			topupid: topupid
		}
		this.api.post('/secure/getroipaidunpaiddetails', obj).subscribe(data => {
			// console.log(data);
			if ((data.status == 1) || (data.status == 'success')) {
				$('#PackageModal').modal('show');
				this.data1 = data.data;
				this.itemsTotal = data.data.length;
				this.keys1 = Object.keys(this.data1[0]);
				$('#global-loader').hide();
			} else {
				this.data = '';
				this.msg = 'No Record Found!';
				$('#PackageModal').modal('show');
				$('#global-loader').hide();
			}
		}, err => {
			// this.tokenExpService.isTokenValid();
		});
	}

	public onPageChange(event) {
		this.tabledata['start'] = (event * 50) - 50;
		this.loadData();
	}
	public onPageChange1(event) {
		this.tabledata['start'] = (event * 10) - 10;
		this.PackageDetail(this.topupid);
	}

	public getPackList(event) {
		this.packageStatus = event;
	}
}

