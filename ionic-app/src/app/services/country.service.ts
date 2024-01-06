import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CountryInterface } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private apiUrl = 'https://restcountries.com/v3.1/';

  constructor(private http: HttpClient) {}

  getData(): Observable<CountryInterface[]> {
    return this.http.get<CountryInterface[]>(this.apiUrl + 'all');
  }

  getDataCountry(id:string): Observable<CountryInterface[]> {
    return this.http.get<CountryInterface[]>(this.apiUrl + 'alpha/' + id);
  }

}
