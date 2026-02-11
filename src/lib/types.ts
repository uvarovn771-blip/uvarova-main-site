
export type ArticleCategory =
  | 'Запуск речи'
  | 'Упражнения'
  | 'Советы родителям'
  | 'Возрастные нормы'
  | 'Коррекция звуков'
  | 'Особенности развития'
  | 'Диагностика'
  | 'Игры для речи'
  | 'Артикуляционная гимнастика'
  | 'Психология речи'
  | 'Подготовка к школе';

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

    