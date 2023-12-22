import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewCountryPage } from './view-country.page';

describe('ViewCountryPage', () => {
  let component: ViewCountryPage;
  let fixture: ComponentFixture<ViewCountryPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViewCountryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
