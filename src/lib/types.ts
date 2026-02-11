export type ArticleCategory = 'Speech Launch' | 'Exercises' | 'Parenting Tips';

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
