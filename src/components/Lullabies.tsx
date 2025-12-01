import { useState } from 'react';
import type { Lullaby } from '../data/lullabies';
import { lullabies } from '../data/lullabies';
import { SpeakButton } from './SpeakButton';
import { useSpeech } from '../hooks/useSpeech';
import './Lullabies.css';

export function Lullabies() {
  const [selectedLullaby, setSelectedLullaby] = useState<Lullaby | null>(null);
  const [showTranslations, setShowTranslations] = useState(true);
  const [playingAll, setPlayingAll] = useState(false);
  const [currentLine, setCurrentLine] = useState<number | null>(null);
  const { isSupported } = useSpeech();

  const playFullSong = async () => {
    if (!selectedLullaby) return;

    setPlayingAll(true);
    for (let i = 0; i < selectedLullaby.lyrics.length; i++) {
      setCurrentLine(i);
      const line = selectedLullaby.lyrics[i];

      await new Promise<void>((resolve) => {
        const utterance = new SpeechSynthesisUtterance(line.swedish);
        utterance.lang = 'sv-SE';
        utterance.rate = 0.75; // Slower for lullabies
        utterance.onend = () => {
          setTimeout(resolve, 400);
        };
        utterance.onerror = () => resolve();
        speechSynthesis.speak(utterance);
      });
    }
    setPlayingAll(false);
    setCurrentLine(null);
  };

  const stopPlayback = () => {
    speechSynthesis.cancel();
    setPlayingAll(false);
    setCurrentLine(null);
  };

  if (selectedLullaby) {
    return (
      <div className="lullaby-detail">
        <button className="back-btn" onClick={() => setSelectedLullaby(null)}>
          Back to Lullabies
        </button>

        <div className="lullaby-header">
          <h2>{selectedLullaby.title}</h2>
          <p className="lullaby-title-english">{selectedLullaby.titleEnglish}</p>
          <p className="lullaby-description">{selectedLullaby.description}</p>
        </div>

        <div className="lullaby-options">
          <label>
            <input
              type="checkbox"
              checked={showTranslations}
              onChange={(e) => setShowTranslations(e.target.checked)}
            />
            Show English translations
          </label>
        </div>

        {isSupported && (
          <div className="playback-controls">
            {playingAll ? (
              <button className="stop-btn" onClick={stopPlayback}>
                Stop Song
              </button>
            ) : (
              <button className="play-btn" onClick={playFullSong}>
                Sing the Song
              </button>
            )}
          </div>
        )}

        <div className="lyrics-container">
          {selectedLullaby.lyrics.map((line, index) => (
            <div
              key={index}
              className={`lyric-line ${currentLine === index ? 'highlighted' : ''}`}
            >
              <div className="lyric-swedish-row">
                <p className="lyric-swedish">{line.swedish}</p>
                <SpeakButton text={line.swedish} size="small" />
              </div>
              {showTranslations && <p className="lyric-english">{line.english}</p>}
            </div>
          ))}
        </div>

        {selectedLullaby.notes && (
          <div className="lullaby-notes">
            <h3>Notes</h3>
            <p>{selectedLullaby.notes}</p>
          </div>
        )}

        <div className="practice-tips">
          <h3>How to Practice:</h3>
          <ol>
            <li>Click "Sing the Song" to hear the full lullaby</li>
            <li>Listen line by line and try to sing along</li>
            <li>Practice a few lines at a time until comfortable</li>
            <li>Sing it to your baby - they will love hearing your voice!</li>
          </ol>
        </div>
      </div>
    );
  }

  return (
    <div className="lullabies-list">
      <div className="lullabies-header">
        <h2>Svenska Vaggvisor</h2>
        <p className="header-subtitle">Swedish Lullabies & Children's Songs</p>
        <p className="header-description">
          Learn these beloved Swedish songs to sing to your baby. Farfar och farmor will be so proud!
        </p>
      </div>

      <div className="lullabies-grid">
        {lullabies.map((lullaby) => (
          <button
            key={lullaby.id}
            className="lullaby-card"
            onClick={() => setSelectedLullaby(lullaby)}
          >
            <h3>{lullaby.title}</h3>
            <p className="card-english">{lullaby.titleEnglish}</p>
            <p className="card-description">{lullaby.description}</p>
            <span className="card-lines">{lullaby.lyrics.length} lines</span>
          </button>
        ))}
      </div>
    </div>
  );
}
