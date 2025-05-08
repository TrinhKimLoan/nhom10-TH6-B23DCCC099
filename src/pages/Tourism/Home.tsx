import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import {
  Destination,
  DestinationCategory,
  getFromLocalStorage,
  setToLocalStorage,
} from '@/models/tourism';
import { DestinationCard, FilterSortBar } from './HomeComponents';

const Home: React.FC = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<DestinationCategory | 'all'>('all');
  const [sortKey, setSortKey] = useState<string>('rating');

  useEffect(() => {
    const stored = getFromLocalStorage<Destination[]>('destinations');
    if (stored) {
      setDestinations(stored);
    } else {
      const sample: Destination[] = [
        {
          id: '1',
          name: 'Vịnh Hạ Long',
          description: '',
          image: 'https://source.unsplash.com/400x200/?halong',
          category: DestinationCategory.Bien,
          rating: 5,
          visitDurationHours: 8,
          cost: { food: 200, accommodation: 500, transport: 300 },
        },
        {
          id: '2',
          name: 'Đà Lạt',
          description: '',
          image: 'https://source.unsplash.com/400x200/?dalat',
          category: DestinationCategory.Nui,
          rating: 4,
          visitDurationHours: 12,
          cost: { food: 150, accommodation: 400, transport: 250 },
        },
      ];
      setDestinations(sample);
      setToLocalStorage('destinations', sample);
    }
  }, []);

  const filtered = destinations
    .filter((d) => categoryFilter === 'all' || d.category === categoryFilter)
    .sort((a, b) => {
      if (sortKey === 'rating') return b.rating - a.rating;
      const costA = a.cost.food + a.cost.accommodation + a.cost.transport;
      const costB = b.cost.food + b.cost.accommodation + b.cost.transport;
      return costA - costB;
    });

  return (
    <div style={{ padding: 16 }}>
      <h2>Khám phá điểm đến</h2>
      <FilterSortBar
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
        sortKey={sortKey}
        onSortChange={setSortKey}
      />
      <Row gutter={[16, 16]}>
        {filtered.map((d) => (
          <Col key={d.id} xs={24} sm={12} md={8} lg={6}>
            <DestinationCard destination={d} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;
