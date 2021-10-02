import { Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2'
import { ApiService } from '../service/api/apiservice.service';
import { TokenExpiryService } from '../service/api/tokenExpiry.service';
import { CommonApiFunctionService } from '../service/commonapifunctions.service';
declare const $:any;

export interface TableData {
  header?: string[];
  records?: string[];
  itemsTotal?: any;
  itemsPerPage?: any;
  message?: string;
   otherData?: any;
}

@Component({
	selector: 'app-table',
	templateUrl: './table.component.html'
})
export class TableComponent implements OnInit{
    public page: number = 1;
    public emailFormArray: any = [];
    public isValid : any ;
    public hideElement: boolean = true; 
    @Input() records: TableData; 
    @Input() headingInfo: string;
     @Output()UserClicked = new EventEmitter();
    @Input() flag: string;
    @Output() reciept = new EventEmitter;
    @Output() printBill = new EventEmitter;
    @Output() printUpgradeBill = new EventEmitter;
    @Output() selectedEpin = new EventEmitter;
    public receipt_img:any;
    public print_inv:any;
    
    constructor( public router: Router, public tokenExpService: TokenExpiryService,
      public api: ApiService,public _commonService: CommonApiFunctionService) {
      }

    ngOnInit() {
    }
    onPageChange(e) {
      this.UserClicked.emit(e);
   }
   upgradeEpin(epin, userid){
     var obj = {
       epin: epin,
       id: userid
     }
      this.selectedEpin.emit(obj);
   }

    showReceipt(receipt){
      this.reciept.emit(receipt);
     }
    printInvoice(billid, event){
      if(event == 'repurchase'){
        this.printBill.emit(billid);
      }else{
        this.printUpgradeBill.emit(billid);
      }
      
    }    
}