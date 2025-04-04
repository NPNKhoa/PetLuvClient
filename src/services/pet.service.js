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

  async createAsync(payload) {
    const {
      petName = '',
      petDateOfBirth = null,
      petGender = '',
      petFurColor = '',
      petWeight = '',
      petDesc = '',
      petFamilyRole = '',
      breedId = '',
      isVisible = true,
      customerId = '',
      imageFiles = [],
    } = payload;

    const formData = new FormData();

    formData.append('petName', petName);
    formData.append('petDateOfBirth', petDateOfBirth);
    formData.append('petGender', petGender);
    formData.append('petFurColor', petFurColor);
    formData.append('petWeight', petWeight);
    formData.append('petDesc', petDesc);
    formData.append('petFamilyRole', petFamilyRole);
    formData.append('breedId', breedId);
    formData.append('isVisible', isVisible);
    formData.append('customerId', customerId);

    imageFiles.forEach((file) => {
      formData.append(`imageFiles`, file);
    });

    try {
      return this.api.post(`pets/`, formData);
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
