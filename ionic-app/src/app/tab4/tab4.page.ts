import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../services/question.service';
import { QuestionInterface } from '../interfaces/question.interface';
import { PartieService } from '../services/partie.service';
import { PartieInterface } from '../interfaces/partie.interface';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  questions: QuestionInterface[] = [];
  public loaded = false;
  currentIndex: number = 0;
  score: number = 0;
  showScore: boolean = false;
  isAnswered: boolean = false;
  stateSaveScore: boolean = false;
  selectedAnswer: string = '';

  constructor(
    private questionService: QuestionService,
    private partieService: PartieService
  ) {}

  ngOnInit(): void {
    this.questionService.getData().subscribe((res) => {
      if (res) {
        this.questions = res;
        this.showScore = false;
        this.loaded = true;
      } else {
        console.error('Les données ne sont pas au format attendu.');
      }
    });
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.refreshData();
      event.target.complete();
    }, 2000);
  }

  refreshData(): void {
    this.loaded = false;
    this.questionService.getData().subscribe((res) => {
      this.questions = res;
      this.currentIndex = 0;
      this.isAnswered = false;
      this.selectedAnswer = '';
      this.score = 0;
      this.showScore = false;
      this.stateSaveScore = false;
      this.loaded = true;
    });
  }

  onNext(): void {
    if (this.currentIndex < this.questions.length - 1) {
      this.isAnswered = false;
      this.selectedAnswer = '';
      this.currentIndex++;
    }
  }

  onPrevious(): void {
    if (this.currentIndex > 0) {
      this.isAnswered = false;
      this.currentIndex--;
    }
  }

  selectAnswer(question: QuestionInterface, answer: string): void {
    if (!this.isAnswered) {
      this.isAnswered = true;
      console.log(question);
      console.log('Your answer: ' + answer);

      if (question.correct_answer === answer) {
        this.selectedAnswer = answer;
        this.score += 10;
        console.log('Correct');
      } else {
        this.selectedAnswer = '';
        console.log('Incorrect');
      }
    }
  }

  viewScore(): number {
    this.showScore = true;
    return this.score;
  }

  saveScore(partie: PartieInterface): void {
    this.partieService.postData(partie).subscribe(
      (res) => {
        console.log('Réponse:', res);
        this.stateSaveScore = true;
      },
      (error) => {
        console.error('Erreur:', error);
      }
    );
  }

  animateOnClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    target.classList.add('clicked');
  }

  //generate random number
  getRndInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
