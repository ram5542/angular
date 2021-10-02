/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TransferToFunjoComponent } from './transfer-to-funjo.component';

describe('TransferToFunjoComponent', () => {
  let component: TransferToFunjoComponent;
  let fixture: ComponentFixture<TransferToFunjoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferToFunjoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferToFunjoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
