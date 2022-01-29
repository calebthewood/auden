import { MongoClient } from 'mongodb';
import { useEffect } from 'react';
import { useState } from 'react';
import MeetupList from '../components/meetups/MeetupList';

const Dummy_Meetups = [
{
    id: 'm1',
    title: 'A First Meetup',
    image: 'https://picsum.photos/600/400',
    address: 'Nowhere',
    description: 'This is a first meetup!'
},
{
    id: 'm2',
    title: 'Another Meetup',
    image: 'https://picsum.photos/600/400?blur',
    address: 'Somewhere',
    description: 'This is a meetup!'
}
];

function HomePage(props) {
  const [loadedMeetups, setLoadedMeetups] = useState([]);

useEffect(() => {
  //send https request
  setLoadedMeetups(Dummy_Meetups);
})

  return <MeetupList meetups={props.meetups} />
}

//runs with every request
//this option better with data that updates constantly
//req & res only available in getServerSideProps
/*
export async function getServerSideProps(context) {
  const req = context.req;
  const res = context.res;
  
  return {
    props: {
      meetups: Dummy_Meetups
    }
  }
}
*/

//getStaticProps only works in /pages files
//data here operates like server side code.
//will never reach client. Always returns object
//revalidate timeframe depends on type of data
export async function getStaticProps() {
 
   const client = await MongoClient.connect(
            'mongodb+srv://admin-Caleb:test123@cluster0.op83k.mongodb.net/meetups?retryWrites=true&w=majority'
            );

        const db = client.db();
        const meetupsCollection = db.collection('meetups');
        const meetups = await meetupsCollection.find().toArray();
        client.close();
  
  return  {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString()
      }))
    },
    revalidate: 10
  };
}
export default HomePage