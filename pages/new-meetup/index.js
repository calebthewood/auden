import { useRouter } from 'next/router';
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

//domain/new-meetup

function NewMeetupPage() {
    const router = useRouter(); 

    async function addMeetupHandler(enteredMeetupData) {
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        const data = await response.json();
        console.log(data);
        //replace and push are options for navigating pages
            //push moves to said page
            //replace doesn't allow "back". Good for form submittals etc.
        router.replace('/');
    }

    return <NewMeetupForm onAddMeetup={addMeetupHandler} />
}

export default NewMeetupPage;