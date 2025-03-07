import ApiService from './api.service';

class BookingService {
  constructor() {
    this.api = new ApiService('http://localhost:5010/api/bookings/');
  }

  async getBookings(params = {}) {
    const { pageIndex, pageSize } = params;
    const query = new URLSearchParams({ pageIndex, pageSize }).toString();

    try {
      const response = await this.api.get(`?${query}`);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async createBooking(payload) {
    try {
      const response = await this.api.post('', payload);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default new BookingService();
