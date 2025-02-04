class AuthService {
  constructor() {
    this.tokenKey = 'token';
  }

  setToken(token) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  clearToken() {
    localStorage.removeItem(this.tokenKey);
  }

  isAuthenticated() {
    return this.getToken() !== null;
  }
}
export default new AuthService();
