// src/services/Travel/lichTrinh.ts

import type { LichTrinhNgay } from './typings';

const STORAGE_KEY = 'lichtrinh';

export const getAllLichTrinh = (): LichTrinhNgay[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveLichTrinh = (lichtrinh: LichTrinhNgay): void => {
  const current = getAllLichTrinh();
  const newData = [...current, lichtrinh].sort((a, b) => a.ngay.localeCompare(b.ngay));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
};

export const deleteLichTrinh = (ngay: string): void => {
  const current = getAllLichTrinh();
  const newData = current.filter(item => item.ngay !== ngay);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
};

export const updateLichTrinh = (lichtrinh: LichTrinhNgay): void => {
  const current = getAllLichTrinh();
  const newData = current.map(item =>
    item.ngay === lichtrinh.ngay ? lichtrinh : item
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
};