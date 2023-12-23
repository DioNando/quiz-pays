import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../services/question.service';
import { QuestionInterface } from '../interfaces/question.interface';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  questions: QuestionInterface[] = [];
  public loaded = false;
  currentIndex = 0;

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.questionService.getData().subscribe((res) => {
      if (res) {
        this.questions = res;
        this.loaded = true;
      } else {
        console.error('Les données ne sont pas au format attendu.');
      }
    });
  }

  refreshData(): void {
    this.loaded = false;
    this.questionService.getData().subscribe((res) => {
      this.questions = res;
      this.currentIndex = 0;
      this.loaded = true;
    });
  }

  onNext(): void {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
    }
  }

  onPrevious(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }
}
