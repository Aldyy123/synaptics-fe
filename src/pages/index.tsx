import { useRouter } from 'next/router';
import { Button, Card, Input, Pagination, Spin, Space } from 'antd';
import AuthDialog from '@/components/AuthDialog';
import Link from 'next/link';
import { Post } from '@/types/post';
import { useHome } from '@/hooks/features/useHome';
import DeleteModal from '@/components/DeleteModal';

const Home = () => {
  const router = useRouter();
  const {
    userName,
    isAuthModalVisible,
    searchQuery,
    currentPage,
    isModalVisible,
    isLoading,
    error,
    filteredPosts,
    data,
    handleAuthSubmit,
    handleSearchChange,
    handlePageChange,
    showDeleteConfirm,
    handleDelete,
    refreshPosts,
    setIsModalVisible,
    isDeleting,
  } = useHome();

  return (
    <div className="container mx-auto p-6">
      {isAuthModalVisible && <AuthDialog onSubmit={handleAuthSubmit} />}

      <h1 className="text-3xl font-semibold mb-4 dark:text-white">Welcome, {userName}</h1>

      <Space direction="vertical" className="mb-6 w-full">
        <Input
          placeholder="Search by title"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <Button onClick={() => router.push('/createPost')} className="px-6 py-3 rounded-lg shadow-md">
          Create Post
        </Button>
      </Space>

      {isLoading && (
        <div className="flex justify-center">
          <Spin size="large" />
        </div>
      )}
      {error && <p className="text-red-500">{error.message}</p>}

      <div className="space-y-6">
        {filteredPosts?.map((post: Post) => (
          <Card key={post.id}>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{post.title}</h2>
            <p className="text-gray-700 dark:text-gray-300 mt-2">{post.body}</p>
            <div className="flex gap-2 items-center mt-4">
              <Button type="link" onClick={() => router.push(`/post/${post.id}`)}>
                View Details
              </Button>
              <Link href={`/post/${post.id}/edit`}>
                <span className="text-blue-600 dark:text-blue-400">Edit</span>
              </Link>
              <Button type="default" danger onClick={() => showDeleteConfirm(post.id)}>
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Pagination
        current={currentPage}
        total={data?.meta.pagination.total || 0}
        pageSize={10}
        onChange={handlePageChange}
        className="mt-6"
        align='center'
      />

      <Button onClick={refreshPosts} className="mt-4">
        Refresh Posts
      </Button>

      <DeleteModal
        isModalVisible={isModalVisible}
        handleDelete={handleDelete}
        setIsModalVisible={setIsModalVisible}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default Home;
