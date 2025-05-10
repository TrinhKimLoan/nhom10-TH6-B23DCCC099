// pages/lichtrinh/index.tsx
import { useEffect } from 'react';
import { Button, Card, Modal, Popconfirm } from 'antd';
import { PlusOutlined} from '@ant-design/icons';
import { useModel } from 'umi';
import FormLichTrinh from './Form';
import Item from './Item';

export default function LichTrinhPage() {
  const {
    data,
    visible,
    setVisible,
    selected,
    setSelected,
    loadLichTrinh,
    removeLichTrinh,
  } = useModel('lichtrinhModel');
  const {loadDestinations} = useModel('diemdenModel');

  useEffect(() => {
    loadLichTrinh();
  }, []);
  // Gọi hàm load dữ liệu khi component mount
  useEffect(() => {
    loadDestinations(); // Load dữ liệu từ localStorage
  }, []); // [] để chỉ chạy một lần


  const sortedData = [...data].sort((a, b) => a.ngay.localeCompare(b.ngay));

  return (
    <div style={{ padding: 24, display: 'flex', gap: 16, overflowX: 'auto' }}>
        <Card style={{ width: 200, flexShrink: 0 }}>
            <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
                setSelected(null);
                setVisible(true);
            }}
            block
            >
            Thêm lịch trình
            </Button>
      </Card>

      {sortedData.map((item) => (
        <Card
          key={item.ngay}
          title={`Lịch trình ${item.ngay}`}
          style={{ width: 250, flexShrink: 0 }}
          extra={
            <>
              <Button
                type="link"
                onClick={() => {
                  setSelected(item);
                  setVisible(true);
                }}
              >
                Sửa
              </Button>
              <Popconfirm
                title="Xác nhận xoá lịch trình này?"
                onConfirm={() => removeLichTrinh(item.ngay)}
              >
                <Button type="link" danger>
                  Xoá
                </Button>
              </Popconfirm>
            </>
          }
        >
          <Item item={item} />
        </Card>
      ))}

      <Modal
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
        destroyOnClose
        title={selected ? 'Sửa lịch trình' : 'Tạo lịch trình mới'}
      >
        <FormLichTrinh />
      </Modal>
    </div>
  );
}