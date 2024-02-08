import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { switchMap } from 'rxjs';

import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

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
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
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
        this.showSnackbar(`Heroe ${hero.superhero} actualizado`);
      })
      return
    }

    this.heroesService.addHero(this.currentHero)
    .subscribe(hero=>{
      this.showSnackbar(`Heroe ${hero.superhero} creado`);
    })
  }

  private showSnackbar(message:string): void{
    this.snackbar.open(message, 'OK', {
      duration:3000
    })
  }

  public onDeleteHero(){
    if(!this.currentHero.id) throw Error('Hero id is required')

    const dialogRef= this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      console.log('Deleted');
      this.heroesService.deleteHeroById(this.currentHero.id);
      this.router.navigate(['heroes/list'])
    })


  }
}
