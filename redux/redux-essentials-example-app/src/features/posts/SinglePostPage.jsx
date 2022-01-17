import { Link } from 'react-router-dom';
//
import { useGetPostQuery } from '../api/apiSlice';
import { Spinner } from '../../components/Spinner';
import { PostAuthor } from './PostAuthor';
import { TimeAgo } from './TimeAgo';
import { ReactionButtons } from './ReactionButtons';

const PostNotFoundPage = () => (
  <section>
    <h2>Post not found!</h2>
  </section>
);

export const SinglePostPage = ({ match }) => {
  const { postId } = match.params;

  const {
    data: post,
    isFetching,
    isSuccess,
  } = useGetPostQuery(postId);

  let content;

  if (isFetching) {
    content = <Spinner text="Loading..." />;
  } else if (isSuccess) {
    content = (
      <section>
        <article className="post">
          <h2>{post.title}</h2>
          <p className="post-content">{post.content}</p>
          <div>
            <PostAuthor userId={post.user} />
            <TimeAgo timestamp={post.date} />
            <ReactionButtons post={post} />
          </div>
          <Link to={`/editPost/${post.id}`} className="button">
            Edit Post
          </Link>
        </article>
      </section>
    );
  }

  return <section>{content}</section>;
};
