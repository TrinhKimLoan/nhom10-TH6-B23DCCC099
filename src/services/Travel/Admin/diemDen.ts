// src/services/diemDen.ts

import { Destination } from './typings';

const STORAGE_KEY = 'destinations';

export const getAllDestinations = (): Destination[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveDestination = (destination: Destination): void => {
  const current = getAllDestinations();
  const newData = [...current, destination];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
};

export const updateDestination = (updated: Destination): void => {
  const current = getAllDestinations();
  const newData = current.map((item) => (item.id === updated.id ? updated : item));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
};

export const deleteDestination = (id: string): void => {
  const current = getAllDestinations();
  const newData = current.filter((item) => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
};

export const clearDestinations = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};
