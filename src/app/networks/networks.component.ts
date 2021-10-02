import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
// import { TableComponent } from '../shared/table/table.component';
import * as service from '../shared/service/index';
declare const $: any;
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup } from "@angular/forms";
@Component({
	selector: 'directs',
	templateUrl: './my-directs.component.html',
	encapsulation: ViewEncapsulation.None
})

export class MyDirectsComponent implements OnInit {
	public title = "My Referals";
	public itemsTotal;
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
	public referalvalue:[];
	public start = 0;

	constructor(public _activateroute: ActivatedRoute,
		private api: service.ApiService,
		private tokenExpService: service.TokenExpiryService,

	) { }
	ngOnInit() {
		this.tabledata['start'] = 0;
		this.tabledata['length'] = 50;
		this.loadData();
		$('#loading-wrapper').show();
	}

	public showFilter() {
		$('#loading-wrapper').show();
		this.tabledata['fromdate'] = new DatePipe('en-US').transform(this.from_date, 'dd/MM/yyyy');
		this.tabledata['todate'] = new DatePipe('en-US').transform(this.to_date, 'dd/MM/yyyy');
		this.tabledata['package'] = this.packageStatus;

		this.page = 1;

		this.loadData();
	}

	public loadData() {
		this.api.get('/secure/referalnew?start=' + this.tabledata['start'] + '&length=' + this.tabledata['length']).subscribe(data => {
			this.tabledata['records'] = '';
			let rec = [];
			if ((data.status == 1) || (data.status == 'success')) {
				this.referalvalue = data;
				$('#loading-wrapper').hide();
				this.tableview['failmessage'] = '';
				this.tabledata['recordsTotal'] = data.recordsTotal;
				this.tabledata['headers'] = Object.keys(data.data[0]);
				for (let i = 0; i < data.data.length; i++) {
					rec.push(Object.values(data.data[i]));
				}
				this.tabledata['records'] = rec;
				this.tableview['success'] = this.tabledata;
				console.log(this.tabledata['records'])
			}
			else if ((data.status == 0) || (data.status == 'fail')) {
				$('#loading-wrapper').hide();
				this.tabledata['recordsTotal'] = 0;
				this.tableview['failmessage'] = 'No Records Found';
			}
		});
	}

	public onPageChange(event) {
		this.start = (event * 50) - 50;
		this.tabledata['start'] = this.start;
		this.loadData();
	}

	public getPackList(event) {
		this.packageStatus = event;
	}

}



// ************my Downline************

@Component({
	selector: 'downline',
	templateUrl: './my-downline.component.html',
	encapsulation: ViewEncapsulation.None
})
export class MyDownlineComponent implements OnInit {

	public data: any;
	public keys: any;
	public page: number = 1;
	public start = 0;
	public levelno = 0;
	public itemsTotal;
	public msg;
	public itemid;
	public searchForm: FormGroup;
	public packageData;
	public bodydata = {};
	public arraylevel = [];
	public referalAllvalue:[];


	constructor(public _activateroute: ActivatedRoute,
		private api: service.ApiService,
		private tokenExpService: service.TokenExpiryService,
		private formBuilder: FormBuilder,
		public router: Router
	) { }

	ngOnInit() {
		for(let i=1;i<51; i++){
			this.arraylevel.push(i);
		}
		// console.log(this.arraylevel)

		this.searchForm = this.formBuilder.group({
			level: [0],
			loginid: [''],
			fromdate:[''],
			todate:[''],
			// captcharesponse: ['']
		});
		this.bodydata['start'] = this.start;
		this.bodydata['length'] = '50';
		this.bodydata['levelno'] = this.levelno;
		// this.bodydata['itemid'] = 0;
		this.bodydata['loginid'] = '';
		this.bodydata['fromdate'] = '';
		this.bodydata['todate'] = '';
		this.data = [];
		this.loadDataReferal(this.bodydata);
		this.api.get('/secure/getallpackages').subscribe(data => {
			this.packageData = data.data;
		})
	}

	loadDataReferal(bodydata) {
		this.data = [];
		this.api.post('/secure/referal-all', bodydata).subscribe(data => {
			console.log(data);
			if (data.status == 1) {
				this.referalAllvalue = data;
				this.data = data.data;
				this.itemsTotal = data.totalrows;
				// console.log(this.itemsTotal);
				this.keys = Object.keys(this.data[0]);
				$('#global-loader').hide();
				this.msg = '';
			} else {
				this.data.length = 0;
				this.msg = 'No Record Found!';
				$('#global-loader').hide();
			}
		}, err => {
			// this.tokenExpService.isTokenValid();
		});
	}
	public onPageChange(event) {
		this.start = (event * 50) - 50;
		this.bodydata['start'] = this.start;
		this.loadDataReferal(this.bodydata);
		// this.bodydata['levelno'] = this.levelno;
	}
	serch() {
		this.bodydata['start'] = 0;
		this.bodydata['levelno'] = this.searchForm.value.level;
		this.bodydata['loginid'] = this.searchForm.value.loginid;
		this.bodydata['fromdate'] = this.searchForm.value.fromdate;
		this.bodydata['todate'] = this.searchForm.value.todate;
		// this.bodydata['itemid'] = this.searchForm.value.itemid;
		console.log(this.searchForm.value)
		this.loadDataReferal(this.bodydata);
	}


}

