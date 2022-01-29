// /api/new-meetup

import { MongoClient } from 'mongodb';

async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        //destructured data that we expect to receive
        //const { tite, image, address, description}
        //destructuring not actually needed, because data is already in object format

        const client = await MongoClient.connect(
            'mongodb+srv://admin-Caleb:test123@cluster0.op83k.mongodb.net/meetups?retryWrites=true&w=majority'
            );

        const db = client.db();

        const meetupsCollection = db.collection('meetups');
        
        const result = await meetupsCollection.insertOne(data);
        //add error handling later
        console.log(result);

        client.close(); //closes connection to db
        res.status(201).json({ message: 'Meetup Inserted' });
    }
}

export default handler