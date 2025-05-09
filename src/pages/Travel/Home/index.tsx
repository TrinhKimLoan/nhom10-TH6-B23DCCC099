import { useState } from 'react';
import { Row, Col, Select, Slider, Rate, Card } from 'antd';
import DestinationCard from '@/pages/Travel/Admin/DestinationCard';
import { Destination } from '@/services/Travel/Admin/typings';
import { getAllDestinations } from '@/services/Travel/Admin/diemDen';

const HomePage = () => {
  const [destinations, setDestinations] = useState<Destination[]>(getAllDestinations());
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [minRating, setMinRating] = useState<number>(0);

  // Xử lý filter
  const filteredDestinations = destinations
    .filter(dest => 
      selectedCategory === 'all' || dest.category === selectedCategory
    )
    .filter(dest => 
      (dest.ticketPrice || 0) >= priceRange[0] && 
      (dest.ticketPrice || 0) <= priceRange[1]
    )
    .filter(dest => 
      dest.rating >= minRating
    )
    .sort((a, b) => b.rating - a.rating); // Sắp xếp theo rating giảm dần

  return (
    <div style={{ padding: 24 }}>
      <h1>Khám phá điểm đến</h1>
      
      {/* Bộ lọc */}
      <Card style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {/* Lọc theo loại hình */}
          <Select
            placeholder="Chọn loại hình"
            onChange={setSelectedCategory}
            style={{ width: 200 }}
          >
            <Select.Option value="all">Tất cả</Select.Option>
            <Select.Option value="biển">Biển</Select.Option>
            <Select.Option value="núi">Núi</Select.Option>
            <Select.Option value="thành phố">Thành phố</Select.Option>
          </Select>

          {/* Lọc theo giá vé */}
          <div style={{ width: 300 }}>
            <p>Giá vé (VND):</p>
            <Slider
              range
              min={0}
              max={1000000}
              step={50000}
              defaultValue={[0, 1000000]}
              onChange={setPriceRange}
            />
          </div>

          {/* Lọc theo đánh giá */}
          <div>
            <p>Đánh giá tối thiểu:</p>
            <Rate 
              defaultValue={0} 
              onChange={setMinRating} 
            />
          </div>
        </div>
      </Card>

      {/* Danh sách điểm đến */}
      <Row gutter={[16, 16]}>
        {filteredDestinations.map((dest) => (
          <Col xs={24} sm={12} md={8} lg={6} key={dest.id}>
            <DestinationCard 
              item={dest} 
              isAdmin={false} // Ẩn nút Sửa/Xóa
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default HomePage;