import React from 'react';
import { Card, Rate, Select } from 'antd';
import { Destination, DestinationCategory } from '@/models/tourism';

export const DestinationCard: React.FC<{ destination: Destination }> = ({ destination }) => (
  <Card
    hoverable
    cover={<img src={destination.image} alt={destination.name} style={{ height: 200, objectFit: 'cover' }} />}
  >
    <Card.Meta
      title={destination.name}
      description={
        <>
          <p>Loại hình: {destination.category}</p>
          <Rate disabled value={destination.rating} />
        </>
      }
    />
  </Card>
);

interface FilterSortBarProps {
  categoryFilter: DestinationCategory | 'all';
  onCategoryChange: (value: DestinationCategory | 'all') => void;
  sortKey: string;
  onSortChange: (value: string) => void;
}

export const FilterSortBar: React.FC<FilterSortBarProps> = ({
  categoryFilter,
  onCategoryChange,
  sortKey,
  onSortChange,
}) => (
  <div style={{ marginBottom: 16, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
    <Select
      value={categoryFilter}
      onChange={onCategoryChange}
      style={{ width: 200 }}
      options={[
        { value: 'all', label: 'Tất cả loại hình' },
        { value: DestinationCategory.Bien, label: 'Biển' },
        { value: DestinationCategory.Nui, label: 'Núi' },
        { value: DestinationCategory.ThanhPho, label: 'Thành phố' },
      ]}
    />
    <Select
      value={sortKey}
      onChange={onSortChange}
      style={{ width: 200 }}
      options={[
        { value: 'rating', label: 'Đánh giá cao nhất' },
        { value: 'cost', label: 'Chi phí thấp nhất' },
      ]}
    />
  </div>
);
