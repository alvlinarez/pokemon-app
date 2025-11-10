import dotenv from 'dotenv';

dotenv.config();

interface IConfig {
  port: number;
  nodeEnv: string;
  pokemonApiUrl: string;
  clientUrl: string;
  dbUri: string;
  jwtSecret: string;
}

const env: IConfig = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  dbUri: process.env.DB_URI || 'mongodb://localhost:27017',
  pokemonApiUrl: process.env.POKEMON_API_URL || 'https://pokeapi.co/api/v2',
  jwtSecret: process.env.JWT_SECRET || '',
};

export default env;
