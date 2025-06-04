export type Post = {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  image: string;
  author: {
    name: string;
    image: string;
  };
  createdAt: string;
};

export type PostsResponse = {
  posts: Post[];
};

export type PostDetailResponse = {
  post: Post;
};
