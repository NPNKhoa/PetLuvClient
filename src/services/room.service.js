import ApiService from './api.service';

class RoomService {
  constructor() {
    this.api = new ApiService('http://localhost:5030/api/rooms/');
  }

  async getAllRooms(params = {}) {
    const { pageIndex, pageSize } = params;
    const query = new URLSearchParams({
      pageIndex,
      pageSize,
    }).toString();

    try {
      const response = await this.api.get(`?${query}`);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getRoomById(roomId) {
    try {
      const response = await this.api.get(`${roomId}`);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default new RoomService();
