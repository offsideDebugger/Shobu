import { createClient } from "redis";


export async function makeClient() {
    const client = createClient({
        RESP: 3,
        clientSideCache: {
            ttl: 60000,
            maxEntries: 0,
            evictPolicy: "FIFO"
        }
    });

    client.on("error", (err) => console.log("Redis Client Error", err));

    await client.connect();

    return client;
}