/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LevelWalletComponent } from './level-wallet.component';

describe('LevelWalletComponent', () => {
  let component: LevelWalletComponent;
  let fixture: ComponentFixture<LevelWalletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LevelWalletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
