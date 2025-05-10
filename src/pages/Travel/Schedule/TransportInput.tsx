// pages/lichtrinh/TransportInput.tsx
import { InputNumber, Input, Space, Button, message } from 'antd';
import { useModel } from 'umi';
import { useEffect, useState } from 'react';

export default function TransportInput({ lichTrinhNgay, from, to }: any) {
  const { updateTransport, data } = useModel('lichtrinhModel');

  const lich = data.find((d) => d.ngay === lichTrinhNgay);
  const current = lich?.diChuyen?.find(
    (t) => t.from === from && t.to === to
  );

  const [form, setForm] = useState({ phuongTien: '', thoiGian: 0, chiPhi: 0 });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (current) {
      setForm({
        phuongTien: current.phuongTien,
        thoiGian: current.thoiGian,
        chiPhi: current.chiPhi,
      });
    }
  }, [current]);

  const save = () => {
    updateTransport(lichTrinhNgay, { 
        from, 
        to, 
        phuongTien: form.phuongTien,
        thoiGian: form.thoiGian,
        chiPhi: form.chiPhi
    });
    setEditMode(false);
    message.success('Đã lưu thông tin di chuyển');
    };

  const clear = () => {
    updateTransport(lichTrinhNgay, { from, to, remove: true });
    message.success('Đã xoá thông tin di chuyển');
  };

  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Input
        placeholder="Phương tiện"
        value={form.phuongTien}
        onChange={(e) => setForm({ ...form, phuongTien: e.target.value })}
        disabled={!editMode}
        style={{ flex: 1, minWidth: 150 }}
      />
      <InputNumber
        placeholder="Thời gian (phút)"
        value={form.thoiGian}
        onChange={(val) => setForm({ ...form, thoiGian: val ?? 0 })}
        disabled={!editMode}
        style={{ width: 150 }}
      />
      <InputNumber
        placeholder="Chi phí (VND)"
        value={form.chiPhi}
        onChange={(val) => setForm({ ...form, chiPhi: val ?? 0 })}
        disabled={!editMode}
        style={{ width: 150 }}
      />
      {editMode ? (
        <>
          <Button type="primary" onClick={save}>
            Lưu
          </Button>
          <Button danger onClick={clear}>
            Xoá
          </Button>
        </>
      ) : (
        <Button onClick={() => setEditMode(true)}>Chỉnh sửa</Button>
      )}
    </div>
  );
}