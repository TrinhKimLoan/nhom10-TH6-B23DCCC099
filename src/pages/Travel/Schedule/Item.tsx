// pages/lichtrinh/Item.tsx
import { useModel } from 'umi';
import { Descriptions, Divider, Typography } from 'antd';
import TransportInput from './TransportInput';

export default function Item({ item }: { item: any }) {
  const {data: diemDenList} = useModel('diemdenModel');

  const diemDenTheoThuTu = item.diemDenIds.map((id: string) =>
    diemDenList.find((d) => d.id === id)
  );

  return (
    <div>
      {diemDenTheoThuTu.map((diem, index) => (
        <div key={diem?.id}>
          <Descriptions
            size="small"
            column={1}
            style={{ background: '#fafafa', padding: 8, borderRadius: 4 }}
          >
            <Descriptions.Item label="Tên điểm đến">
              <Typography.Text strong>{diem?.name}</Typography.Text>
            </Descriptions.Item>
            <Descriptions.Item label="Thời gian tham quan">
              {diem?.duration} giờ
            </Descriptions.Item>
          </Descriptions>

          {index < diemDenTheoThuTu.length - 1 && (
            <div style={{ margin: '12px 0' }}>
              <TransportInput
                lichTrinhNgay={item.ngay}
                from={diem?.id}
                to={diemDenTheoThuTu[index + 1]?.id}
              />
              <Divider />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}