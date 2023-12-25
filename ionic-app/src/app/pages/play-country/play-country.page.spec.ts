import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayCountryPage } from './play-country.page';

describe('PlayCountryPage', () => {
  let component: PlayCountryPage;
  let fixture: ComponentFixture<PlayCountryPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PlayCountryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
