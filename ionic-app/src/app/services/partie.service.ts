import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PartieInterface } from '../interfaces/partie.interface';

@Injectable({
  providedIn: 'root',
})
export class PartieService {
  // private apiUrl = 'http://192.168.0.110:8000/api/';
  private apiUrl = 'https://quiz-pays-cc1e5-default-rtdb.europe-west1.firebasedatabase.app//parties.json';

  constructor(private http: HttpClient) {}

  getData(): Observable<PartieInterface[]> {
    return this.http.get<PartieInterface[]>(this.apiUrl);
  }

  postData(data: PartieInterface): Observable<PartieInterface[]> {
    return this.http.post<PartieInterface[]>(this.apiUrl, data);
  }
}
