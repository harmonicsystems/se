import { useState } from 'react';
import type { SpeakingSentence } from '../types/vocabulary';
import { speakingSentences, getSentencesByDifficulty } from '../data/sentences';
import { SpeakButton } from './SpeakButton';
import './SpeakingPractice.css';

type Difficulty = 'all' | 'beginner' | 'intermediate' | 'advanced';

export function SpeakingPractice() {
  const [difficulty, setDifficulty] = useState<Difficulty>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [showPronunciation, setShowPronunciation] = useState(true);

  const filteredSentences: SpeakingSentence[] =
    difficulty === 'all'
      ? speakingSentences
      : getSentencesByDifficulty(difficulty as 'beginner' | 'intermediate' | 'advanced');

  const currentSentence = filteredSentences[currentIndex];

  const handleNext = () => {
    setCurrentIndex((i) => (i + 1) % filteredSentences.length);
    setShowTranslation(false);
  };

  const handlePrevious = () => {
    setCurrentIndex((i) => (i - 1 + filteredSentences.length) % filteredSentences.length);
    setShowTranslation(false);
  };

  const handleRandom = () => {
    const randomIndex = Math.floor(Math.random() * filteredSentences.length);
    setCurrentIndex(randomIndex);
    setShowTranslation(false);
  };

  if (!currentSentence) {
    return <p className="no-sentences">No sentences available for this difficulty level.</p>;
  }

  return (
    <div className="speaking-practice">
      <div className="speaking-header">
        <h2>Speaking Practice</h2>
      </div>

      <div className="filter-row">
        <select
          className="difficulty-dropdown"
          value={difficulty}
          onChange={(e) => {
            setDifficulty(e.target.value as Difficulty);
            setCurrentIndex(0);
            setShowTranslation(false);
          }}
        >
          <option value="all">All Levels</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
        <label className="pronunciation-toggle">
          <input
            type="checkbox"
            checked={showPronunciation}
            onChange={(e) => setShowPronunciation(e.target.checked)}
          />
          Pronunciation
        </label>
      </div>

      <div className="sentence-card">
        <div className="context-label">{currentSentence.context}</div>

        <div className="swedish-sentence">{currentSentence.swedish}</div>

        <div className="listen-buttons">
          <SpeakButton text={currentSentence.swedish} size="large" />
        </div>

        {showPronunciation && (
          <div className="pronunciation">[{currentSentence.pronunciation}]</div>
        )}

        <button className="toggle-btn" onClick={() => setShowTranslation(!showTranslation)}>
          {showTranslation ? 'Hide Translation' : 'Show Translation'}
        </button>

        {showTranslation && <div className="english-sentence">{currentSentence.english}</div>}
      </div>

      <div className="speaking-controls">
        <button onClick={handlePrevious}>Previous</button>
        <button onClick={handleRandom} className="random-btn">
          Random
        </button>
        <button onClick={handleNext}>Next</button>
      </div>

      <div className="speaking-progress">
        {currentIndex + 1} / {filteredSentences.length}
      </div>
    </div>
  );
}
