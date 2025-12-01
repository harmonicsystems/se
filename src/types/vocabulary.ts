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
  | 'questions'
  | 'verbs'
  | 'adjectives'
  | 'time-expressions'
  | 'health-care'
  | 'food-feeding';

export interface CategoryInfo {
  id: Category;
  name: string;
  emoji: string;
  description: string;
}

export interface SpeakingSentence {
  id: string;
  swedish: string;
  english: string;
  pronunciation: string;
  context: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface ConversationLine {
  speaker: 'you' | 'farfar' | 'farmor' | 'both';
  swedish: string;
  english: string;
}

export interface Conversation {
  id: string;
  title: string;
  titleSwedish: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  lines: ConversationLine[];
}
