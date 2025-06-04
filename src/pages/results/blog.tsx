import { GetStaticProps } from "next";
import Link from "next/link";
import Head from "next/head";
import { Card, Row, Col, Image, Pagination } from "antd";
import { useState } from "react";
import { Post, PostsResponse } from "@/helper/postsHelper";
import { BackButton } from "@/components/back";

type Props = {
  posts: Post[];
};

const POSTS_PER_PAGE = 8;

const BlogPage = ({ posts }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page: number) => setCurrentPage(page);

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = posts.slice(startIndex, endIndex);

  return (
    <>
      <Head>
        <title>Danh sách Blog - Next.js</title>
        <meta
          name="description"
          content="Trang danh sách blog đơn giản với Next.js"
        />
      </Head>
      <main className="max-w-7xl mx-auto p-4">
        <div className="flex gap-[12px] items-center mb-6">
          <BackButton />
          <h1 className="text-3xl font-bold">Danh sách Blog</h1>
        </div>
        <Row gutter={[16, 16]}>
          {currentPosts.map((post) => (
            <Col key={post.id} xs={24} sm={12} md={12} lg={6}>
              <Link href={`/posts/${post.slug}`} passHref>
                <Card
                  hoverable
                  cover={
                    <Image
                      preview={false}
                      alt="Image-blog"
                      src={post.image}
                      className="rounded-[12px]"
                    />
                  }
                  style={{ height: "100%" }}
                >
                  <div>
                    <h2 className="text-[18px] font-bold line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="line-clamp-3">{post.description}</p>
                  </div>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
        <div className="mt-6 flex justify-center">
          <Pagination
            current={currentPage}
            pageSize={POSTS_PER_PAGE}
            total={posts.length}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(
    "https://www.wisp.blog/api/v1/cluqyx1rl0000l5ds3f0vkfer/posts"
  );
  const data: PostsResponse = await res.json();

  return {
    props: {
      posts: data.posts,
    },
  };
};

export default BlogPage;
