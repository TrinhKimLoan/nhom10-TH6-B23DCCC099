// pages/Admin/DiemDen/components/DestinationCard.tsx
import React from 'react';
import { Card, Rate, Tag, Typography, Button, Popconfirm } from 'antd';
import { Destination } from '@/services/Travel/Admin/typings';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

interface Props {
  item: Destination;
  isAdmin?: boolean; // Thêm prop này
  onEdit?: () => void;
  onDelete?: () => void;
}

const DestinationCard: React.FC<Props> = ({ item, onEdit, onDelete, isAdmin = false }) => {
  return (
    <Card
      hoverable
      cover={<img alt={item.name} src={item.imageUrl} style={{ height: 200, objectFit: 'cover' }} />}
      actions={ isAdmin ? [
        <Button type="link" icon={<EditOutlined />} onClick={onEdit} />,
        <Popconfirm
          title="Bạn có chắc chắn muốn xóa?"
          onConfirm={onDelete}
          okText="Xóa"
          cancelText="Hủy"
        >
          <Button type="link" danger icon={<DeleteOutlined />} />
        </Popconfirm>,
      ]: []}
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
