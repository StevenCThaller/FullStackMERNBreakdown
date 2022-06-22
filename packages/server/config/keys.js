export default {
  app: {
    port: process.env.PORT || 3001,
    apiUrl: process.env.API_URL ? `/${process.env.API_URL}` : '/api',
    hashRounds: process.env.HASH_ROUNDS ? Number(process.env.HASH_ROUNDS) : 12
  }
}