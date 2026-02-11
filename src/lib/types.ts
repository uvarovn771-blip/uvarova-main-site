export type ArticleCategory = 'Запуск речи' | 'Упражнения' | 'Советы родителям';

export type Article = {
  slug: string;
  title: string;
  description: string;
  category: ArticleCategory;
  author: string;
  publishedAt: string; // ISO 8601 format
  image: {
    id: string;
  };
  content: string;
};
