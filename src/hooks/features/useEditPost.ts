import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { message } from 'antd';
import { useQuery, useMutation } from '@tanstack/react-query';
import { postService } from '@/services/api';

export const useEditPost = () => {
  const router = useRouter();
  const { id } = router.query;
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token') || '';
    setToken(storedToken);
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ['postDetail', id],
    queryFn: async () => {
      const response = await postService.fetchPost(Number(id), token);
      return response.data;
    },
    enabled: !!id && !!token,
  });

  const { mutate: updatePost, isPending: isUpdating } = useMutation({
    mutationFn: (values: { title: string; body: string }) =>
      postService.updatePost(Number(id), values, token),
    onSuccess: () => {
      message.success('Post updated successfully!');
      router.push(`/post/${id}`);
    },
    onError: () => {
      message.error('Failed to update post!');
    },
  });

  const handleSubmit = (values: { title: string; body: string }) => {
    updatePost(values);
  };

  return {
    token,
    data,
    isLoading,
    error,
    isUpdating,
    handleSubmit,
  };
}; 