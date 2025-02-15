import ApiService from './api.service';

class PetService {
  constructor() {
    this.api = new ApiService('http://localhost:5040/api/');
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
