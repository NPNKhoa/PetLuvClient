export default function getStatusColor(statusName) {
  if (!statusName) return '#e0e0e0';

  const status = statusName?.toLowerCase();

  if (status?.includes('hủy') || status?.includes('huy')) {
    // Cancelled
    return '#ffb3ba'; // Pastel red
  } else if (status?.includes('xác nhận') || status?.includes('xac nhan')) {
    // Confirmed
    return '#b3ffb3'; // Pastel green
  } else if (status?.includes('hoàn thành') || status?.includes('hoan thanh')) {
    // Completed
    return '#b3c6ff'; // Pastel blue
  } else if (status?.includes('xử lý') || status?.includes('xu ly')) {
    // Processing
    return '#fff7b3'; // Pastel yellow (darker than pure pastel yellow for better visibility)
  } else {
    return '#e0e0e0'; // Pastel gray (for unknown status)
  }
}
