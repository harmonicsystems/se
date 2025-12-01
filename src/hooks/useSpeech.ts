import { useState, useEffect, useCallback } from 'react';

interface SpeechOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
}

export function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [swedishVoice, setSwedishVoice] = useState<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const loadVoices = () => {
        const voices = speechSynthesis.getVoices();
        // Look for Swedish voice - prefer sv-SE, fall back to any Swedish
        const swedish =
          voices.find((v) => v.lang === 'sv-SE') ||
          voices.find((v) => v.lang.startsWith('sv')) ||
          null;
        setSwedishVoice(swedish);
        // Only mark as supported if we actually have a Swedish voice
        setIsSupported(!!swedish);
      };

      // Load voices immediately if available
      loadVoices();

      // Chrome loads voices asynchronously
      speechSynthesis.onvoiceschanged = loadVoices;

      return () => {
        speechSynthesis.onvoiceschanged = null;
      };
    }
  }, []);

  const speak = useCallback(
    (text: string, options: SpeechOptions = {}) => {
      if (!isSupported || !swedishVoice) return;

      // Cancel any ongoing speech
      speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);

      // Use the Swedish voice we found
      utterance.voice = swedishVoice;
      utterance.lang = swedishVoice.lang;
      utterance.rate = options.rate ?? 0.9; // Slightly slower for learning
      utterance.pitch = options.pitch ?? 1;
      utterance.volume = options.volume ?? 1;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      speechSynthesis.speak(utterance);
    },
    [isSupported, swedishVoice]
  );

  const speakSlow = useCallback(
    (text: string) => {
      speak(text, { rate: 0.6 });
    },
    [speak]
  );

  const stop = useCallback(() => {
    if (isSupported) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [isSupported]);

  return {
    speak,
    speakSlow,
    stop,
    isSpeaking,
    isSupported,
    hasSwedishVoice: !!swedishVoice,
    swedishVoice,
  };
}
