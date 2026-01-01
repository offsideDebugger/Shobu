import { Queue } from 'bullmq';

const matchQueue = new Queue('match',{
    connection:{
        host:`127.0.0.1`,
        port:6379,
    }
});



export async function findMatches(userId :string ) {
    console.log("Queue is running")
    await matchQueue.add('match', { userId:userId },{ 
        removeOnComplete: true,
        removeOnFail: true,

    });
    return "UserId added in matching" // await matchQueue.add('matching', { userId: 2345 })
}
