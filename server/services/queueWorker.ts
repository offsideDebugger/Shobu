import { Worker,Job } from "bullmq";
import { createClient } from "redis"
import { matchUsers } from "../routes/matchRoute";

const client = await createClient({
  RESP: 3, 
  clientSideCache: {
    ttl: 60000,             // Time-to-live (0 = no expiration)
    maxEntries: 0,      // Maximum entries (0 = unlimited)
    evictPolicy: "FIFO"  // Eviction policy: "LRU" or "FIFO"
  }
}).on("error", (err) => console.log("Redis Client Error", err))
  .connect();

;

const connection={
    host:"127.0.0.1",
    port:6379
}

const matches=new Worker(`match`, async(job:Job)=>{
    const user=job.data.userId;
    const timestamp = Date.now();

    const alreadyMatching = await client.exists(`matching:${user}`);

    if (!alreadyMatching) {
      const userPushedToList=await client.rPush("matching_pool",user);
      const userSETforSTATE=await client.set(`matching:${user}`,`matching`, {
        expiration:{
          type:'EX',
          value:60
        }
      })
    } else {
      console.log("user already exists")
    }
    

  const poolSize=await client.lLen('matching_pool')

  if(poolSize>=2){
    const user1 = await client.lPop('matching_pool');
    const user2 = await client.lPop('matching_pool');

    if (user1 && user2) {
      // Verifing if both are still valid and not expired
      const valid1 = await client.exists(`matching:${user1}`);
      const valid2 = await client.exists(`matching:${user2}`);
      
      if (valid1 && valid2) {
        // Cleaning up their matching state
        await client.del(`matching:${user1}`);
        await client.del(`matching:${user2}`);
        
        // Match them!
        matchUsers(user1, user2);
      }
    }

    else{
      console.log(`Waiting for more users. Current pool size: ${poolSize}`);
    }
  }

},{ connection });

matches.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

matches.on("failed", (job, err) => {
  console.log(`Job ${job?.id} failed with error: ${err.message}`);
});






