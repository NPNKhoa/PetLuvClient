import ApiService from './api.service';

class ServicesService {
  constructor() {
    this.api = new ApiService('http://localhost:5212/api/services');
  }

  async getServices(pageSize = 10) {
    const params = new URLSearchParams();
    params.append('pageSize', pageSize);

    try {
      const response = await this.api.get(`?${params.toString()}`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getServiceById(serviceId) {
    try {
      const response = await this.api.get(`/${serviceId}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default new ServicesService();
