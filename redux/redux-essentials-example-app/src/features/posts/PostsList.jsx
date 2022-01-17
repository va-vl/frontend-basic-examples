import * as React from 'react';
import { Link } from 'react-router-dom';
//
import { useGetPostsQuery } from '../api/apiSlice';
import { Spinner } from '../../components/Spinner';
import { PostAuthor } from './PostAuthor';
import { TimeAgo } from './TimeAgo';
import { ReactionButtons } from './ReactionButtons';

let PostExcerpt = ({ post }) => (
  <article key={post.id} className="post-excerpt">
    <h3>{post.title}</h3>
    <div>
      <PostAuthor userId={post.user} />
      <TimeAgo timestamp={post.date} />
    </div>
    <p className="post-content">{post.content.substring(0, 100)}</p>
    <ReactionButtons post={post} />
    <Link to={`/posts/${post.id}`} className="button muted-button">
      View Post
    </Link>
  </article>
);

PostExcerpt = React.memo(PostExcerpt);

export const PostsList = () => {
  const {
    data: posts = [],
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetPostsQuery();

  const sortedPosts = React.useMemo(() => {
    const sortedPosts = posts.slice();
    sortedPosts.sort((a, b) => b.date.localeCompare(a.date));
    return sortedPosts;
  }, [posts]);

  let content

  if (isLoading) {
    content = <Spinner text="Loading..." />;
  } else if (isSuccess) {
    content = sortedPosts.map((post) => (
      <PostExcerpt key={post.id} post={post} />
    ));
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  );
};
