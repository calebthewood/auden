import classes from './MainNavigation.module.css';
import Link from 'next/link';

function MainNavigation() {

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Auden</div>
      <nav>
        <ul>
          <li>
            <Link href='/'>Collection</Link>
          </li>
          <li>
            <Link href='/new-meetup'>Add to Collection</Link>
          </li>
          <li>
            <Link href='/pull-random'>Surprise Me</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
