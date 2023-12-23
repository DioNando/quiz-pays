import { Component, OnInit } from '@angular/core';
import { CountryService } from '../services/country.service';
import { CountryInterface } from '../interfaces/country.interface';
import { map } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  countries: CountryInterface[] = [];
  public loaded = false;

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.countryService.getData().subscribe((res) => {
      if (Array.isArray(res)) {
        this.countries = res.sort(() => Math.random() - 0.5);
        this.loaded = !this.loaded;
        console.table(this.countries);
      } else {
        console.error('Les données ne sont pas un tableau.');
      }
    });
  }
}
