import { Component } from '@angular/core';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent {
  public heroForm=new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl<string>(''),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl<string>(''),
    first_appearance: new FormControl<string>(''),
    characters: new FormControl<string>(''),
    alt_img: new FormControl<string>('')
  });

  public titulo:string='';

  public publishers=[
    {id:'DC comics', desc: 'DC - comics'},
    {id:'Marvel comics', desc: 'Marvel - comics'},
  ]

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.router.url.includes('edit')){
      this.titulo = 'Crear Heroe'
      return;
    }

    this.activatedRoute.params
    .pipe(
      switchMap(({ id }) => this.heroesService.getHeroById(id) )
    ).subscribe(hero => {
      if (!hero) return this.router.navigate(['/heroes']);
      this.titulo = 'Editar '+hero.superhero
      this.heroForm.reset(hero)
      return;
    })
  }



  get currentHero():Hero{
    const hero= this.heroForm.value as Hero;
    return hero;
  }

  onSubmit():void{
    if (this.heroForm.invalid) return;

    if(this.currentHero.id){
      this.heroesService.updateHero(this.currentHero)
      .subscribe(hero=>{
        //TODO: Mostrar snackbar
      })
    }

    this.heroesService.addHero(this.currentHero)
    .subscribe(hero=>{
      //TODO: Mostrar snackbar y navegar a /heroes/edit/hero.id
    })

    // console.log({
    //   formIsValid: this.heroForm.valid,
    //   value: this.heroForm.value
    // });

  }
}
