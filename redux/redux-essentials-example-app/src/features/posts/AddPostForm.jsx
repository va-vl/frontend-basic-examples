import * as React from 'react';
import { useSelector } from 'react-redux';
// 
import { selectAllUsers } from '../users/usersSlice';
import { useAddNewPostMutation } from '../api/apiSlice';
import { Spinner } from '../../components/Spinner';


export const AddPostForm = () => {
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [userId, setUserId] = React.useState('');
  
  const users = useSelector(selectAllUsers);
  const [addNewPosts, { isLoading }] = useAddNewPostMutation();

  const onTitleChanged = (event) => setTitle(event.target.value);
  const onContentChanged = (event) => setContent(event.target.value);
  const onAuthorChanged = (event) => setUserId(event.target.value);

  const canSave = Boolean(title) && Boolean(content) && Boolean(userId) && !isLoading;

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        await addNewPosts({ title, content, user: userId}).unwrap();
        setTitle('');
        setContent('');
        setUserId('');
      } catch(err) {
        console.log('Failed to save the post: ', err);
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
