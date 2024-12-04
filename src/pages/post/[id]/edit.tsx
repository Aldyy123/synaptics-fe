import { Button, Input, Form, message, Spin, Card } from 'antd';
import { useEditPost } from '@/hooks/features/useEditPost';
import { Post } from '@/types/post';
import { useRouter } from 'next/navigation';

const EditPost = () => {
  const { token, data, isLoading, error, isUpdating, handleSubmit } = useEditPost();
  const router = useRouter();

  if (!token) {
    return (
      <div className="container mx-auto p-4">
        <Card>
          <p className="text-red-500">Please log in to edit this post.</p>
          <Button onClick={() => router.push('/login')}>Go to Login</Button>
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
          <Button onClick={() => router.push('/')}>Back to Posts</Button>
        </Card>
      </div>
    );
  }

  const post = data as Post;

  return (
    <div className="container mx-auto p-4">
      <Card title="Edit Post" bordered={false} className="mb-4">
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            title: post.title,
            body: post.body,
          }}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please enter a title' }]}
          >
            <Input placeholder="Enter post title" />
          </Form.Item>
          
          <Form.Item
            name="body"
            label="Body"
            rules={[{ required: true, message: 'Please enter post content' }]}
          >
            <Input.TextArea rows={4} placeholder="Enter post content" />
          </Form.Item>

          <div className="flex gap-2">
            <Button type="primary" htmlType="submit" loading={isUpdating}>
              Update Post
            </Button>
            <Button onClick={() => router.push(`/post/${post.id}`)}>Cancel</Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default EditPost;
