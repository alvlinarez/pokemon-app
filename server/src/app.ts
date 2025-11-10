import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errorHandler, notFoundHandler } from './middlewares';
import morgan from 'morgan';
import { connectionDB } from './config/db';
import cookieParser from 'cookie-parser';
import pokemonRoutes from './routes/pokemon-routes';
import authRoutes from './routes/auth-routes';
import env from './config/env';
import dotenv from 'dotenv';

dotenv.config();

connectionDB();

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use(helmet());
app.use(
  cors({
    origin: env.clientUrl,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }),
);
app.use(cookieParser());

// Routes
app.use('/auth', authRoutes);
app.use('/pokemons', pokemonRoutes);

// Global error handler
app.use(errorHandler);

app.use(notFoundHandler);

export default app;
