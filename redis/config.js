import "dotenv/config.js";
import { createClient } from "redis";

//  Redis connection for session store

const client = createClient({
  url: process.env.REDIS_URL,
});

client.on("error", (err) => console.log("Redis Client Error", err));

export default client;
