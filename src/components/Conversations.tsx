import { useState } from 'react';
import type { Conversation, ConversationLine } from '../types/vocabulary';
import { conversations } from '../data/conversations';
import './Conversations.css';

export function Conversations() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [showTranslations, setShowTranslations] = useState(true);
  const [highlightedLine, setHighlightedLine] = useState<number | null>(null);

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

  const getSpeakerLabel = (speaker: ConversationLine['speaker']) => {
    switch (speaker) {
      case 'you':
        return 'Du (You)';
      case 'farfar':
        return 'Farfar';
      case 'farmor':
        return 'Farmor';
      case 'both':
        return 'Farfar & Farmor';
    }
  };

  const getSpeakerEmoji = (speaker: ConversationLine['speaker']) => {
    switch (speaker) {
      case 'you':
        return '👤';
      case 'farfar':
        return '👴';
      case 'farmor':
        return '👵';
      case 'both':
        return '👴👵';
    }
  };

  if (selectedConversation) {
    return (
      <div className="conversation-detail">
        <button className="back-btn" onClick={() => setSelectedConversation(null)}>
          Back to Conversations
        </button>

        <div className="conversation-header">
          <h2>{selectedConversation.title}</h2>
          <p className="conversation-title-swedish">{selectedConversation.titleSwedish}</p>
          <span
            className="difficulty-tag"
            style={{ backgroundColor: getDifficultyColor(selectedConversation.difficulty) }}
          >
            {selectedConversation.difficulty}
          </span>
        </div>

        <div className="conversation-options">
          <label>
            <input
              type="checkbox"
              checked={showTranslations}
              onChange={(e) => setShowTranslations(e.target.checked)}
            />
            Show English translations
          </label>
        </div>

        <div className="conversation-lines">
          {selectedConversation.lines.map((line, index) => (
            <div
              key={index}
              className={`conversation-line ${line.speaker === 'you' ? 'speaker-you' : 'speaker-other'} ${highlightedLine === index ? 'highlighted' : ''}`}
              onClick={() => setHighlightedLine(highlightedLine === index ? null : index)}
            >
              <div className="speaker-info">
                <span className="speaker-emoji">{getSpeakerEmoji(line.speaker)}</span>
                <span className="speaker-name">{getSpeakerLabel(line.speaker)}</span>
              </div>
              <div className="line-content">
                <p className="line-swedish">{line.swedish}</p>
                {showTranslations && <p className="line-english">{line.english}</p>}
              </div>
            </div>
          ))}
        </div>

        <div className="practice-tips">
          <h3>How to Practice:</h3>
          <ol>
            <li>Read through the entire conversation first</li>
            <li>Practice reading YOUR lines (Du) out loud</li>
            <li>Try covering the English and translating yourself</li>
            <li>Role-play with a partner if possible</li>
            <li>Record yourself and listen back</li>
          </ol>
        </div>
      </div>
    );
  }

  return (
    <div className="conversations-list">
      <div className="conversations-header">
        <h2>Conversation Practice</h2>
        <p>Practice realistic dialogues with farfar och farmor!</p>
      </div>

      <div className="conversations-grid">
        {conversations.map((conv) => (
          <button
            key={conv.id}
            className="conversation-card"
            onClick={() => setSelectedConversation(conv)}
          >
            <span
              className="card-difficulty"
              style={{ backgroundColor: getDifficultyColor(conv.difficulty) }}
            >
              {conv.difficulty}
            </span>
            <h3>{conv.title}</h3>
            <p className="card-swedish">{conv.titleSwedish}</p>
            <p className="card-description">{conv.description}</p>
            <span className="card-lines">{conv.lines.length} lines</span>
          </button>
        ))}
      </div>
    </div>
  );
}
