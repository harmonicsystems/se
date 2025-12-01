import { useState } from 'react';
import type { VocabularyItem } from '../types/vocabulary';
import './Flashcard.css';

interface FlashcardProps {
  item: VocabularyItem;
  onNext: () => void;
  onPrevious: () => void;
  currentIndex: number;
  totalCount: number;
}

export function Flashcard({ item, onNext, onPrevious, currentIndex, totalCount }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showExample, setShowExample] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    setShowExample(false);
  };

  const handleNext = () => {
    setIsFlipped(false);
    setShowExample(false);
    onNext();
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setShowExample(false);
    onPrevious();
  };

  return (
    <div className="flashcard-container">
      <div className="flashcard-progress">
        {currentIndex + 1} / {totalCount}
      </div>

      <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
        <div className="flashcard-inner">
          <div className="flashcard-front">
            <div className="flashcard-content">
              <span className="swedish-word">{item.swedish}</span>
              {item.pronunciation && (
                <span className="pronunciation">[{item.pronunciation}]</span>
              )}
              <span className="hint">Click to reveal</span>
            </div>
          </div>
          <div className="flashcard-back">
            <div className="flashcard-content">
              <span className="english-word">{item.english}</span>
              <span className="swedish-small">{item.swedish}</span>
            </div>
          </div>
        </div>
      </div>

      {item.example && (
        <div className="example-section">
          <button
            className="example-toggle"
            onClick={(e) => {
              e.stopPropagation();
              setShowExample(!showExample);
            }}
          >
            {showExample ? 'Hide Example' : 'Show Example'}
          </button>
          {showExample && (
            <div className="example-content">
              <p className="example-swedish">"{item.example.swedish}"</p>
              <p className="example-english">"{item.example.english}"</p>
            </div>
          )}
        </div>
      )}

      <div className="flashcard-controls">
        <button onClick={handlePrevious} disabled={currentIndex === 0}>
          Previous
        </button>
        <button onClick={handleNext} disabled={currentIndex === totalCount - 1}>
          Next
        </button>
      </div>
    </div>
  );
}
