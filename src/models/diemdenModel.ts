// src/models/diemdenModel.ts
import { useState } from 'react';
import { getAllDestinations } from '@/services/Travel/Admin/diemDen';

export default () => {
  const [data, setData] = useState<any[]>([]);
  const [visible, setVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selected, setSelected] = useState<any>();

  // Hàm load dữ liệu từ service
  const loadDestinations = () => {
    try {
      const savedData = getAllDestinations();
      setData(savedData);
    } catch (error) {
      console.error('Lỗi khi load dữ liệu:', error);
    }
  };

  return {
    data,
    visible,
    isEdit,
    selected,
    setData,
    setVisible,
    setIsEdit,
    setSelected,
    loadDestinations
  };
};