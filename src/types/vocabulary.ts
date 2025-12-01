export interface VocabularyItem {
  id: string;
  swedish: string;
  english: string;
  pronunciation?: string;
  example?: {
    swedish: string;
    english: string;
  };
  category: Category;
}

export type Category =
  | 'family'
  | 'baby-basics'
  | 'baby-activities'
  | 'baby-milestones'
  | 'emotions'
  | 'common-phrases'
  | 'questions';

export interface CategoryInfo {
  id: Category;
  name: string;
  emoji: string;
  description: string;
}
