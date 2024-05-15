import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response-interface';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';


@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios;

  constructor(
    private pokemonService: PokemonService
  ) { }

  async executeSeed () {

    await this.pokemonService.removeAll();

    const { data } = await this.axios.get<PokeResponse>( 'https://pokeapi.co/api/v2/pokemon?limit=650' );

    const pokemonsToInsert = [];
    data.results.forEach( ( { name, url } ) => {
      const segments = url.split( '/' );
      const no = +segments.at( -2 );
      //console.log( { no, name } );
      pokemonsToInsert.push( { name, no } );
    } );

    return await this.pokemonService.createMany( pokemonsToInsert );
  }
}
