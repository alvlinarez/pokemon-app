import express from 'express';
import { errorHandler } from './middlewares';
import morgan from 'morgan';
import pokemonRoutes from './routes/pokemon-routes';

const app = express();

app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/pokemons', pokemonRoutes);

// Global error handler
app.use(errorHandler);

export default app;
