import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// 
import { addNewPost } from './postsSlice';
import { selectAllUsers } from '../users/usersSlice';

export const AddPostForm = () => {
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [userId, setUserId] = React.useState('');
  const [addRequestStatus, setAddRequestStatus] = React.useState('idle');

  const onTitleChanged = (event) => setTitle(event.target.value);
  const onContentChanged = (event) => setContent(event.target.value);
  const onAuthorChanged = (event) => setUserId(event.target.value);

  const dispatch = useDispatch();

  const users = useSelector(selectAllUsers);
  const canSave = Boolean(title) && Boolean(content) && Boolean(userId) && addRequestStatus === 'idle';

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        setAddRequestStatus('pending');
        await dispatch(addNewPost({ title, content, user: userId})).unwrap();
        setTitle('');
        setContent('');
        setUserId('');
      } catch(err) {
        console.log('Failed to save the post: ', err);
      } finally {
        setAddRequestStatus('idle');
      }
    }
  };

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value="" />
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save post
        </button>
      </form>
    </section>
  );
};
