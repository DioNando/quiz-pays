import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
import { CountryService } from '../services/country.service';
import { CountryInterface } from '../interfaces/country.interface';

@Component({
  selector: 'app-view-country',
  templateUrl: './view-country.page.html',
  styleUrls: ['./view-country.page.scss'],
})
export class ViewCountryPage implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private platform = inject(Platform);
  country: CountryInterface | undefined;
  public loaded = false;

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;

    this.countryService.getDataCountry(id).subscribe((res) => {
      if (Array.isArray(res) && res.length > 0) {
        this.country = res[0];
        this.loaded = !this.loaded;
        console.log(this.country);
      } else {
        console.error('Les données ne sont pas un tableau.');
      }
    });
  }

  getBackButtonText() {
    const isIos = this.platform.is('ios');
    return isIos ? 'Countries' : '';
  }
}
