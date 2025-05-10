// pages/lichtrinh/Form.tsx
import { useEffect, useState } from 'react';
import { Button, DatePicker, Form, InputNumber, Select, message } from 'antd';
import dayjs from 'dayjs';
import { useModel } from 'umi';
import { Destination } from '@/services/Travel/Admin/typings';

export default function FormLichTrinh() {
  const [form] = Form.useForm();
  const {
    data,
    addLichTrinh,
    editLichTrinh,
    visible,
    setVisible,
    selected,
  } = useModel('lichtrinhModel');
  const {data: diemDenList} = useModel('diemdenModel');

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    if (selected) {
      form.setFieldsValue({
        ngay: dayjs(selected.ngay),
        order: selected.diemDenIds.reduce((acc, id, index) => {
          acc[id] = index + 1;
          return acc;
        }, {} as Record<string, number>),
      });
      setSelectedIds(selected.diemDenIds);
    } else {
      form.resetFields();
      setSelectedIds([]);
    }
  }, [selected]);

  const handleFinish = (values: any) => {
    const ngay = values.ngay.format('YYYY-MM-DD');
    const existing = data.find((d) => d.ngay === ngay);

    if (existing && (!selected || selected.ngay !== ngay)) {
      message.error('Đã tồn tại lịch trình cho ngày này');
      return;
    }

    const newItem = {
      ngay,
      diemDenIds: selectedIds,
      diChuyen: selected?.diChuyen || [], // Giữ lại thông tin di chuyển nếu đang edit,
    };

    selected ? editLichTrinh(newItem) : addLichTrinh(newItem);
    setVisible(false);
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Form.Item name="ngay" label="Chọn ngày" rules={[{ required: true }]}> 
        <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
      </Form.Item>

      <Form.Item name="diemDenIds" label="Chọn điểm đến">
        <Select
          mode="multiple"
          value={selectedIds}
          onChange={setSelectedIds}
          options={diemDenList.map((d: Destination) => ({ label: d.name, value: d.id }))}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Lưu lịch trình
        </Button>
      </Form.Item>
    </Form>
  );
}
