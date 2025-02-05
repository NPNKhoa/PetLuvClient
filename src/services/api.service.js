import authService from './auth.service';

class ApiService {
  constructor(baseUrl = import.meta.env.VITE_API_BASE_URL) {
    this.baseUrl = baseUrl || 'http://localhost:5000/api';
    this.authService = authService;
  }

  async request(endpoint, method = 'GET', body = null, headers = {}) {
    const url = new URL(endpoint, this.baseUrl);
    const accessToken = this.authService.getToken();

    const options = {
      method,
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : '',
        ...headers,
      },
    };

    if (body instanceof FormData) {
      options.body = body;
      delete options.headers['Content-Type'];
    } else if (body && method !== 'GET' && method !== 'HEAD') {
      options.body = JSON.stringify(body);
      options.headers['Content-Type'] = 'application/json';
    }

    try {
      const response = await fetch(url, options);

      if (response.status === 401) {
        localStorage.removeItem('token');
        throw new Error('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại');
      }

      const data = await response.json();

      console.log(data);

      if (!data.flag) {
        console.log(data.message);
        throw new Error(
          data.message || 'Something went wrong. Please try again!'
        );
      }

      return data;
    } catch (error) {
      if (error instanceof TypeError) {
        console.error('Lỗi mạng! Kiểm tra kết nối mạng và thử lại sau.');
        throw new Error('Lỗi mạng! Kiểm tra kết nối mạng và thử lại sau.');
      }
      console.error('API error:', error);
      throw error;
    }
  }

  get(endpoint, headers = {}) {
    return this.request(endpoint, 'GET', null, headers);
  }

  post(endpoint, body, headers = {}) {
    return this.request(endpoint, 'POST', body, headers);
  }

  put(endpoint, body, headers = {}) {
    return this.request(endpoint, 'PUT', body, headers);
  }

  delete(endpoint, headers = {}) {
    return this.request(endpoint, 'DELETE', null, headers);
  }
}

export default ApiService;
