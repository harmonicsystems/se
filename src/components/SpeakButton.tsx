import { useSpeech } from '../hooks/useSpeech';
import './SpeakButton.css';

interface SpeakButtonProps {
  text: string;
  size?: 'small' | 'medium' | 'large';
  label?: string;
}

export function SpeakButton({ text, size = 'medium', label }: SpeakButtonProps) {
  const { speak, stop, isSpeaking, isSupported, hasSwedishVoice } = useSpeech();

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
    </div>
  );
}
