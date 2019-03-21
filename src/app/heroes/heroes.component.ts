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

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.heroService.fetchHeroes().subscribe(heroes => {
      console.log('--heroes--', heroes);
      this.heroes = heroes;
    });
  }

  add(name: string) {
    name = name.trim();

    if (!name) { return; }

    this.heroService.createHero(name)
      .subscribe(hero => {
        console.log('new hero = ', hero);
        this.heroes.push(hero);
      });
  }

}
