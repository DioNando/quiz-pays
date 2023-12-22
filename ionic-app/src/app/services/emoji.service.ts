import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmojiInterface } from '../interfaces/emoji.interface';

@Injectable({
  providedIn: 'root',
})
export class EmojiService {
  private apiURL = 'https://emoji-api.com/emojis';
  private apiValue = 'access_key';
  private apiKey = '61b5e4c50140d279d89e1541d34b009f1bab2c6e';

  constructor(private http: HttpClient) {}

  getData(): Observable<EmojiInterface[]> {
    return this.http.get<EmojiInterface[]>(
      this.apiURL + '?' + this.apiValue + '=' + this.apiKey
    );
  }
}
