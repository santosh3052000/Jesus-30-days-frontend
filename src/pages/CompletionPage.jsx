import { Link } from 'react-router-dom';

const CompletionPage = () => {
  // New: Mapping of book names to their Bible.com chapter 1 URLs
  const bookLinks = {
    'Acts': 'https://www.bible.com/bible/111/ACT.1.NIV',
    'James': 'https://www.bible.com/bible/111/JAS.1.NIV',
    '1 Peter': 'https://www.bible.com/bible/111/1PE.1.NIV',
    '1 John': 'https://www.bible.com/bible/111/1JN.1.NIV',
    'Philippians': 'https://www.bible.com/bible/111/PHP.1.NIV',
    'Ephesians': 'https://www.bible.com/bible/111/EPH.1.NIV',
    'Romans': 'https://www.bible.com/bible/111/ROM.1.NIV',
    'Genesis': 'https://www.bible.com/bible/111/GEN.1.NIV',
    'Exodus': 'https://www.bible.com/bible/111/EXO.1.NIV',
    'Psalms': 'https://www.bible.com/bible/111/PSA.1.NIV',
    'Isaiah': 'https://www.bible.com/bible/111/ISA.1.NIV',
  };

  // Helper to render a clickable book list
  const renderBookList = (books) => {
    return books.map((book, index) => {
      const link = bookLinks[book];
      return (
        <li key={index}>
          {link ? (
            <a 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bible-link"
            >
              {book} ↗
            </a>
          ) : (
            book // Fallback just in case
          )}
        </li>
      );
    });
  };

  return (
    <div className="completion-page">
      <div className="completion-card">
        <h1>🎉 Congratulations!</h1>
        <p>
          You have completed the 30-day journey through the life and teachings of Jesus Christ!
          May these words transform your heart and mind.
        </p>

        <h3>📚 What to Read Next?</h3>
        <p>
          <strong>After the 30 days, read:</strong>
        </p>
        <ul className="book-list">
          {renderBookList(['Acts', 'James', '1 Peter', '1 John', 'Philippians', 'Ephesians', 'Romans'])}
        </ul>
        <p>
          <em>These books explain how the apostles understood and lived Jesus' teachings.</em>
        </p>

        <h3>📜 Then, Read:</h3>
        <ul className="book-list">
          {renderBookList(['Genesis', 'Exodus', 'Psalms', 'Isaiah'])}
        </ul>
        <p>
          <em>These books help you see how Jesus fulfills God's promises.</em>
        </p>

        <Link to="/" className="btn btn-primary">
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default CompletionPage;