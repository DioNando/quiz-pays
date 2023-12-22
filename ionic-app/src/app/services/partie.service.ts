import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PartieInterface } from '../interfaces/partie.interface';


@Injectable({
  providedIn: 'root'
})
export class PartieService {

  private apiUrl = 'http://192.168.0.109:8000/api/parties'

  constructor(private http: HttpClient) { }

  getData(): Observable<PartieInterface[]> {
    return this.http.get<PartieInterface[]>(this.apiUrl)
  }
}
