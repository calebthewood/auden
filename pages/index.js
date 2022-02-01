import { MongoClient } from 'mongodb';
import Head from 'next/head';
import { Fragment } from 'react/cjs/react.production.min';
import MeetupList from '../components/meetups/MeetupList';

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta 
          name="description"
          content='Regard my NextJS project'
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  )
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
            `${process.env.MONGOURL}`
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