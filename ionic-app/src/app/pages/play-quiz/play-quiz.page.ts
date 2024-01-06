import { Component, inject, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
import { QuestionService } from '../../services/question.service';
import { QuestionInterface } from '../../interfaces/question.interface';
import { PartieService } from '../../services/partie.service';
import { PartieInterface } from '../../interfaces/partie.interface';

@Component({
  selector: 'app-play-quiz',
  templateUrl: './play-quiz.page.html',
  styleUrls: ['./play-quiz.page.scss'],
})
export class PlayQuizPage implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private platform = inject(Platform);
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
    private partieService: PartieService,
    public alertController: AlertController
  ) {}

  ngOnInit(): void {
    const numberOfQuestions = this.activatedRoute.snapshot.paramMap.get('number') as string;
    this.questionService.getData(parseInt(numberOfQuestions)).subscribe((res) => {
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
    const numberOfQuestions = this.activatedRoute.snapshot.paramMap.get('number') as string;
    this.loaded = false;
    this.questionService.getData(parseInt(numberOfQuestions)).subscribe((res) => {
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

  isClicked = false;

  animateOnClick(question: QuestionInterface, answer: string): void {
    this.isClicked = true;
    if (question.correct_answer == answer) {
      console.log('Correct');
    } else {
      console.log('Incorrect');
    }
  }

  getRndInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getBackButtonText() {
    const isIos = this.platform.is('ios');
    return isIos ? 'Exit' : '';
  }

  async afficherAlerteAvecInput() {
    const alert = await this.alertController.create({
      header: 'Enter your pseudo',
      inputs: [
        {
          name: 'pseudo',
          type: 'text',
          placeholder: 'Pseudo',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Annulé');
          },
        },
        {
          text: 'Save score',
          handler: (data) => {
            this.saveScore({
              pseudo: data.pseudo.trim(),
              score: this.score,
            });
          },
        },
      ],
    });
    await alert.present();
  }
}
