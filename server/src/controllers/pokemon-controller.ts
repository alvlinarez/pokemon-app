import { Request, Response, NextFunction } from 'express';
import { CollectionRequest } from '../types';
import config from '../config/config';
import { Pokemon, PokemonListResponse } from '../models';
import { filterCollection } from '../util';

export const searchPokemons = async (req: CollectionRequest, res: Response, next: NextFunction) => {
  try {
    const response = await fetch(`${config.pokemonApiUrl}/pokemon?limit=2000`);
    const pokemonListResponse = (await response.json()) as PokemonListResponse;

    const pokemons = filterCollection({ body: req.body, results: pokemonListResponse.results });

    if (!pokemons.length) {
      res.status(404).json({ message: 'No pokemon found.' });
      return;
    }

    res.status(200).json(pokemons);
  } catch (error) {
    next(error);
  }
};

export const getPokemonById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;

    const response = await fetch(`${config.pokemonApiUrl}/pokemon/${id}`);

    if (response.status === 404) {
      res.status(404).json({ message: 'No pokemon found.' });
      return;
    }
    const pokemon = (await response.json()) as Pokemon;

    res.status(200).json(pokemon);
  } catch (error) {
    next(error);
  }
};
