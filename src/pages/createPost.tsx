import { PostForm } from '@/components/post/PostForm';
import { useCreatePost } from '@/hooks/features/useCreatePost';

const CreatePost = () => {
  const { loading, handleSubmit, error } = useCreatePost();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Create New Post</h1>
      {error && <p className="text-red-500 mb-4">{error.message}</p>}
      <PostForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
};

export default CreatePost;
