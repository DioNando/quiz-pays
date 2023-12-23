import { Component, OnInit } from '@angular/core';
import { EmojiService } from '../services/emoji.service';
import { EmojiInterface } from '../interfaces/emoji.interface';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  emojis: EmojiInterface[] = [];
  selectedEmojis: EmojiInterface[] = [];
  oneEmoji: EmojiInterface | undefined;
  public loaded = false;

  constructor(private emojiService: EmojiService) {}

  ngOnInit(): void {
    this.emojiService.getData().subscribe((res) => {
      if (Array.isArray(res)) {
        this.emojis = res;

        this.oneEmoji = this.getRandomElement(this.emojis);
        this.selectedEmojis = this.getRandomElements(this.emojis, 3);

        this.loaded = !this.loaded;
      } else {
        console.error('Les données ne sont pas un tableau.');
      }
    });
  }

  capitalizeName(unicodeName: string): string {
    const mots = unicodeName.split(' ');
    const motsFormattes = mots.map(
      (mot) => mot.charAt(0).toUpperCase() + mot.slice(1)
    );
    motsFormattes.shift();
    const resultat = motsFormattes.join(' ');
    return resultat;
  }

  piocherEmoji(): void {
    // Sélectionnez un emoji au hasard
    const emojiSelectionne = this.getRandomElement(this.emojis);
    this.oneEmoji = this.getRandomElement(this.emojis);

    // Ajoutez l'emoji sélectionné à la liste des emojis sélectionnés
    this.selectedEmojis.push(emojiSelectionne);
  }

  deleteEmoji(): void {
    // if (this.selectedEmojis.length > 1) {
    this.selectedEmojis.pop();
    // }
  }

  // Fonction pour sélectionner au hasard n éléments dans un tableau
  getRandomElements(array: any[], n: number): any[] {
    const shuffled = array.sort(() => 0.5 - Math.random()); // Mélanger le tableau
    return shuffled.slice(0, n); // Prendre les premiers n éléments
  }

  // Fonction pour sélectionner un élément au hasard dans un tableau
  private getRandomElement(array: any[]): any {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }
}
