import type { VocabularyItem } from '../types/vocabulary';
import './VocabularyList.css';

interface VocabularyListProps {
  items: VocabularyItem[];
}

export function VocabularyList({ items }: VocabularyListProps) {
  if (items.length === 0) {
    return <p className="vocab-empty">No vocabulary items in this category.</p>;
  }

  return (
    <div className="vocabulary-list">
      {items.map((item) => (
        <div key={item.id} className="vocab-item">
          <div className="vocab-main">
            <span className="vocab-swedish">{item.swedish}</span>
            <span className="vocab-english">{item.english}</span>
          </div>
          {item.pronunciation && (
            <span className="vocab-pronunciation">[{item.pronunciation}]</span>
          )}
          {item.example && (
            <div className="vocab-example">
              <p className="example-se">"{item.example.swedish}"</p>
              <p className="example-en">"{item.example.english}"</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
