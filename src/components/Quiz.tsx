import { useState, useEffect } from 'react';
import type { VocabularyItem } from '../types/vocabulary';
import { vocabulary } from '../data/vocabulary';
import './Quiz.css';

interface QuizProps {
  items: VocabularyItem[];
  onComplete: (score: number, total: number) => void;
}

interface QuizQuestion {
  item: VocabularyItem;
  options: string[];
  correctAnswer: string;
  direction: 'swedish-to-english' | 'english-to-swedish';
}

function generateQuestions(items: VocabularyItem[], count: number): QuizQuestion[] {
  const shuffled = [...items].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, Math.min(count, items.length));

  return selected.map((item) => {
    const direction = Math.random() > 0.5 ? 'swedish-to-english' : 'english-to-swedish';
    const correctAnswer = direction === 'swedish-to-english' ? item.english : item.swedish;

    // Get wrong answers from other vocabulary items
    const otherItems = vocabulary.filter((v) => v.id !== item.id);
    const wrongAnswers = otherItems
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((v) => (direction === 'swedish-to-english' ? v.english : v.swedish));

    const options = [correctAnswer, ...wrongAnswers].sort(() => Math.random() - 0.5);

    return { item, options, correctAnswer, direction };
  });
}

export function Quiz({ items, onComplete }: QuizProps) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    setQuestions(generateQuestions(items, 10));
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setAnswered(false);
  }, [items]);

  if (questions.length === 0) {
    return <div className="quiz-loading">Loading quiz...</div>;
  }

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="quiz-result">
        <h2>Quiz Complete!</h2>
        <div className="score-display">
          <span className="score-number">{score}</span>
          <span className="score-divider">/</span>
          <span className="score-total">{questions.length}</span>
        </div>
        <p className="score-percentage">{percentage}% correct</p>
        <p className="score-message">
          {percentage === 100
            ? 'Perfekt! Du är fantastisk!'
            : percentage >= 80
              ? 'Bra jobbat! Great work!'
              : percentage >= 60
                ? 'Bra försök! Good try!'
                : 'Fortsätt öva! Keep practicing!'}
        </p>
        <button
          className="quiz-restart"
          onClick={() => {
            setQuestions(generateQuestions(items, 10));
            setCurrentIndex(0);
            setScore(0);
            setSelectedAnswer(null);
            setShowResult(false);
            setAnswered(false);
          }}
        >
          Try Again
        </button>
        <button className="quiz-done" onClick={() => onComplete(score, questions.length)}>
          Done
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  const handleAnswer = (answer: string) => {
    if (answered) return;

    setSelectedAnswer(answer);
    setAnswered(true);

    if (answer === currentQuestion.correctAnswer) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="quiz-container">
      <div className="quiz-progress">
        Question {currentIndex + 1} of {questions.length}
      </div>

      <div className="quiz-question">
        <p className="direction-hint">
          {currentQuestion.direction === 'swedish-to-english'
            ? 'What does this Swedish word mean?'
            : 'How do you say this in Swedish?'}
        </p>
        <h3 className="question-word">
          {currentQuestion.direction === 'swedish-to-english'
            ? currentQuestion.item.swedish
            : currentQuestion.item.english}
        </h3>
        {currentQuestion.direction === 'swedish-to-english' &&
          currentQuestion.item.pronunciation && (
            <p className="question-pronunciation">[{currentQuestion.item.pronunciation}]</p>
          )}
      </div>

      <div className="quiz-options">
        {currentQuestion.options.map((option, index) => {
          let className = 'quiz-option';
          if (answered) {
            if (option === currentQuestion.correctAnswer) {
              className += ' correct';
            } else if (option === selectedAnswer) {
              className += ' incorrect';
            }
          } else if (option === selectedAnswer) {
            className += ' selected';
          }

          return (
            <button key={index} className={className} onClick={() => handleAnswer(option)}>
              {option}
            </button>
          );
        })}
      </div>

      {answered && (
        <div className="quiz-feedback">
          {selectedAnswer === currentQuestion.correctAnswer ? (
            <p className="feedback-correct">Rätt! Correct!</p>
          ) : (
            <p className="feedback-incorrect">
              The correct answer was: <strong>{currentQuestion.correctAnswer}</strong>
            </p>
          )}
          <button className="quiz-next" onClick={handleNext}>
            {currentIndex < questions.length - 1 ? 'Next Question' : 'See Results'}
          </button>
        </div>
      )}
    </div>
  );
}
