// src/models/lichtrinhModel.ts

import { useState } from 'react';
import { getAllLichTrinh, saveLichTrinh, deleteLichTrinh, updateLichTrinh } from '@/services/Travel/Schedule/lichTrinh';
import type { LichTrinhNgay } from '@/services/Travel/Schedule/typings';

export default () => {
  const [data, setData] = useState<LichTrinhNgay[]>([]);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<LichTrinhNgay | null>(null);

  const loadLichTrinh = () => {
    const stored = getAllLichTrinh();
    setData(stored);
  };

  const addLichTrinh = (lichtrinh: LichTrinhNgay) => {
    saveLichTrinh(lichtrinh);
    loadLichTrinh();
  };

  const removeLichTrinh = (ngay: string) => {
    deleteLichTrinh(ngay);
    loadLichTrinh();
  };

  const editLichTrinh = (lichtrinh: LichTrinhNgay) => {
    updateLichTrinh(lichtrinh);
    loadLichTrinh();
  };
  const updateTransport = (ngay: string, transport: any) => {
  const current = getAllLichTrinh();
  const lich = current.find(d => d.ngay === ngay);
  
  if (!lich) return;

  if (transport.remove) {
    // Xóa thông tin di chuyển
    lich.diChuyen = lich.diChuyen.filter(
      t => !(t.from === transport.from && t.to === transport.to)
    );
  } else {
    // Cập nhật hoặc thêm mới
    const existing = lich.diChuyen.find(
      t => t.from === transport.from && t.to === transport.to
    );
    
    if (existing) {
      Object.assign(existing, transport);
    } else {
      lich.diChuyen.push(transport);
    }
  }

  updateLichTrinh(lich);
};

  return {
    data,
    visible,
    setVisible,
    selected,
    setSelected,
    loadLichTrinh,
    addLichTrinh,
    removeLichTrinh,
    editLichTrinh,
    updateTransport
  };
};
