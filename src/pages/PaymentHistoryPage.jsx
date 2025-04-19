import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { FaSearch, FaInfoCircle } from 'react-icons/fa';
import formatCurrency from '../utils/formatCurrency';

const PaymentHistoryPage = () => {
  // Mock data for payment history
  const mockPayments = [
    {
      paymentId: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
      amount: 125000,
      createdAt: '2023-10-15T14:30:45Z',
      paymentMethodName: 'Thanh toán trực tiếp',
      paymentStatusName: 'Hoàn thành',
      updatedTime: '2023-10-15T14:35:22Z',
      userFullName: 'Nguyễn Văn A',
      transactionRef: 'TRX-2023101501',
    },
    {
      paymentId: '2b3c4d5e-6f7g-8h9i-0j1k-2l3m4n5o6p7q',
      amount: 75000,
      createdAt: '2023-10-10T09:15:30Z',
      paymentMethodName: 'VNPay',
      paymentStatusName: 'Hoàn thành',
      updatedTime: '2023-10-10T09:20:12Z',
      userFullName: 'Trần Thị B',
      transactionRef: 'TRX-2023101002',
    },
    {
      paymentId: '3c4d5e6f-7g8h-9i0j-1k2l-3m4n5o6p7q8r',
      amount: 200000,
      createdAt: '2023-09-28T16:45:20Z',
      paymentMethodName: 'Thanh toán trực tiếp',
      paymentStatusName: 'Đang xử lý',
      updatedTime: '2023-09-28T16:45:20Z',
      userFullName: 'Lê Văn C',
      transactionRef: 'TRX-2023092803',
    },
    {
      paymentId: '4d5e6f7g-8h9i-0j1k-2l3m-4n5o6p7q8r9s',
      amount: 50000,
      createdAt: '2023-09-15T11:20:15Z',
      paymentMethodName: 'Thanh toán trực tiếp',
      paymentStatusName: 'Thất bại',
      updatedTime: '2023-09-15T11:25:30Z',
      userFullName: 'Phạm Thị D',
      transactionRef: 'TRX-2023091504',
    },
    {
      paymentId: '5e6f7g8h-9i0j-1k2l-3m4n-5o6p7q8r9s0t',
      amount: 150000,
      createdAt: '2023-09-05T13:10:45Z',
      paymentMethodName: 'VNPay',
      paymentStatusName: 'Hoàn thành',
      updatedTime: '2023-09-05T13:15:22Z',
      userFullName: 'Hoàng Văn E',
      transactionRef: 'TRX-2023090505',
    },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const user = useSelector((state) => state.auth.user);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPayments = mockPayments.filter((payment) =>
    payment.transactionRef.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (paymentId) => {
    // Implement view details functionality
    console.log('Xem chi tiết thanh toán:', paymentId);
    // Could navigate to a detail page or open a modal
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case 'Hoàn thành':
        return 'bg-green-100 text-green-800';
      case 'Đang xử lý':
        return 'bg-yellow-100 text-yellow-800';
      case 'Thất bại':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const columns = [
    {
      field: 'createdAt',
      headerName: 'Thời gian tạo',
      headerAlign: 'center',
      align: 'center',
      width: 180,
      valueFormatter: (params) => {
        return dayjs(params.value).format('HH:mm DD/MM/YYYY');
      },
    },
    {
      field: 'amount',
      headerName: 'Số tiền',
      headerAlign: 'center',
      align: 'right',
      width: 180,
      valueFormatter: (params) => {
        console.log(params);
        return formatCurrency(params);
      },
    },
    {
      field: 'paymentMethodName',
      headerName: 'Phương thức thanh toán',
      headerAlign: 'center',
      width: 250,
    },
    {
      field: 'paymentStatusName',
      headerName: 'Trạng thái',
      headerAlign: 'center',
      width: 150,
      renderCell: (params) => (
        <div
          className={`px-3 py-2 rounded-full text-xs font-semibold text-center my-auto mt-3 ${getStatusStyles(
            params.value
          )}`}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: 'actions',
      headerName: 'Thao tác',
      width: 100,
      sortable: false,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <button
          onClick={() => handleViewDetails(params.row.paymentId)}
          className='text-primary hover:text-primary-dark transition-colors'
          title='Xem chi tiết'
        >
          <FaInfoCircle size={20} />
        </button>
      ),
    },
  ];

  return (
    <div className='h-full w-full'>
      <h1 className='text-3xl font-cute tracking wider mb-6 text-primary'>
        Lịch Sử Thanh Toán
      </h1>

      <div className='mb-6 relative'>
        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
          <FaSearch className='text-tertiary-dark' />
        </div>
        <input
          type='text'
          placeholder='Tìm kiếm theo mã giao dịch'
          className='pl-10 pr-4 py-2 border border-tertiary-dark rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className='bg-white rounded-lg shadow-md h-[calc(100vh-250px)] w-[79%] overflow-hidden mx-auto'>
        <DataGrid
          rows={filteredPayments}
          columns={columns}
          s
          getRowId={(row) => row.paymentId}
          pageSizeOptions={[5, 10, 25]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
          }}
          disableRowSelectionOnClick
          sx={{
            '& .MuiDataGrid-cell:focus': {
              outline: 'none',
            },
            border: 'none',
          }}
        />
      </div>
    </div>
  );
};

export default PaymentHistoryPage;
