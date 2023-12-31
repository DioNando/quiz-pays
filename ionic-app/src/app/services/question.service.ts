import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { QuestionInterface } from '../interfaces/question.interface';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  // private apiUrl = 'https://opentdb.com/api.php?amount=10';
  private apiUrl = 'https://opentdb.com/api.php?amount=15&difficulty=easy';

  private apiNumber: number = 10;
  private apiCategory: string = '';
  private apiDifficulty: string = '';
  private apiType: string = '';

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      delay(5000),
      map((response) => {
        if (response.results) {
          return response.results.map((question: QuestionInterface) => {
            return this.mergeAnswers(question);
          });
        } else {
          return [];
        }
      })
    );
  }

  private mergeAnswers(question: QuestionInterface): QuestionInterface {
    const mergedAnswers = [
      question.correct_answer,
      ...question.incorrect_answers,
    ];
    return {
      ...question,
      mergedAnswers: this.shuffleArray(mergedAnswers),
    };
  }

  private shuffleArray(array: any[]): any[] {
    let currentIndex = array.length;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }


}
