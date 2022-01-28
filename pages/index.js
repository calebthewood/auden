import MeetupList from '../components/meetups/MeetupList';


const Dummy_Meetups = [
{
    id: 'm1',
    title: 'A First Meetup',
    image: 'https://picsum.photos/400/600?blur',
    address: 'Nowhere',
    description: 'This is a first meetup!'
},
{
    id: 'm2',
    title: 'Another Meetup',
    image: 'https://picsum.photos/400/600?blur',
    address: 'Somewhere',
    description: 'This is a meetup!'
}
];

console.log(Dummy_Meetups);

function HomePage() {
  return (<MeetupList meetups={Dummy_Meetups} />)
}

export default HomePage