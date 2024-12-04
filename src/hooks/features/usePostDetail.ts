import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQuery, useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import { postService } from '@/services/api';
import { Post } from '@/types/post';

export const usePostDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [token, setToken] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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

  const { mutate: deletePost, isPending: isDeleting } = useMutation({
    mutationFn: () => postService.deletePost(Number(id), token),
    onSuccess: () => {
      message.success('Post deleted successfully!');
      router.push('/');
    },
    onError: () => {
      message.error('Failed to delete post!');
    },
  });

  const handleDelete = () => {
    deletePost();
  };

  const handleLoginRedirect = () => {
    router.push('/login');
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  const toggleDeleteModal = (isOpen: boolean) => {
    setIsDeleteModalOpen(isOpen);
  };

  return {
    post: data as Post,
    isLoading,
    error,
    token,
    isDeleting,
    isDeleteModalOpen,
    handleDelete,
    handleLoginRedirect,
    handleBackToHome,
    toggleDeleteModal,
  };
};
