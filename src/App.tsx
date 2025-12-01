import { useState, useMemo } from 'react';
import { Flashcard } from './components/Flashcard';
import { Quiz } from './components/Quiz';
import { CategorySelector } from './components/CategorySelector';
import { VocabularyList } from './components/VocabularyList';
import { vocabulary, categories, getVocabularyByCategory } from './data/vocabulary';
import type { Category } from './types/vocabulary';
import './App.css';

type View = 'home' | 'flashcards' | 'quiz' | 'vocabulary';

function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [flashcardIndex, setFlashcardIndex] = useState(0);

  const filteredVocabulary = useMemo(() => {
    if (selectedCategory) {
      return getVocabularyByCategory(selectedCategory);
    }
    return vocabulary;
  }, [selectedCategory]);

  const shuffledVocabulary = useMemo(() => {
    return [...filteredVocabulary].sort(() => Math.random() - 0.5);
  }, [filteredVocabulary]);

  const handleCategoryChange = (categoryId: string | null) => {
    setSelectedCategory(categoryId as Category | null);
    setFlashcardIndex(0);
  };

  const handleViewChange = (view: View) => {
    setCurrentView(view);
    setFlashcardIndex(0);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <div className="home-content">
            <div className="welcome-section">
              <h2>Välkommen!</h2>
              <p>
                Practice Swedish vocabulary to have meaningful conversations with your
                farfar and farmor about your baby.
              </p>
            </div>

            <div className="stats-section">
              <div className="stat-card">
                <span className="stat-number">{vocabulary.length}</span>
                <span className="stat-label">Words & Phrases</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">{categories.length}</span>
                <span className="stat-label">Categories</span>
              </div>
            </div>

            <div className="home-actions">
              <button className="action-card" onClick={() => handleViewChange('flashcards')}>
                <span className="action-icon">🎴</span>
                <span className="action-title">Flashcards</span>
                <span className="action-desc">Study vocabulary with flip cards</span>
              </button>

              <button className="action-card" onClick={() => handleViewChange('quiz')}>
                <span className="action-icon">📝</span>
                <span className="action-title">Quiz</span>
                <span className="action-desc">Test your knowledge</span>
              </button>

              <button className="action-card" onClick={() => handleViewChange('vocabulary')}>
                <span className="action-icon">📚</span>
                <span className="action-title">Browse All</span>
                <span className="action-desc">View complete word list</span>
              </button>
            </div>

            <div className="phrase-of-day">
              <h3>Try saying this to farmor & farfar:</h3>
              <p className="phrase-swedish">"Vi saknar er! Kom och hälsa på bebisen!"</p>
              <p className="phrase-english">"We miss you! Come and visit the baby!"</p>
            </div>
          </div>
        );

      case 'flashcards':
        return (
          <div className="practice-content">
            <CategorySelector
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategoryChange}
            />
            {shuffledVocabulary.length > 0 ? (
              <Flashcard
                item={shuffledVocabulary[flashcardIndex]}
                onNext={() => setFlashcardIndex((i) => Math.min(i + 1, shuffledVocabulary.length - 1))}
                onPrevious={() => setFlashcardIndex((i) => Math.max(i - 1, 0))}
                currentIndex={flashcardIndex}
                totalCount={shuffledVocabulary.length}
              />
            ) : (
              <p className="no-items">No items in this category</p>
            )}
          </div>
        );

      case 'quiz':
        return (
          <div className="practice-content">
            <CategorySelector
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategoryChange}
            />
            <Quiz
              items={filteredVocabulary}
              onComplete={() => handleViewChange('home')}
            />
          </div>
        );

      case 'vocabulary':
        return (
          <div className="practice-content">
            <CategorySelector
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategoryChange}
            />
            <VocabularyList items={filteredVocabulary} />
          </div>
        );
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <button className="logo-button" onClick={() => handleViewChange('home')}>
            <span className="flag-icon">🇸🇪</span>
            <h1>Svenska för Bebis</h1>
          </button>
          <p className="header-subtitle">Swedish for talking about your baby</p>
        </div>

        <nav className="app-nav">
          <button
            className={currentView === 'home' ? 'active' : ''}
            onClick={() => handleViewChange('home')}
          >
            Home
          </button>
          <button
            className={currentView === 'flashcards' ? 'active' : ''}
            onClick={() => handleViewChange('flashcards')}
          >
            Flashcards
          </button>
          <button
            className={currentView === 'quiz' ? 'active' : ''}
            onClick={() => handleViewChange('quiz')}
          >
            Quiz
          </button>
          <button
            className={currentView === 'vocabulary' ? 'active' : ''}
            onClick={() => handleViewChange('vocabulary')}
          >
            Browse
          </button>
        </nav>
      </header>

      <main className="app-main">{renderContent()}</main>

      <footer className="app-footer">
        <p>Made with ❤️ for conversations with farfar & farmor</p>
      </footer>
    </div>
  );
}

export default App;
