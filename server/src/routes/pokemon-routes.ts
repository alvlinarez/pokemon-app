import { Router } from 'express';
import { getPokemonById, searchPokemons } from '../controllers';

const router = Router();

router.post('/', searchPokemons);
router.get('/:id', getPokemonById);

export default router;
