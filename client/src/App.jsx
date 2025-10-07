import { useEffect, useState } from 'react';
import { getBooks } from './services/api';

export default function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    setLoading(true);
    getBooks()
      .then(data => {
        const normalized = Array.isArray(data)
          ? data.map(b => ({
              id: b.id || b._id || b.id,
              title: b.title,
              author: b.author,
              price: b.price,
              category: b.category,
              image: b.image || '📚'
            }))
          : [];
        setBooks(normalized);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setBooks([]);
        setLoading(false);
      });
  }, []);

  const categories = [
    { id: 'all', name: 'All Books' },
    { id: 'fiction', name: 'Fiction' },
    { id: 'non-fiction', name: 'Non-Fiction' },
    { id: 'biography', name: 'Biography' },
    { id: 'self-help', name: 'Self Help' },
  ];

  const filteredBooks = selectedCategory === 'all' 
    ? books 
    : books.filter(book => book.category === selectedCategory);

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#fafaf9',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    },
    header: {
      backgroundColor: '#ffffff',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      padding: '24px 32px',
    },
    headerContent: {
      maxWidth: '1280px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    logo: {
      fontSize: '28px',
      fontFamily: 'Georgia, serif',
      color: '#292524',
      fontWeight: 'bold',
    },
    nav: {
      display: 'flex',
      gap: '24px',
    },
    navButton: {
      background: 'none',
      border: 'none',
      color: '#57534e',
      cursor: 'pointer',
      fontSize: '14px',
      transition: 'color 0.2s',
    },
    hero: {
      background: 'linear-gradient(to bottom, #fef3c7, #fafaf9)',
      padding: '64px 32px',
      textAlign: 'center',
    },
    heroTitle: {
      fontSize: '48px',
      fontFamily: 'Georgia, serif',
      color: '#292524',
      marginBottom: '16px',
    },
    heroText: {
      fontSize: '18px',
      color: '#57534e',
      maxWidth: '700px',
      margin: '0 auto',
      lineHeight: '1.6',
    },
    categorySection: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '32px',
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: '12px',
    },
    categoryButton: (isSelected) => ({
      padding: '10px 24px',
      borderRadius: '20px',
      border: 'none',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s',
      backgroundColor: isSelected ? '#292524' : '#ffffff',
      color: isSelected ? '#ffffff' : '#44403c',
      boxShadow: isSelected ? 'none' : '0 1px 2px rgba(0,0,0,0.05)',
    }),
    booksSection: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '48px 32px 80px',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: '32px',
    },
    bookCard: {
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      cursor: 'pointer',
      transition: 'all 0.3s',
    },
    bookImage: {
      aspectRatio: '3/4',
      background: 'linear-gradient(135deg, #fef3c7, #e7e5e4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '64px',
      transition: 'transform 0.3s',
    },
    bookInfo: {
      padding: '20px',
    },
    bookTitle: {
      fontFamily: 'Georgia, serif',
      fontSize: '18px',
      color: '#292524',
      marginBottom: '4px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    bookAuthor: {
      fontSize: '14px',
      color: '#78716c',
      marginBottom: '12px',
    },
    bookFooter: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    bookPrice: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#292524',
    },
    addButton: {
      backgroundColor: '#292524',
      color: '#ffffff',
      border: 'none',
      padding: '8px 16px',
      borderRadius: '6px',
      fontSize: '14px',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    },
    footer: {
      backgroundColor: '#292524',
      color: '#ffffff',
      padding: '48px 32px',
      textAlign: 'center',
    },
    footerTitle: {
      fontSize: '24px',
      fontFamily: 'Georgia, serif',
      marginBottom: '12px',
    },
    footerText: {
      color: '#d6d3d1',
      marginBottom: '24px',
    },
    footerCopy: {
      fontSize: '14px',
      color: '#a8a29e',
    },
    loading: {
      textAlign: 'center',
      padding: '80px 32px',
    },
    spinner: {
      width: '32px',
      height: '32px',
      border: '4px solid #e7e5e4',
      borderTop: '4px solid #292524',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      margin: '0 auto',
    },
  };

  return (
    <div style={styles.container}>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        button:hover {
          opacity: 0.9;
        }
      `}</style>

      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.logo}>The Book Shoppe</h1>
          <nav style={styles.nav}>
            <button style={styles.navButton}>Shop</button>
            <button style={styles.navButton}>About</button>
            <button style={styles.navButton}>Cart (0)</button>
          </nav>
        </div>
      </header>

      <section style={styles.hero}>
        <h2 style={styles.heroTitle}>Welcome to Our Book Shoppe</h2>
        <p style={styles.heroText}>
          Discover your next favorite read. Curated collections for every reader, 
          every mood, and every moment. Happy reading!
        </p>
      </section>

      <section style={styles.categorySection}>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            style={styles.categoryButton(selectedCategory === cat.id)}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            {cat.name}
          </button>
        ))}
      </section>

      <section style={styles.booksSection}>
        {loading ? (
          <div style={styles.loading}>
            <div style={styles.spinner}></div>
            <p style={{ color: '#57534e', marginTop: '16px' }}>Loading books...</p>
          </div>
        ) : (
          <div style={styles.grid}>
            {filteredBooks.map(book => (
              <div 
                key={book.id} 
                style={styles.bookCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0,0,0,0.1)';
                  e.currentTarget.querySelector('.book-img').style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                  e.currentTarget.querySelector('.book-img').style.transform = 'scale(1)';
                }}
              >
                <div className="book-img" style={styles.bookImage}>
                  {book.image}
                </div>
                <div style={styles.bookInfo}>
                  <h3 style={styles.bookTitle}>{book.title}</h3>
                  <p style={styles.bookAuthor}>{book.author}</p>
                  <div style={styles.bookFooter}>
                    <span style={styles.bookPrice}>${book.price}</span>
                    <button 
                      style={styles.addButton}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#3f3f46'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#292524'}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredBooks.length === 0 && (
          <div style={styles.loading}>
            <p style={{ color: '#78716c', fontSize: '18px' }}>No books found in this category.</p>
          </div>
        )}
      </section>

      <footer style={styles.footer}>
        <h3 style={styles.footerTitle}>The Book Shoppe</h3>
        <p style={styles.footerText}>
          Your destination for beautiful books and timeless stories.
        </p>
        <p style={styles.footerCopy}>
          © 2025 The Book Shoppe. All rights reserved.
        </p>
      </footer>
    </div>
  );
}