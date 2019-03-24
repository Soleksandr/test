import { Component, OnInit } from "@angular/core";

import { Hero } from "../hero";
import { Subject, Observable, of } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import { HeroService } from "../hero.service";

@Component({
  selector: "app-search-hero",
  templateUrl: "./search-hero.component.html",
  styleUrls: ["./search-hero.component.scss"]
})
export class SearchHeroComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  hero$: Observable<string>;

  private searchByName = new Subject<string>();

  constructor(private heroService: HeroService) {}

  ngOnInit() {
    this.heroes$ = this.searchByName.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((name: string) => this.heroService.searchByName(name))
    );

    this.hero$ = this.searchByName.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((name: string) => of(name))
    );
  }

  search(name: string): void {
    this.searchByName.next(name);
  }
}
