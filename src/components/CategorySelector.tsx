import type { CategoryInfo } from '../types/vocabulary';
import './CategorySelector.css';

interface CategorySelectorProps {
  categories: CategoryInfo[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export function CategorySelector({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategorySelectorProps) {
  return (
    <div className="category-selector">
      <button
        className={`category-chip ${selectedCategory === null ? 'active' : ''}`}
        onClick={() => onSelectCategory(null)}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          className={`category-chip ${selectedCategory === category.id ? 'active' : ''}`}
          onClick={() => onSelectCategory(category.id)}
        >
          <span className="category-emoji">{category.emoji}</span>
          <span className="category-name">{category.name}</span>
        </button>
      ))}
    </div>
  );
}
