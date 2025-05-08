// pages/Admin/DiemDen/components/AddForm.tsx
import { Modal, Form, Input, InputNumber, Upload, Select, Rate, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { RcFile } from 'antd/lib/upload';
import LocationSearchInput from './LocationSearchInput';
import { DestinationLocation } from '@/services/Travel/Admin/typings';

interface AddFormProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => void;
}

export default function AddForm({ visible, onCancel, onSubmit }: AddFormProps) {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState<string>('');
  const [location, setLocation] = useState<DestinationLocation | null>(null);

  const handleImageUpload = (file: RcFile) => {
    const reader = new FileReader();
    reader.onload = e => {
      const base64 = e.target?.result as string;
      setImageUrl(base64);
      message.success('Tải ảnh thành công');
    };
    reader.readAsDataURL(file);
    return false; // prevent default upload
  };

  const handleFinish = (values: any) => {
    if (!imageUrl || !location) {
      message.error('Vui lòng chọn ảnh và địa điểm!');
      return;
    }
    onSubmit({
      ...values,
      imageUrl,
      location,
    });
    form.resetFields();
    setImageUrl('');
    setLocation(null);
  };

  return (
    <Modal
      title="Thêm điểm đến"
      visible={visible}
      onCancel={onCancel}
      onOk={() => form.submit()}
      okText="Lưu"
      destroyOnClose
    >
      <Form layout="vertical" form={form} onFinish={handleFinish}>
        <Form.Item name="name" label="Tên điểm đến" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Mô tả" rules={[{ required: true }]}>
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item label="Hình ảnh" required>
          <Upload beforeUpload={handleImageUpload} showUploadList={false}>
            <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
          </Upload>
          {imageUrl && <img src={imageUrl} alt="preview" style={{ marginTop: 8, width: '100%' }} />}
        </Form.Item>
        <Form.Item name="duration" label="Thời gian tham quan (giờ)" rules={[{ required: true }]}>
          <InputNumber min={1} max={24} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="ticketPrice" label="Giá vé (nếu có)">
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="Địa điểm" required>
          <LocationSearchInput onSelectLocation={setLocation} />
          {location && <p style={{ marginTop: 8 }}>✔ {location.displayName}</p>}
        </Form.Item>
        <Form.Item name="rating" label="Đánh giá" rules={[{ required: true }]}>
          <Rate />
        </Form.Item>
        <Form.Item name="category" label="Loại hình" rules={[{ required: true }]}>
          <Select placeholder="Chọn loại hình">
            <Select.Option value="biển">Biển</Select.Option>
            <Select.Option value="núi">Núi</Select.Option>
            <Select.Option value="thành phố">Thành phố</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}
