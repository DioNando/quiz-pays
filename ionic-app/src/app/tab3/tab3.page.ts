import { Component, OnInit } from '@angular/core';
import { PartieService } from '../services/partie.service';
import { PartieInterface } from '../interfaces/partie.interface';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  parties: PartieInterface[] = [];
  public loaded = false;

  constructor(private partieService: PartieService) {}

  ngOnInit(): void {
    this.partieService.getData().subscribe((res) => {
      if (Array.isArray(res)) {
        this.parties = res;
        this.loaded = !this.loaded;
      } else {
        console.error('Les données ne sont pas un tableau.');
      }
    });
  }

  refreshData(): void {
    this.partieService.getData().subscribe((res) => {
      this.parties = res;
    });
  }
}
