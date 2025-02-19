import ApiService from './api.service';

class PetService {
  constructor() {
    this.api = new ApiService('http://localhost:5040/api/');
  }

  async getById(petId) {
    try {
      return this.api.get(`pets/${petId}`);
    } catch (error) {
      console.log(error);
    }
  }

  async update(petId, payload) {
    try {
      const response = this.api.put(`pets/${petId}`, payload);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getPetCollection(userId) {
    try {
      const response = this.api.get(`users/${userId}/pets`);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
export default new PetService();
