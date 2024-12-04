import { useState, useEffect } from 'react';
import { message } from 'antd';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from '@tanstack/react-query';
import { postService } from '@/services/api';

export const useCreatePost = () => {
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const router = useRouter();
  const token = localStorage.getItem('token') || '';

  const { data: users, error } = useQuery({
    queryKey: ['users', token],
    queryFn: () => postService.fetchUsers(token),
    enabled: !!token,
  });

  const { mutate, isPending: isCreating } = useMutation({
    mutationFn: (data: { title: string; body: string, user_id: number }) => {
      return postService.createPost(data, token);
    },
    onSuccess: () => {
      message.success('Post created successfully');
      router.push('/');
    },
    onError: () => {
      message.error('Failed to create post');
    },
  });

  useEffect(() => {
    if (users && users.data.length > 0) {
      const randomUser = users.data[Math.floor(Math.random() * users.data.length)];
      setUserId(randomUser.id);
    }
  }, [users]);

  const handleSubmit = async (data: { title: string; body: string }) => {
    if (!userId) {
      message.error('User ID is missing');
      return;
    }   

    const postData = {
      ...data,
      user_id: userId,
    };

    setLoading(true);
    await mutate(postData);
    setLoading(false);
  };

  return {
    loading,
    handleSubmit,
    error
  };
}; 