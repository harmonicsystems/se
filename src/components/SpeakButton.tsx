import { useSpeech } from '../hooks/useSpeech';
import './SpeakButton.css';

interface SpeakButtonProps {
  text: string;
  size?: 'small' | 'medium' | 'large';
  showSlowButton?: boolean;
  label?: string;
}

export function SpeakButton({ text, size = 'medium', showSlowButton = false, label }: SpeakButtonProps) {
  const { speak, speakSlow, stop, isSpeaking, isSupported, hasSwedishVoice } = useSpeech();

  if (!isSupported) {
    return null;
  }

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSpeaking) {
      stop();
    } else {
      speak(text);
    }
  };

  const handleSlowClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSpeaking) {
      stop();
    } else {
      speakSlow(text);
    }
  };

  return (
    <div className={`speak-button-container ${size}`}>
      <button
        className={`speak-btn ${isSpeaking ? 'speaking' : ''}`}
        onClick={handleClick}
        title={hasSwedishVoice ? 'Listen in Swedish' : 'Listen (Swedish voice not available)'}
        aria-label={isSpeaking ? 'Stop' : 'Listen'}
      >
        {isSpeaking ? (
          <span className="stop-icon">◼</span>
        ) : (
          <span className="speaker-icon">🔊</span>
        )}
        {label && <span className="speak-label">{label}</span>}
      </button>
      {showSlowButton && !isSpeaking && (
        <button
          className="speak-btn slow-btn"
          onClick={handleSlowClick}
          title="Listen slowly"
          aria-label="Listen slowly"
        >
          <span className="speaker-icon">🐢</span>
        </button>
      )}
    </div>
  );
}
