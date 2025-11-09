import express from 'express';
import itemRoutes from './routes/item-routes';
import { errorHandler } from './middlewares';
import morgan from 'morgan';

const app = express();

app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/items', itemRoutes);

// Global error handler
app.use(errorHandler);

export default app;
