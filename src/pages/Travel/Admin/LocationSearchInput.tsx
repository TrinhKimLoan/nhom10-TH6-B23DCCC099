import { AutoComplete, Spin } from 'antd';
import React, { useState } from 'react';
import type { DefaultOptionType } from 'antd/es/select';
import { debounce } from 'lodash';

interface LocationSearchInputProps {
  onSelectLocation: (value: {
    lat: number;
    lon: number;
    displayName: string;
  }) => void;
}

const LocationSearchInput: React.FC<LocationSearchInputProps> = ({ onSelectLocation }) => {
  const [options, setOptions] = useState<DefaultOptionType[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = debounce(async (value: string) => {
    if (!value) return;
    setLoading(true);
    try {
        const res = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}&countrycodes=vn&limit=5&addressdetails=1`
          );
      const data = await res.json();
      const results = data.map((item: any) => ({
        value: item.display_name,
        label: item.display_name,
        lat: parseFloat(item.lat),
        lon: parseFloat(item.lon),
      }));
      setOptions(results);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  }, 500); // Chờ 500ms sau khi ngừng gõ;

  const handleSelect = (value: string, option: any) => {
    onSelectLocation({
      lat: option.lat,
      lon: option.lon,
      displayName: value,
    });
  };

  return (
    <AutoComplete
      style={{ width: '100%' }}
      options={options}
      onSearch={handleSearch}
      onSelect={handleSelect}
      placeholder="Nhập tên địa điểm"
    >
      {loading && <Spin size="small" />}
    </AutoComplete>
  );
};

export default LocationSearchInput;
