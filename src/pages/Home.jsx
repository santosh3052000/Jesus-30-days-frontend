import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Home = () => {
  const { user, getGuestDay } = useUser();
  
  // Determine where the user should start
  const startDay = user ? user.lastReadDay : getGuestDay();

  return (
    <div className="home">
      <div className="hero">
        <h1>Learn Everything Jesus Taught in 30 Days</h1>
        <p>
          A journey through the Gospels: John, Matthew, Luke, and Mark.
          Read the Bible, reflect on the lessons, and grow in faith.
        </p>
        <Link to={`/day/${startDay}`} className="btn btn-primary btn-large">
          {startDay > 1 ? `Continue Day ${startDay}` : 'Start Day 1'}
        </Link>
        {!user && (
          <p className="guest-note">
            👋 You are browsing as a guest. Your progress is saved in your browser.
            <Link to="/register"> Sign up</Link> to save it forever!
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;