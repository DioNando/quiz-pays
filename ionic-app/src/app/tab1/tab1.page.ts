import { Component, OnInit } from '@angular/core';
import { CountryService } from '../services/country.service';
import { CountryInterface } from '../interfaces/country.interface';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  countries: CountryInterface[] = [];
  public loaded = false;
  stateCapital:boolean = false;
  stateFlag:boolean = false;

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.countryService.getData().subscribe((res) => {
      if (Array.isArray(res)) {
        this.countries = res.sort(() => Math.random() - 0.5);
        this.loaded = !this.loaded;
      } else {
        console.error('Les données ne sont pas un tableau.');
      }
    });
  }

  showCapital(): void {
    this.stateCapital = true;
    this.stateFlag = false;
  }
  showFlag(): void {
    this.stateFlag = true;
    this.stateCapital = false;
  }
}
