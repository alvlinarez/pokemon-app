import dotenv from 'dotenv';

dotenv.config();

interface IConfig {
  port: number;
  nodeEnv: string;
  pokemonApiUrl: string;
}

const config: IConfig = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  pokemonApiUrl: process.env.POKEMON_API_URL || 'https://pokeapi.co/api/v2',
};

export default config;
