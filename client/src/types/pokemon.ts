export type SortBy = 'order' | 'name';

export interface Pokemon {
  id: number;
  name: string;
  baseExperience: number;
  height: number;
  weight: number;
  order: number;
  abilities: Ability[];
  species: NamedAPIResource;
  stats: Stat[];
  types: Type[];
  imageUrl: string;
}

export interface Ability {
  ability: NamedAPIResource;
  is_hidden: boolean;
  slot: number;
}

export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: NamedAPIResource;
}

export interface Type {
  slot: number;
  type: NamedAPIResource;
}

export interface PokemonResponse {
  data: Pokemon[];
  pageCount: number;
}
