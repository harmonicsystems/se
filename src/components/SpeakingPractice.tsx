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

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'beginner':
        return '#28a745';
      case 'intermediate':
        return '#ffc107';
      case 'advanced':
        return '#dc3545';
      default:
        return '#666';
    }
  };

  if (!currentSentence) {
    return <p className="no-sentences">No sentences available for this difficulty level.</p>;
  }

  return (
    <div className="speaking-practice">
      <div className="speaking-header">
        <h2>Speaking Practice</h2>
        <p>Practice saying these sentences out loud!</p>
      </div>

      <div className="difficulty-selector">
        {(['all', 'beginner', 'intermediate', 'advanced'] as const).map((diff) => (
          <button
            key={diff}
            className={`diff-btn ${difficulty === diff ? 'active' : ''}`}
            onClick={() => {
              setDifficulty(diff);
              setCurrentIndex(0);
              setShowTranslation(false);
            }}
            style={
              difficulty === diff && diff !== 'all'
                ? { backgroundColor: getDifficultyColor(diff), borderColor: getDifficultyColor(diff) }
                : {}
            }
          >
            {diff === 'all' ? 'All Levels' : diff.charAt(0).toUpperCase() + diff.slice(1)}
          </button>
        ))}
      </div>

      <div className="sentence-card">
        <div
          className="difficulty-badge"
          style={{ backgroundColor: getDifficultyColor(currentSentence.difficulty) }}
        >
          {currentSentence.difficulty}
        </div>

        <div className="context-label">{currentSentence.context}</div>

        <div className="swedish-sentence">{currentSentence.swedish}</div>

        <div className="listen-buttons">
          <SpeakButton text={currentSentence.swedish} size="large" showSlowButton />
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

      <div className="speaking-options">
        <label>
          <input
            type="checkbox"
            checked={showPronunciation}
            onChange={(e) => setShowPronunciation(e.target.checked)}
          />
          Show pronunciation guide
        </label>
      </div>

      <div className="speaking-progress">
        {currentIndex + 1} / {filteredSentences.length} sentences
      </div>

      <div className="speaking-tips">
        <h3>Tips for Practice:</h3>
        <ul>
          <li>Click the speaker button to hear the sentence in Swedish</li>
          <li>Use the turtle button for a slower pronunciation</li>
          <li>Listen first, then try to repeat it yourself</li>
          <li>Use the pronunciation guide for tricky sounds</li>
          <li>Record yourself and compare to the audio</li>
          <li>Practice the same sentence multiple times</li>
        </ul>
      </div>
    </div>
  );
}
