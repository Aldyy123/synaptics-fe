import axios from 'axios';
import { Post, ApiResponse } from '@/types/post';

const BASE_URL = 'https://gorest.co.in/public-api';

export const postService = {
  fetchPosts: async (token: string, page: number = 1, limit: number = 10): Promise<ApiResponse<Post[]>> => {
    const response = await axios.get(`${BASE_URL}/posts`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { page, limit },
    });
    return response.data;
  },

  fetchPost: async (id: number, token: string): Promise<ApiResponse<Post>> => {
    const response = await axios.get(`${BASE_URL}/posts/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  createPost: async (data: Omit<Post, 'id'>, token: string): Promise<ApiResponse<Post>> => {
    const response = await axios.post(`${BASE_URL}/posts`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  updatePost: async (id: number, data: Partial<Post>, token: string): Promise<ApiResponse<Post>> => {
    const response = await axios.put(`${BASE_URL}/posts/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  deletePost: async (id: number, token: string): Promise<void> => {
    await axios.delete(`${BASE_URL}/posts/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  fetchUsers: async (token: string): Promise<ApiResponse<any[]>> => {
    const response = await axios.get(`${BASE_URL}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};
