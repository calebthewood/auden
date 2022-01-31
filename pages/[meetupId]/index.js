import { MongoClient, ObjectId } from 'mongodb';
import { Fragment } from 'react/cjs/react.production.min';
import Head from 'next/head';
import MeetupDetail from '../../components/meetups/MeetupDetails';

function MeetupDetails(props) {
    return (
        <Fragment>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta
                    title='descriptipon'
                    content={props.meetupData.description} 
                />
            </Head>
        
        <MeetupDetail
            image={props.meetupData.image}
            title={props.meetupData.title}
            address={props.meetupData.address}
            description={props.meetupData.description}
        />
        </Fragment>
    );
}

export async function getStaticPaths() {
    //needed for dynamic pages
    //this function needs to list all possible paths to this page.
    //in this case, there is only one.

    const client = await MongoClient.connect(
        'mongodb+srv://admin-Caleb:test123@cluster0.op83k.mongodb.net/meetups?retryWrites=true&w=majority'
        );
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    //could use filter function in .find below to limit search
    //find code below searches all documents just their ids
    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
    client.close();

        //code below dynamically regenerates array of paths navigable by id
        //allows to use url/api/meetupIdNumber
    return {
        fallback: false,
        paths: meetups.map(meetup => ({ 
            params: { meetupId: meetup._id.toString() },
        })),
    };
}

export async function getStaticProps(context) {
    //fetch data for a single meetup
    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect(
        'mongodb+srv://admin-Caleb:test123@cluster0.op83k.mongodb.net/meetups?retryWrites=true&w=majority'
        );
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const selectedMeetup = await meetupsCollection.findOne({ 
        _id: ObjectId(meetupId) 
    });

    client.close();

    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                image:selectedMeetup.image,
                description: selectedMeetup.description
            },

        }
    };
}

export default MeetupDetails;