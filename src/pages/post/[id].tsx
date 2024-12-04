import { Spin, Card, Button } from 'antd';
import { usePostDetail } from '@/hooks/features/usePostDetail';
import DeleteModal from '@/components/DeleteModal';

const PostDetail = () => {
  const {
    post,
    isLoading,
    error,
    token,
    isDeleting,
    isDeleteModalOpen,
    handleDelete,
    handleLoginRedirect,
    handleBackToHome,
    toggleDeleteModal,
  } = usePostDetail();

  if (!token) {
    return (
      <div className="container mx-auto p-4">
        <Card>
          <p className="text-red-500">Please log in to view this post.</p>
          <Button onClick={handleLoginRedirect}>Go to Login</Button>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 flex justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (error instanceof Error) {
    return (
      <div className="container mx-auto p-4">
        <Card>
          <p className="text-red-500">Error: {error.message}</p>
          <Button onClick={handleBackToHome}>Back to Posts</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Card 
        title={post.title}
        bordered={false}
        className="mb-4"
      >
        <div className="prose max-w-none">
          <p>{post.body}</p>
          <p className="text-sm text-gray-500">Author ID: {post.user_id}</p>
        </div>
        <div className="mt-4">
          <Button 
            type="primary" 
            danger 
            onClick={() => toggleDeleteModal(true)}
          >
            Delete Post
          </Button>
        </div>
      </Card>

      <Button 
        onClick={handleBackToHome}
        className="mt-4"
      >
        Back to Posts
      </Button>

      <DeleteModal
        isModalVisible={isDeleteModalOpen}
        handleDelete={handleDelete}
        setIsModalVisible={toggleDeleteModal}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default PostDetail;
