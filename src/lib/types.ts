export interface Author {
  _id: string;
  name: string;
  email: string;
}

export interface Post {
  _id: string;
  title: string;
  content: string;
  authorId: Author;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}
