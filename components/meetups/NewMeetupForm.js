import { useRef } from 'react';

import Card from '../ui/Card';
import classes from './NewMeetupForm.module.css';

function NewMeetupForm(props) {
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const authorInputRef = useRef();
  const contentInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredAuthor = authorInputRef.current.value;
    const enteredContent = contentInputRef.current.value;

    const meetupData = {
      title: enteredTitle,
      image: enteredImage,
      author: enteredAuthor,
      content: enteredContent,
    };

    props.onAddMeetup(meetupData);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='title'>Title of Poem</label>
          <input type='text' required id='title' ref={titleInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='image'>Associated Image</label>
          <input type='url' required id='image' ref={imageInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='author'>Author</label>
          <input type='text' required id='author' ref={authorInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='content'>Content</label>
          <textarea
            id='content'
            required
            rows='5'
            ref={contentInputRef}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Add to Collection</button>
        </div>
      </form>
    </Card>
  );
}

export default NewMeetupForm;
