import { useState } from 'react';
import { Button, Input, Form, message } from 'antd';
import { Post } from '@/types/post';

interface PostFormProps {
  initialData?: Partial<Post>;
  onSubmit: (data: { title: string; body: string }) => Promise<void>;
  loading: boolean;
}

export const PostForm = ({ initialData, onSubmit, loading }: PostFormProps) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [body, setBody] = useState(initialData?.body || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !body) {
      message.error('Title and Body are required');
      return;
    }
    await onSubmit({ title, body });
  };

  return (
    <Form layout="vertical" onSubmitCapture={handleSubmit}>
      <Form.Item label="Title" required>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter post title"
        />
      </Form.Item>
      <Form.Item label="Body" required>
        <Input.TextArea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={4}
          placeholder="Enter post content"
        />
      </Form.Item>
      <Button type="primary" htmlType="submit" loading={loading}>
        {initialData ? 'Update Post' : 'Create Post'}
      </Button>
    </Form>
  );
};
