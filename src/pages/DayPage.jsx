import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import api from '../utils/api';

// ------------------- NEW: Bible Link Helper Functions -------------------
const bookAbbreviations = {
  'John': 'JHN',
  'Matthew': 'MAT',
  'Luke': 'LUK',
  'Mark': 'MRK',
};

const getBibleLink = (chapterString) => {
  // Example input: "John 1"
  const parts = chapterString.split(' ');
  // If there are spaces in the book name (e.g., "Song of Solomon"), this handles it.
  const book = parts.slice(0, -1).join(' ');
  const chapter = parts[parts.length - 1];
  
  const abbr = bookAbbreviations[book];
  if (!abbr) return '#'; // Fallback if book isn't found
  
  // Bible.com NIV format:
  // https://www.bible.com/bible/111/JHN.1.NIV
  return `https://www.bible.com/bible/111/${abbr}.${chapter}.NIV`;
};
// ------------------------------------------------------------------------

const DayPage = () => {
  const { day } = useParams();
  const navigate = useNavigate();
  const { user, updateProgress, getGuestDay } = useUser();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const currentDay = parseInt(day);

  // Redirect if user tries to skip ahead
  useEffect(() => {
    const maxAllowedDay = user ? user.lastReadDay : getGuestDay();
    if (currentDay > maxAllowedDay) {
      navigate(`/day/${maxAllowedDay}`);
    }
  }, [currentDay, user, navigate, getGuestDay]);

  // Fetch content for the current day
  useEffect(() => {
    const fetchLesson = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/content/${currentDay}`);
        setLesson(res.data.data);
        setError('');
      } catch (err) {
        if (err.response?.status === 404) {
          setError('This day does not exist yet.');
        } else {
          setError('Failed to load the lesson. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchLesson();
  }, [currentDay]);

  const handleCompleteDay = async () => {
    const nextDay = currentDay + 1;

    if (nextDay > 30) {
      await updateProgress(nextDay);
      navigate('/completed');
      return;
    }

    await updateProgress(nextDay);
    navigate(`/day/${nextDay}`);
  };

  if (loading) return <div className="loader">Loading Word of God...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!lesson) return null;

  return (
    <div className="day-page">
      <h1>
        Day {lesson.day}: {lesson.title}
      </h1>

      <div className="reading-section">
        <h2>📖 Read These Chapters</h2>
        <ul className="chapter-list">
          {lesson.bibleChapters.map((chapter, index) => {
            const link = getBibleLink(chapter);
            return (
              <li key={index}>
                {/* NEW: Render as a clickable link */}
                <a 
                  href={link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bible-link"
                >
                  {chapter} ↗
                </a>
              </li>
            );
          })}
        </ul>
        <p className="study-note">
          📝 Click the links above to read the chapters on Bible.com, then come back to reflect.
        </p>
      </div>

      <div className="lesson-section">
        <h2>✝️ What Jesus is Asking Us to Learn</h2>
        <p className="lesson-text">{lesson.lesson}</p>
      </div>

      <button onClick={handleCompleteDay} className="btn btn-success btn-large">
        {currentDay === 30 ? '🏁 Finish the Journey!' : `✅ Complete Day ${currentDay} & Move On`}
      </button>
    </div>
  );
};

export default DayPage;