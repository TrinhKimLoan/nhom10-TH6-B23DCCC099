// pages/Admin/DiemDen/components/DestinationCard.tsx
import React from 'react';
import { Card, Rate, Tag, Typography } from 'antd';
import { Destination } from '@/services/Travel/Admin/typings';

interface Props {
  item: Destination;
}

const DestinationCard: React.FC<Props> = ({ item }) => {
  return (
    <Card
      hoverable
      cover={<img alt={item.name} src={item.imageUrl} style={{ height: 200, objectFit: 'cover' }} />}
    >
      <Typography.Title level={4}>{item.name}</Typography.Title>
      <Tag color="blue">{item.category}</Tag>
      <p>{item.description}</p>
      <p><strong>Thời gian tham quan:</strong> {item.duration} giờ</p>
      {item.ticketPrice && <p><strong>Giá vé:</strong> {item.ticketPrice.toLocaleString()} VND</p>}
      <p><strong>Địa điểm:</strong> {item.location.displayName}</p>
      <Rate disabled defaultValue={item.rating} />
    </Card>
  );
};

export default DestinationCard;
