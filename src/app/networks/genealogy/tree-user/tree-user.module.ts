import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TreeUserComponent } from './tree-user.component';

@NgModule({
    imports: [ 
        RouterModule,
        CommonModule 
    ],
    declarations: [ TreeUserComponent ],
    exports: [ TreeUserComponent ]
})

export class TreeUserModule {}