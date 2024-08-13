import 'dotenv/config';
import { app } from './app';
import { DATABASE, PORT } from './helpers/constants';
import DB from './helpers/config/DB';
import RedisClient from './helpers/config/redis-client';
import { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD, REDIS_USERNAME } from './helpers/constants';

const db = new DB(console);
export const redis_client = new RedisClient(
    REDIS_HOST,
    REDIS_PORT,
    REDIS_USERNAME,
    REDIS_PASSWORD,
    console)

//start application
redis_client.connect()
db.connect(DATABASE);
app.listen(PORT, () => {
    console.log("Server is running on port: " + PORT)
})
// connect to database
