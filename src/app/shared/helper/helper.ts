import { Component } from '@angular/core';
import { CommonApiFunctionService } from '../service/commonapifunctions.service';
// import { TableData } from '../table/table.component';

export class MyHelperLibrary{	
public records = {};

public loadTableData(data?: any, itemTotal?: any, status?: any, itemPerPage: any = 50){
	if((status=='success') || (status==1)){
		let rec = [];
		let head = [];
		rec	= data;
		 head = Object.keys(data[0]);
		this.records['itemsTotal'] = itemTotal;
		this.records['records'] = rec;
		this.records['header'] = head;
		this.records['itemsPerPage']= 50;
	}else if((status=='fail') || (status==0)){
		this.records['message']= 'No Record Found';
		}

		return this.records;
	}
}