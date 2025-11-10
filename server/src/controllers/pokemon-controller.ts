import { Request, Response, NextFunction } from 'express';
import { CollectionRequest } from '../types';
import env from '../config/env';
import { PokemonApi, PokemonListResponse } from '../models';
import { filterCollection, mapNamedApiCollectionToPokemon, mapNamedApiToPokemon } from '../utils';

export const searchPokemons = async (req: CollectionRequest, res: Response, next: NextFunction) => {
  try {
    const response = await fetch(`${env.pokemonApiUrl}/pokemon?limit=2000`);
    const pokemonListResponse = (await response.json()) as PokemonListResponse;

    const { pokemonCollection, pageCount } = filterCollection({ body: req.body, results: pokemonListResponse.results });

    if (!pokemonCollection.length) {
      res.status(404).json({ message: 'No pokemons found.' });
      return;
    }

    const pokemons = await mapNamedApiCollectionToPokemon(pokemonCollection);

    res.status(200).json({ data: pokemons, pageCount });
  } catch (error) {
    next(error);
  }
};

export const getPokemonById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;

    const response = await fetch(`${env.pokemonApiUrl}/pokemon/${id}`);

    if (response.status === 404) {
      res.status(404).json({ message: 'No pokemon found.' });
      return;
    }

    const pokemonApi = (await response.json()) as PokemonApi;

    const pokemon = mapNamedApiToPokemon(pokemonApi);

    res.status(200).json(pokemon);
  } catch (error) {
    next(error);
  }
};
