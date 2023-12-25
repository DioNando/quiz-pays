import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
import { CountryService } from 'src/app/services/country.service';
import { CountryInterface } from 'src/app/interfaces/country.interface';
import { PartieService } from '../../services/partie.service';
import { PartieInterface } from '../../interfaces/partie.interface';
import { map } from 'rxjs';

@Component({
  selector: 'app-play-country',
  templateUrl: './play-country.page.html',
  styleUrls: ['./play-country.page.scss'],
})
export class PlayCountryPage implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private platform = inject(Platform);

  countries: CountryInterface[] = [];
  dataCountries: any;
  public loaded = false;
  stateCapital:boolean = false;
  stateFlag:boolean = false;

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.countryService.getData().subscribe((res) => {
      if (Array.isArray(res)) {
        this.countries = res.sort(() => Math.random() - 0.5);
        this.dataCountries = this.countries.map((objet: CountryInterface) => {
          return {
            country: objet.name.common,
            capital: objet.capital,
            flag: objet.flags.svg,
            ccn3: objet.ccn3
          };
        });

        this.loaded = !this.loaded;
        console.table(this.dataCountries);
      } else {
        console.error('Les données ne sont pas un tableau.');
      }
    });
  }

  getBackButtonText() {
    const isIos = this.platform.is('ios');
    return isIos ? 'Back' : '';
  }


  playCapital(): void {
    this.stateCapital = true;
    this.stateFlag = false;
  }
  playFlag(): void {
    this.stateFlag = true;
    this.stateCapital = false;
  }

}
