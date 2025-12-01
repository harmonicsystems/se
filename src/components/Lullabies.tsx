import { useState } from 'react';
import type { Lullaby } from '../data/lullabies';
import { lullabies } from '../data/lullabies';
import './Lullabies.css';

export function Lullabies() {
  const [selectedLullaby, setSelectedLullaby] = useState<Lullaby | null>(null);
  const [showTranslations, setShowTranslations] = useState(true);

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

        <div className="spotify-section">
          <a
            href={selectedLullaby.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="spotify-btn"
          >
            <span className="spotify-icon">🎵</span>
            Listen on Spotify
          </a>
        </div>

        <div className="lyrics-container">
          {selectedLullaby.lyrics.map((line, index) => (
            <div key={index} className="lyric-line">
              <p className="lyric-swedish">{line.swedish}</p>
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
            <li>Listen to the song on Spotify to learn the melody</li>
            <li>Follow along with the lyrics here</li>
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
