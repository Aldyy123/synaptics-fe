import React from 'react';
import { Modal } from 'antd';

interface DeleteModalProps {
  isModalVisible: boolean;
  handleDelete: () => void;
  setIsModalVisible: (visible: boolean) => void;
  isDeleting: boolean;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isModalVisible, handleDelete, setIsModalVisible, isDeleting }) => {
  return (
    <Modal
      title="Confirm Deletion"
      visible={isModalVisible}
      onOk={handleDelete}
      onCancel={() => setIsModalVisible(false)}
      okText="Yes, Delete"
      cancelText="No, Cancel"
      confirmLoading={isDeleting}
      okButtonProps={{
        className: 'bg-red-500 hover:!bg-red-200 text-white transition duration-300 ease-in-out dark:bg-red-600 dark:hover:bg-red-700',
        classNames: {
          icon: 'text-white',
        },
      }}
    >
      <p>Are you sure you want to delete this post? This action cannot be undone.</p>
    </Modal>
  );
};

export default DeleteModal;
