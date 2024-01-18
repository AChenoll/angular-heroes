import { Observable } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from './../../services/heroes.service';
import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: [
  ]
})
export class ListPageComponent implements OnInit {

  heroes: Hero[]=[];

  constructor(private heroesService: HeroesService ){}

  ngOnInit(): void{
    this.getHeroes();
  }

  getHeroes():void{
    this.heroesService.getHeroes().subscribe(heroes=>this.heroes=heroes);
  }

}
