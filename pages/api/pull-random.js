// domain/api/pull-random

import { MongoClient } from 'mongodb';

async function handler(req, res) {
    if (req.method === 'GET') {

        const client = await MongoClient.connect(`${process.env.API_URL}`);
        const db = client.db();
        const meetupsCollection = db.collection('meetups');



        const collectionArray = await meetupsCollection.find().toArray()
         

         const i = Math.floor(Math.random() * collectionArray.length)
         const randomPick = collectionArray[i];
        console.log(randomPick);
        client.close();
         res.json(randomPick);
    }
}

export default handler;