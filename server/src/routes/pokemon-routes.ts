import { Router } from 'express';
import { getPokemonById, searchPokemons } from '../controllers';
import { authenticate } from '../middlewares';

const router = Router();

router.use(authenticate);

router.post('/', searchPokemons);
router.get('/:id', getPokemonById);

export default router;
