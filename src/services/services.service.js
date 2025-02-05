import ApiService from './api.service';

class ServicesService {
  constructor() {
    this.api = new ApiService('http://localhost:5212/api/services/');
  }

  async getServices(params = {}) {
    const { pageIndex, pageSize } = params;
    const query = new URLSearchParams({ pageIndex, pageSize }).toString();

    try {
      const response = await this.api.get(`?${query}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getServiceById(serviceId) {
    try {
      const response = await this.api.get(`${serviceId}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default new ServicesService();
