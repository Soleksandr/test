import { Component, OnInit, Input } from '@angular/core';

import { Hero } from '../hero';

interface H {
  ids: string[];
}

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: string;

  constructor() { }

  ngOnInit() {
  }

}
