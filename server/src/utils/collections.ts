import { CollectionBody } from '../types';
import { NamedAPIResource, Pokemon, PokemonApi } from '../models';
import { PAGE, PAGE_SIZE } from '../constants/collections';

interface FilterCollectionProps {
  body?: Partial<CollectionBody>;
  results: NamedAPIResource[];
}
export function filterCollection({ body, results }: FilterCollectionProps): { pokemonCollection: NamedAPIResource[]; pageCount: number } {
  let res: NamedAPIResource[];

  const { page, pageSize, sortBy, sortDescending, filterBy } = validateBody(body);

  res = filterBy
    ? results.filter((r) => {
        const id = r.url.split('/').pop();
        return (isNaN(Number(filterBy)) && r.name.includes(filterBy.toLowerCase())) || id === filterBy;
      })
    : results;

  if (sortBy) {
    if (sortBy === 'order') {
      res = res.sort((a, b) => {
        const orderA = Number(a.url.split('/').pop());
        const orderB = Number(b.url.split('/').pop());
        return sortDescending ? orderB - orderA : orderA - orderB;
      });
    }

    if (sortBy === 'name') {
      res = res.sort((a, b) => (sortDescending ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name)));
    }
  }

  const pageCount = filterBy ? res.length : Math.ceil(res.length / pageSize);

  // get paginated results
  res = filterBy ? res : res.slice(page * pageSize, page * pageSize + pageSize);

  return { pokemonCollection: res, pageCount };
}

function validateBody(body?: Partial<CollectionBody>) {
  let page = PAGE;
  let pageSize = PAGE_SIZE;
  let sortBy;
  const sortDescending = Boolean(body?.sortDescending);
  const filterBy = body?.filterBy || '';

  if (body?.page) {
    page = !isNaN(body?.page) ? Number(body?.page) : PAGE;
  }

  if (body?.pageSize) {
    pageSize = !isNaN(body?.pageSize) ? Number(body?.pageSize) : PAGE_SIZE;
  }

  if (body?.sortBy === 'name' || body?.sortBy === 'order') {
    sortBy = body?.sortBy;
  }
  return {
    page,
    pageSize,
    sortBy,
    sortDescending,
    filterBy,
  };
}

export async function mapNamedApiCollectionToPokemon(namedAPIResources: NamedAPIResource[]) {
  const res: Pokemon[] = [];

  for (const item of namedAPIResources) {
    const response = await fetch(item.url);
    const pokemonListResponse = (await response.json()) as PokemonApi;

    const pokemon: Pokemon = {
      id: pokemonListResponse.id,
      name: pokemonListResponse.name,
      baseExperience: pokemonListResponse.base_experience,
      height: pokemonListResponse.height / 10,
      weight: pokemonListResponse.weight / 10,
      order: pokemonListResponse.order,
      abilities: pokemonListResponse.abilities,
      species: pokemonListResponse.species,
      stats: pokemonListResponse.stats,
      types: pokemonListResponse.types,
      imageUrl: pokemonListResponse.sprites.other?.dream_world?.front_default || pokemonListResponse.sprites.other?.home?.front_default || '',
    };

    res.push(pokemon);
  }

  return res;
}

export function mapNamedApiToPokemon(pokemonApi: PokemonApi) {
  return {
    id: pokemonApi.id,
    name: pokemonApi.name,
    baseExperience: pokemonApi.base_experience,
    height: pokemonApi.height / 10,
    weight: pokemonApi.weight / 10,
    order: pokemonApi.order,
    abilities: pokemonApi.abilities,
    species: pokemonApi.species,
    stats: pokemonApi.stats,
    types: pokemonApi.types,
    imageUrl: pokemonApi.sprites.other?.dream_world?.front_default || pokemonApi.sprites.other?.home?.front_default || '',
  } as Pokemon;
}
