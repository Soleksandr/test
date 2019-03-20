import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  selectedHero: Hero = null;

  heroes: Hero[];

  onHeroClick = (hero: Hero) => {
    console.log('hero = ', hero);
    this.selectedHero = hero;
  }

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.heroService.fetchHeroes().subscribe(heroes => this.heroes = heroes);
  }

}
