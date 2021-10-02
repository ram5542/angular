/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TokenBonusComponent } from './token-bonus.component';

describe('TokenBonusComponent', () => {
  let component: TokenBonusComponent;
  let fixture: ComponentFixture<TokenBonusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TokenBonusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenBonusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
