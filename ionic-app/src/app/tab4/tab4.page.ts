import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  isOptionShow: boolean = false;
  isOptionQuizShow: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.isOptionShow = false;
    console.log('Page loaded');
  }

  showOption(): boolean {
    return this.isOptionShow ? this.isOptionShow = false : this.isOptionShow = true;
  }
  showQuizOption(): boolean {
    return this.isOptionQuizShow ? this.isOptionQuizShow = false : this.isOptionQuizShow = true;
  }

  generateRandomNumber(): number {
    return Math.floor(Math.random() * 100) + 1;
  }

  generateRouterLink(): string {
    const randomNumber = this.generateRandomNumber();
    console.log(randomNumber);
    return '/play-country/' + randomNumber;
  }
}
