import { PokemonPage } from './pokemon-page';
import { useParams } from 'react-router';
import { usePokemonById } from '../../queries';

export function PokemonResolver() {
  const { id } = useParams<{ id: string }>();
  const { data } = usePokemonById({ id: id ?? '' });

  if (!data) return null;

  return <PokemonPage pokemon={data} />;
}
