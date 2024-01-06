import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { CountryService } from 'src/app/services/country.service';
import {
  CountryInterface,
  CountryQuestionInterface,
} from 'src/app/interfaces/country.interface';
import { PartieService } from '../../services/partie.service';
import { PartieInterface } from '../../interfaces/partie.interface';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-play-country',
  templateUrl: './play-country.page.html',
  styleUrls: ['./play-country.page.scss'],
})
export class PlayCountryPage implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private platform = inject(Platform);

  countries: CountryInterface[] = [];
  questionCountries: CountryQuestionInterface[] = [];
  public loaded = false;
  currentIndex: number = 0;
  score: number = 0;
  showScore: boolean = false;
  isAnswered: boolean = false;
  stateSaveScore: boolean = false;
  selectedAnswer: string = '';

  constructor(
    private countryService: CountryService,
    private partieService: PartieService,
    public alertController: AlertController
  ) {}

  ngOnInit(): void {
    this.countryService.getData().subscribe((res) => {
      const numberOfQuestions = this.activatedRoute.snapshot.paramMap.get('number') as string;
      if (Array.isArray(res)) {
        this.countries = res;
        this.questionCountries = this.randomCountries(this.countries, parseInt(numberOfQuestions));
        console.table(this.questionCountries);
        this.loaded = !this.loaded;
      } else {
        console.error('Les données ne sont pas un tableau.');
      }
    });
  }

  randomCountries(
    countries: CountryInterface[],
    numberOfCountries: number
  ): CountryQuestionInterface[] {
    if (numberOfCountries <= countries.length) {
      const shuffledCountries = countries.slice();
      shuffledCountries.sort(() => Math.random() - 0.5);
      const selectedCountries = shuffledCountries.slice(0, numberOfCountries);

      const processedCountries = selectedCountries.map(
        (country: CountryInterface) => {
          return {
            name: country.name,
            cca2: country.cca2,
            ccn3: country.ccn3,
            cca3: country.cca3,
            type: Math.floor(Math.random() * 2) + 1,
            capital: country.capital,
            flag: country.flags.svg,
            mergedAnswers: {
              capitals: this.mergeAnswers(
                country.capital,
                'capital',
                countries
              ),
              flags: this.mergeAnswers(country.flags.svg, 'flag', countries),
            },
          };
        }
      );

      return processedCountries;
    } else {
      console.error(
        'Le nombre demandé est supérieur à la longueur du tableau.'
      );
      return [];
    }
  }

  private mergeAnswers(
    correct_answer: string,
    type: string,
    countries: CountryInterface[]
  ): any[] {
    const mergedAnswers = [];
    switch (type) {
      case 'capital':
        // Filtrer les capitales non nulles
        const capitals = countries
          .filter((country) => country.capital)
          .map((country) => country.capital);

        // Sélectionner 3 capitales au hasard
        const randomCapitals = this.getRandomElements(
          capitals,
          3,
          correct_answer
        );
        mergedAnswers.push(correct_answer, ...randomCapitals);
        break;

      case 'flag':
        // Filtrer les drapeaux non nuls
        const flags = countries
          .filter((country) => country.flags && country.flags.svg)
          .map((country) => country.flags.svg);

        // Sélectionner 3 drapeaux au hasard
        const randomFlags = this.getRandomElements(flags, 3, correct_answer);
        mergedAnswers.push(correct_answer, ...randomFlags);
        break;

      default:
        break;
    }

    return this.shuffleArray(mergedAnswers);
  }

  private shuffleArray(array: any[]): any[] {
    return array.sort(() => Math.random() - 0.5);
  }

  private getRandomElements(
    array: any[],
    numberOfElements: number,
    excludeElement: any
  ): any[] {
    // Filtrer l'élément à exclure du tableau
    const filteredArray = array.filter((item) => item !== excludeElement);

    // Sélectionner le nombre spécifié d'éléments au hasard
    const shuffledArray = filteredArray.slice().sort(() => Math.random() - 0.5);
    return shuffledArray.slice(0, numberOfElements);
  }

  getBackButtonText() {
    const isIos = this.platform.is('ios');
    return isIos ? 'Back' : '';
  }

  onNext(): void {
    if (this.currentIndex < this.questionCountries.length - 1) {
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

  selectAnswer(question: CountryQuestionInterface, answer: string): void {
    if (!this.isAnswered) {
      this.isAnswered = true;

      if (question.capital === answer || question.flag === answer) {
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

  refreshData(): void {
    this.loaded = false;
    this.questionCountries = this.randomCountries(this.countries, 10);
    this.currentIndex = 0;
    this.isAnswered = false;
    this.selectedAnswer = '';
    this.score = 0;
    this.showScore = false;
    this.stateSaveScore = false;
    this.loaded = true;
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

  getRndInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
