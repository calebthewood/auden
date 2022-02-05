// /api/new-meetup

import { MongoClient } from 'mongodb';

async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        //destructured data that we expect to receive
        //const { tite, image, author, content}
        //destructuring not actually needed, because data is already in object format

        const client = await MongoClient.connect(`${process.env.API_URL}`);

        const db = client.db();

        const meetupsCollection = db.collection('meetups');
        
        const result = await meetupsCollection.insertOne(data);
        //add error handling later
        console.log(result);

        client.close(); //closes connection to db
        res.status(201).json({ message: 'Poem Inserted' });
    }
}

export default handler