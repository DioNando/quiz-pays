import { Component, OnInit } from '@angular/core';
import { PartieService } from '../services/partie.service';
import { PartieInterface } from '../interfaces/partie.interface';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  parties: PartieInterface[] = [];
  topParties: PartieInterface[] = [];
  public loaded = false;

  constructor(private partieService: PartieService) {}

  ngOnInit(): void {
    this.refreshData();
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.refreshData();
      event.target.complete();
    }, 2000);
  }

  refreshData(): void {
    this.partieService.getData().subscribe((res) => {
      if (res) {
        this.parties = Object.values(res);
        this.parties = this.parties.sort((a, b) => b.score - a.score);
        this.topParties = this.parties.slice(0, 10);
        this.loaded = true;
      } else {
        console.error("Les données n'ont pas été chargée correctement");
        this.parties = [];
      }
    });
  }
}
