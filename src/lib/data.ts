import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Article } from './types';

const articlesDirectory = path.join(process.cwd(), 'src/content/articles');

function getArticlesData(): Article[] {
  let fileNames: string[];
  try {
    fileNames = fs.readdirSync(articlesDirectory);
  } catch (err) {
    // If the directory doesn't exist, return an empty array.
    // This can happen during build time in some environments.
    return [];
  }

  const allArticlesData = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(articlesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title,
        description: data.description,
        category: data.category,
        author: data.author,
        publishedAt: data.publishedAt,
        image: { id: data.imageId },
        content,
      } as Article;
    });

    const uniqueArticles = allArticlesData.filter(
        (article, index, self) =>
          index === self.findIndex((t) => t.title === article.title)
      );

  const sortedArticles = uniqueArticles.sort((a, b) => {
    if (new Date(a.publishedAt) < new Date(b.publishedAt)) {
      return 1;
    } else {
      return -1;
    }
  });

  return sortedArticles;
}

export const articles: Article[] = getArticlesData();

export const categories = [...new Set(articles.map((a) => a.category))];
