import { Component, OnInit } from '@angular/core';

import { PokeapiService } from './../../services/pokeapi.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  nameFilter = '';
  selectedPkm = null;

  get pokemonList() {
    return this.pokeapi.pokeList.filter(pokemon => {
      return pokemon.name.toLowerCase().indexOf(this.nameFilter.toLowerCase()) !== -1;
    })
  }

  get pkmSprite(){
    const number = ('000' + this.selectedPkm.number).slice(-3);
    return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${number}.png`;
  }

  constructor(
    private pokeapi: PokeapiService
  ) { }

  ngOnInit(): void {
    this.pokeapi.listAll();
  }

  selectPokemon(pkm){
    this.selectedPkm = pkm;
  }

}
