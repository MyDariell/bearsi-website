const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8787';

class APIClient {
  async get(endpoint) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(error.error || 'API request failed');
    }
    return response.json();
  }

  async post(endpoint, data) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(error.error || 'API request failed');
    }
    return response.json();
  }

  async uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/api/upload`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Upload failed' }));
      throw new Error(error.error || 'File upload failed');
    }
    return response.json();
  }

  // Product endpoints
  async getProducts() {
    return this.get('/api/products');
  }

  async getProductBySlug(slug) {
    return this.get(`/api/products/${slug}`);
  }

  // Location endpoints
  async getLocations() {
    return this.get('/api/locations');
  }

  // Timeslot endpoints
  async getTimeslots(locationId) {
    return this.get(`/api/timeslots?locationId=${locationId}`);
  }

  // Order endpoints
  async createOrder(orderData) {
    return this.post('/api/orders', orderData);
  }
}

export const api = new APIClient();
