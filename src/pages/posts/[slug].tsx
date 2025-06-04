import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import styles from "./styles.module.scss";
import { Post, PostDetailResponse, PostsResponse } from "@/helper/postsHelper";
import { BackButton } from "@/components/back";
type Props = {
  post: Post;
};

const PostPage: NextPage<Props> = ({ post }) => {
  return (
    <>
      <Head>
        <title>{post.title} - Blog Detail</title>
        <meta name="description" content={post.description} />
      </Head>
      <main className="max-w-3xl mx-auto p-4">
        <BackButton />
        <h1 className="text-[32px] font-bold mb-4">{post.title}</h1>
        <div className="text-[14px] text-gray-500 mb-4">
          By <span className="font-medium">{post.author.name}</span> •{" "}
          {new Date(post.createdAt).toLocaleDateString()}
        </div>
        <article className={styles.blogContent}>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      </main>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(
    "https://www.wisp.blog/api/v1/cluqyx1rl0000l5ds3f0vkfer/posts"
  );
  const data: PostsResponse = await res.json();

  const paths = data.posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug;
  const res = await fetch(
    `https://www.wisp.blog/api/v1/cluqyx1rl0000l5ds3f0vkfer/posts/${slug}`
  );
  const data: PostDetailResponse = await res.json();
  return {
    props: {
      post: data.post,
    },
  };
};

export default PostPage;
