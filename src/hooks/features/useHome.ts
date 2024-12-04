import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { postService } from '@/services/api';
import { Post } from '@/types/post';

export const useHome = () => {
  const [authToken, setAuthToken] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [isAuthModalVisible, setIsAuthModalVisible] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [postToDelete, setPostToDelete] = useState<number | null>(null);
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['posts', currentPage, authToken],
    queryFn: () => postService.fetchPosts(authToken, currentPage),
    enabled: !!authToken,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => postService.deletePost(id, authToken),
    onSuccess: () => {
      message.success('Post deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: () => {
      message.error('Failed to delete post!');
    },
  });

  const handleAuthSubmit = (name: string, token: string) => {
    setUserName(name);
    setAuthToken(token);
    setIsAuthModalVisible(false);
    localStorage.setItem('token', token);
    localStorage.setItem('name', name);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const filteredPosts = data?.data.filter((post: Post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const showDeleteConfirm = (id: number) => {
    setPostToDelete(id);
    setIsModalVisible(true);
  };

  const handleDelete = () => {
    if (postToDelete !== null) {
      deleteMutation.mutate(postToDelete);
      setIsModalVisible(false);
      setPostToDelete(null);
    }
  };

  const refreshPosts = () => {
    queryClient.invalidateQueries({ queryKey: ['posts'] });
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      setIsAuthModalVisible(false);
      setUserName(localStorage.getItem('name') || '');
    }
  }, []);

  return {
    authToken,
    userName,
    isAuthModalVisible,
    searchQuery,
    currentPage,
    isModalVisible,
    isLoading,
    error,
    filteredPosts,
    data,
    isDeleting: deleteMutation.isPending,
    handleAuthSubmit,
    handleSearchChange,
    handlePageChange,
    showDeleteConfirm,
    handleDelete,
    refreshPosts,
    setIsModalVisible,
  };
};
