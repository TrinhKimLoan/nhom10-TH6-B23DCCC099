import { Button, Col, Row, Empty, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import AddForm from './AddForm';
import DestinationCard from './DestinationCard';
import { Destination } from '@/services/Travel/Admin/typings';
import styles from './index.less';

export default function DiemDenPage() {
  const {
    data: destinations,
    setData: setDestinations,
    visible,
    setVisible,
  } = useModel('diemdenModel');

  const handleAddDestination = (newDestination: Destination) => {
    const newData = [...destinations, { ...newDestination, id: crypto.randomUUID() }];
    localStorage.setItem('destinations', JSON.stringify(newData));
    setDestinations(newData);
    setVisible(false);
    message.success('Thêm điểm đến thành công!');
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

      <AddForm visible={visible} onCancel={() => setVisible(false)} onSubmit={handleAddDestination} />

      {destinations.length === 0 ? (
        <Empty description="Chưa có điểm đến nào" />
      ) : (
        <Row gutter={[16, 16]}>
          {destinations.map((dest) => (
            <Col xs={24} sm={12} md={8} lg={6} key={dest.id}>
              <DestinationCard item={dest} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}
