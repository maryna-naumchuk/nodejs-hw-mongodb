import dotenv from 'dotenv';

dotenv.config();

export const getEnvVar = (name, defaultValue) => {
  const value = process.env[name];

  if (name) return value;

  if (defaultValue) return defaultValue;

  throw new Error(`Missing: process.env[${name}]`);
};
