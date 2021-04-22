import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscriber } from 'rxjs';


interface PokeListResponse{
  // created: string, 
  // modified: string, 
  // name: string, 
  // pokemon: any[], 
  // resource_uri: string
  count: number,
next: string,
previous: null,
results: any[],
name: string,
url: string
}


@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  // private url = '//dev.treinaweb.com.br/pokeapi/';
  private url = 'https://pokeapi.co/api/v2'
  pokeList = [
  ]
  constructor(
    private http: HttpClient
  ) { }

listAll(){
  this.http.get<PokeListResponse>(`${this.url}/pokemon?offset=1000&limit=200`)
  .subscribe(
    response => {
      response.results.forEach(results => {
        results.number = this.getNumberFromUrl(results.url);
      })
      this.pokeList = this.sortPokemon(response.results).filter(results => results.number < 2000)

      // response.pokemon.forEach(pokemon => {
      //   pokemon.number = this.getNumberFromUrl(pokemon.resource_uri);
      // })
      // this.pokeList = this.sortPokemon(response.pokemon).filter(pokemon => pokemon.number < 1000)
    }
  )
}

private getNumberFromUrl(url){
  return parseInt(url.replace(/.*\/(\d+)\/$/, '$1'));
}

sortPokemon(pokemonList){
  return pokemonList.sort((a,b)=> {
    return (a.number > b.number ? 1 : -1);
  })
}

}
