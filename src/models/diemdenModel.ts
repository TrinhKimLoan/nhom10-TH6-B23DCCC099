// src/models/diemdenModel.ts
import { useState } from 'react';

export default () => {
  const [data, setData] = useState<any[]>([]);
  const [visible, setVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selected, setSelected] = useState<any>();

  return {
    data,
    visible,
    isEdit,
    selected,
    setData,
    setVisible,
    setIsEdit,
    setSelected,
  };
};