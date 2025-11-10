import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errorHandler } from './middlewares';
import morgan from 'morgan';
import pokemonRoutes from './routes/pokemon-routes';

const app = express();

// CORS FIRST (before routes)
app.use(
  cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    // credentials: true, // only if you use cookies/auth headers across origins
  }),
);

// Security headers (optional, but nice)
app.use(helmet());

app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/pokemons', pokemonRoutes);

// Global error handler
app.use(errorHandler);

export default app;
