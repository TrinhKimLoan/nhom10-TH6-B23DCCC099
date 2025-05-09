import { Button, Col, Row, Empty, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import AddForm from './AddForm';
import DestinationCard from './DestinationCard';
import { Destination } from '@/services/Travel/Admin/typings';
import styles from './index.less';
import { saveDestination, updateDestination, deleteDestination, getAllDestinations } from '@/services/Travel/Admin/diemDen';
import { useEffect } from 'react';

export default function DiemDenPage() {
  const {
    data: destinations,
    setData: setDestinations,
    visible,
    setVisible,
    isEdit,
    setIsEdit,
    selected,
    setSelected,
    loadDestinations
  } = useModel('diemdenModel');
  
  // Gọi hàm load dữ liệu khi component mount
  useEffect(() => {
    loadDestinations(); // Load dữ liệu từ localStorage
  }, []); // [] để chỉ chạy một lần

  // Xử lý Sửa
  const handleEdit = (destination: Destination) => {
    setSelected(destination);
    setIsEdit(true);
    setVisible(true);
  };

  // Xử lý Xóa (sửa lại)
const handleDelete = (id: string) => {
  try {
    deleteDestination(id); // Gọi hàm service xóa
    const updatedList = getAllDestinations(); // Lấy lại danh sách từ service
    setDestinations(updatedList); // Cập nhật state
    message.success('Đã xóa thành công!');
  } catch (error) {
    message.error('Xóa thất bại!');
  }
};

// Xử lý Submit Form (sửa lại)
const handleSubmit = (values: Destination) => {
  try {
    if (isEdit && selected) {
      updateDestination({ ...values, id: selected.id }); // Gọi service cập nhật
      message.success('Cập nhật thành công!');
    } else {
      saveDestination({ ...values, id: crypto.randomUUID() }); // Gọi service thêm mới
      message.success('Thêm mới thành công!');
    }
    const updatedList = getAllDestinations(); // Lấy lại danh sách từ service
    setDestinations(updatedList); // Cập nhật state
    setVisible(false);
  } catch (error) {
    message.error('Lỗi khi lưu dữ liệu!');
  }
};

  return (
    <div className={styles.container}>
      <h2>Quản lý điểm đến</h2>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setVisible(true)}
        style={{ marginBottom: 16 }}
      >
        Thêm điểm đến
      </Button>

      <AddForm visible={visible} 
      onCancel={() => {
          setVisible(false);
          setIsEdit(false);
          setSelected(null);
        }} 
      onSubmit={handleSubmit}
        initialValues={selected} // Truyền dữ liệu vào form khi sửa
        isEdit={isEdit} />

      {destinations.length === 0 ? (
        <Empty description="Chưa có điểm đến nào" />
      ) : (
        <Row gutter={[16, 16]}>
          {destinations.map((dest) => (
            <Col xs={24} sm={12} md={8} lg={6} key={dest.id}>
              <DestinationCard
                item={dest}
                isAdmin={true}
                onEdit={() => handleEdit(dest)}
                onDelete={() => handleDelete(dest.id)
                }
              />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}
