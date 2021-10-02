import { Injectable } from '@angular/core';

@Injectable()

export class CommonService{
	public pic: string;
	public package_id: number = 0;
	public package_name: string = "";
	public memberid:string="";
	public sel:boolean=true;
	public productotal:number; 
	public shoppinbaglist: any =[];
	public allsecuremedata:any ={};
	public issq: boolean;
}