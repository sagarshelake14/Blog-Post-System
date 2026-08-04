import React from 'react';
import { useSelector } from 'react-redux';
import { Container, PostForm } from '../components';

function AddPost() {
  const authStatus = useSelector((state) => state.auth.status);

  // Optional: Guard against logged-out users trying to access this page directly
  if (!authStatus) {
    return (
      <div className="w-full py-8 text-center">
        <Container>
          <h1 className="text-2xl font-bold">Please log in to add a post.</h1>
        </Container>
      </div>
    );
  }

  return (
    <div className='py-8'>
      <Container>
        <PostForm />
      </Container>
    </div>
  );
}

export default AddPost;