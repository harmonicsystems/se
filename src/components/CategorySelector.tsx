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
      <select
        className="category-dropdown"
        value={selectedCategory || ''}
        onChange={(e) => onSelectCategory(e.target.value || null)}
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.emoji} {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}
