export interface Story {
  id: string;
  title: string;
  category: string;
  readingTime: string;
  date: string;
  image: string;
  excerpt: string;
  author: {
    name: string;
    avatar: string;
  };
}
