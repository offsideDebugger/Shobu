import { makeClient } from "../utils/redisClient";

console.log("subscriber worker is running")
const client = await makeClient();

const listener = (message: string, channel: string) => {
    console.log(message, channel);
};
console.log("Subscribing to matching channel...");
await client.SUBSCRIBE("matching", listener);
console.log("Subscribed successfully");
