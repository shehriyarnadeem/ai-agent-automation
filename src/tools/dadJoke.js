import fetch from 'node-fetch'
import {z} from 'zod';
import https from 'https';

const agent = new https.Agent({
  rejectUnauthorized: false, // Ignore invalid certificates
});

export const dadJokeToolDefinition = {
    name: 'dad_joke',
    parameters: z.object({}),
    description: 'get a dad joke',
  }

export const dadJoke = async ({ toolArgs }) => {
  const res = await fetch('https://icanhazdadjoke.com/', {
    headers: {
      Accept: 'application/json',
    },
    agent,
  })
  return (await res.json()).joke
}