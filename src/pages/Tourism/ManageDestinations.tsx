import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, InputNumber, Rate } from 'antd';
import {
  Destination,
  DestinationCategory,
  getFromLocalStorage,
  setToLocalStorage,
} from '@/models/tourism';
import { v4 as uuidv4 } from 'uuid';

const ManageDestinations: React.FC = () => {
  const [form] = Form.useForm();
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editing, setEditing] = useState<Destination | null>(null);

  useEffect(() => {
    const data = getFromLocalStorage<Destination[]>('destinations') || [];
    setDestinations(data);
  }, []);

  const saveToStorage = (list: Destination[]) => {
    setDestinations(list);
    setToLocalStorage('destinations', list);
  };

  const handleAdd = () => {
    form.resetFields();
    setEditing(null);
    setIsModalVisible(true);
  };

  const handleEdit = (record: Destination) => {
    form.setFieldsValue(record);
    setEditing(record);
    setIsModalVisible(true);
  };

  const handleDelete = (id: string) => {
    const updated = destinations.filter((d) => d.id !== id);
    saveToStorage(updated);
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const updated = editing
        ? destinations.map((d) => (d.id === editing.id ? { ...values, id: editing.id } : d))
        : [...destinations, { ...values, id: uuidv4() }];
      saveToStorage(updated);
      setIsModalVisible(false);
    });
  };

  const columns = [
    { title: 'Tên điểm đến', dataIndex: 'name', sorter: (a: Destination, b: Destination) => a.name.localeCompare(b.name) },
    { title: 'Loại hình', dataIndex: 'category', filters: Object.values(DestinationCategory).map(v => ({ text: v, value: v })), onFilter: (value: string | number | boolean, record: Destination) => record.category === value, },
    { title: 'Đánh giá', dataIndex: 'rating', sorter: (a: Destination, b: Destination) => a.rating - b.rating },
    {
      title: 'Hành động',
      render: (_: any, record: Destination) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>Sửa</Button>
          <Button danger type="link" onClick={() => handleDelete(record.id)}>Xóa</Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: 16 }}>
      <h2>Quản lý điểm đến</h2>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>Thêm điểm đến</Button>
      <Table rowKey="id" columns={columns} dataSource={destinations} />
      <Modal visible={isModalVisible} onCancel={() => setIsModalVisible(false)} onOk={handleSubmit} title={editing ? 'Sửa' : 'Thêm'}>
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Tên" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="image" label="Hình ảnh" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="category" label="Loại hình" rules={[{ required: true }]}>
            <Select options={Object.values(DestinationCategory).map((v) => ({ value: v, label: v }))} />
          </Form.Item>
          <Form.Item name="rating" label="Đánh giá" rules={[{ required: true }]}>
            <Rate />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageDestinations;
