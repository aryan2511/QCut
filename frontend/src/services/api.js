import axios from 'axios';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Barber API
export const barberAPI = {
  getAllBarbers: () => api.get('/barbers'),
  getBarberById: (id) => api.get(`/barbers/${id}`),
  createBarber: (barber) => api.post('/barbers', barber),
  updateBarber: (id, barber) => api.put(`/barbers/${id}`, barber),
  deleteBarber: (id) => api.delete(`/barbers/${id}`),
  updateBarberStatus: (id, status) => api.patch(`/barbers/${id}/status`, null, { params: { status } }),
  getAvailableBarbers: () => api.get('/barbers/available'),
  finishService: (id) => api.post(`/barbers/${id}/finish-service`),
};

// Queue API
export const queueAPI = {
  getAllQueueEntries: () => api.get('/queue'),
  getQueueEntryById: (id) => api.get(`/queue/${id}`),
  addToQueue: (queueEntry) => api.post('/queue', queueEntry),
  removeFromQueue: (id) => api.delete(`/queue/${id}`),
  callNextCustomer: (barberId) => api.post('/queue/call-next', null, { params: { barberId } }),
  completeService: (id) => api.post(`/queue/${id}/complete`),
  getQueueStats: () => api.get('/queue/stats'),
};

export default api;
