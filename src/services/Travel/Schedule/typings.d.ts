// Thông tin di chuyển giữa 2 điểm đến
export interface TransportInfo {
  from: string;     // ID điểm đến trước
  to: string;       // ID điểm đến sau
  phuongTien: string;  // phương tiện
  thoiGian: number; // thời gian di chuyển (phút)
  chiPhi: number;     // chi phí di chuyển
}

// Lịch trình cho 1 ngày cụ thể
export interface LichTrinhNgay {
  ngay: string;              // định danh ngày (vd: "2025-05-10")
  diemDenIds: string[];      // danh sách ID các điểm đến trong ngày
  diChuyen: TransportInfo[]; // thông tin di chuyển giữa các điểm
}