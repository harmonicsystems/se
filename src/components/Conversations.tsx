import { useState } from 'react';
import type { Conversation, ConversationLine } from '../types/vocabulary';
import { conversations } from '../data/conversations';
import { SpeakButton } from './SpeakButton';
import { useSpeech } from '../hooks/useSpeech';
import './Conversations.css';

export function Conversations() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [showTranslations, setShowTranslations] = useState(true);
  const [highlightedLine, setHighlightedLine] = useState<number | null>(null);
  const [playingAll, setPlayingAll] = useState(false);
  const { isSupported, swedishVoice } = useSpeech();

  const playAllLines = async () => {
    if (!selectedConversation || !swedishVoice) return;

    setPlayingAll(true);
    for (let i = 0; i < selectedConversation.lines.length; i++) {
      setHighlightedLine(i);
      const line = selectedConversation.lines[i];

      await new Promise<void>((resolve) => {
        const utterance = new SpeechSynthesisUtterance(line.swedish);
        utterance.voice = swedishVoice;
        utterance.lang = swedishVoice.lang;
        utterance.rate = 0.9;
        utterance.onend = () => {
          setTimeout(resolve, 500);
        };
        utterance.onerror = () => resolve();
        speechSynthesis.speak(utterance);
      });
    }
    setPlayingAll(false);
    setHighlightedLine(null);
  };

  const stopPlayback = () => {
    speechSynthesis.cancel();
    setPlayingAll(false);
    setHighlightedLine(null);
  };

  const getSpeakerLabel = (speaker: ConversationLine['speaker']) => {
    switch (speaker) {
      case 'you':
        return 'Du';
      case 'farfar':
        return 'Farfar';
      case 'farmor':
        return 'Farmor';
      case 'both':
        return 'Both';
    }
  };

  if (selectedConversation) {
    return (
      <div className="conversation-detail">
        <button className="back-btn" onClick={() => setSelectedConversation(null)}>
          ← Back
        </button>

        <div className="conversation-header">
          <h2>{selectedConversation.title}</h2>
          <p className="conversation-title-swedish">{selectedConversation.titleSwedish}</p>
        </div>

        <div className="conversation-options">
          <label>
            <input
              type="checkbox"
              checked={showTranslations}
              onChange={(e) => setShowTranslations(e.target.checked)}
            />
            Show translations
          </label>
          {isSupported && (
            <>
              {playingAll ? (
                <button className="stop-btn" onClick={stopPlayback}>
                  Stop
                </button>
              ) : (
                <button className="play-btn" onClick={playAllLines}>
                  Play All
                </button>
              )}
            </>
          )}
        </div>

        <div className="conversation-lines">
          {selectedConversation.lines.map((line, index) => (
            <div
              key={index}
              className={`conversation-line ${line.speaker === 'you' ? 'speaker-you' : 'speaker-other'} ${highlightedLine === index ? 'highlighted' : ''}`}
            >
              <div className="speaker-name">{getSpeakerLabel(line.speaker)}</div>
              <div className="line-content">
                <div className="line-swedish-row">
                  <p className="line-swedish">{line.swedish}</p>
                  <SpeakButton text={line.swedish} size="small" />
                </div>
                {showTranslations && <p className="line-english">{line.english}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="conversations-list">
      <div className="conversations-header">
        <h2>Conversations</h2>
      </div>

      <div className="conversations-grid">
        {conversations.map((conv) => (
          <button
            key={conv.id}
            className="conversation-card"
            onClick={() => setSelectedConversation(conv)}
          >
            <h3>{conv.title}</h3>
            <p className="card-swedish">{conv.titleSwedish}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
