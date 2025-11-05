import React, { useState, useEffect } from 'react';
import { queueAPI, barberAPI } from '../services/api';
import { Clock, Users, Plus, RefreshCw, User } from 'lucide-react';

const CustomerPage = () => {
  const [queue, setQueue] = useState([]);
  const [stats, setStats] = useState({ queueSize: 0, estimatedWaitTime: 0 });
  const [barbers, setBarbers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    serviceType: 'Haircut',
  });

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const [queueRes, statsRes, barbersRes] = await Promise.all([
        queueAPI.getAllQueueEntries(),
        queueAPI.getQueueStats(),
        barberAPI.getAllBarbers(),
      ]);
      setQueue(queueRes.data);
      setStats(statsRes.data);
      setBarbers(barbersRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await queueAPI.addToQueue(formData);
      setFormData({ customerName: '', serviceType: 'Haircut' });
      setShowForm(false);
      fetchData();
      alert('Successfully joined the queue!');
    } catch (error) {
      console.error('Error adding to queue:', error);
      alert('Failed to join queue. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const availableBarbers = barbers.filter(b => b.status === 'available').length;
  const busyBarbers = barbers.filter(b => b.status === 'busy').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome to Color Cut and More</h1>
          <p className="text-gray-600">Join the queue and we'll serve you shortly</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">People in Queue</p>
                <p className="text-3xl font-bold text-gray-800">{stats.queueSize}</p>
              </div>
              <Users className="w-12 h-12 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Estimated Wait</p>
                <p className="text-3xl font-bold text-gray-800">{stats.estimatedWaitTime} min</p>
              </div>
              <Clock className="w-12 h-12 text-purple-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Available Stylists</p>
                <p className="text-3xl font-bold text-gray-800">{availableBarbers} / {barbers.length}</p>
              </div>
              <User className="w-12 h-12 text-green-500" />
            </div>
          </div>
        </div>

        {/* Join Queue Button */}
        {!showForm && (
          <div className="text-center mb-8">
            <button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center space-x-2 mx-auto"
            >
              <Plus className="w-6 h-6" />
              <span>Join Queue</span>
            </button>
          </div>
        )}

        {/* Join Queue Form */}
        {showForm && (
          <div className="max-w-md mx-auto mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Join the Queue</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Your Name</label>
                  <input
                    type="text"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Service Type</label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Haircut</option>
                    <option>Shave</option>
                    <option>Haircut & Shave</option>
                    <option>Hair Coloring</option>
                    <option>Styling</option>
                  </select>
                </div>

                <div className="flex space-x-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Joining...' : 'Join Queue'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Current Queue */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Current Queue</h2>
              <button
                onClick={fetchData}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Refresh"
              >
                <RefreshCw className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {queue.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">No one in queue. Be the first!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {queue.map((entry, index) => (
                  <div
                    key={entry.id}
                    className={`flex items-center justify-between p-4 rounded-lg border-2 ${
                      index === 0 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        index === 0 ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-700'
                      }`}>
                        {entry.position}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{entry.customerName}</p>
                        <p className="text-sm text-gray-600">{entry.serviceType}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {index === 0 && (
                        <span className="inline-block px-3 py-1 bg-green-500 text-white text-sm font-semibold rounded-full">
                          Next Up
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Barber Status */}
        <div className="max-w-3xl mx-auto mt-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Barbers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {barbers.map((barber) => (
                <div
                  key={barber.barberId}
                  className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg"
                >
                  <div>
                    <p className="font-semibold text-gray-800">{barber.barberName}</p>
                    <p className="text-sm text-gray-600">Chair #{barber.barberChairNo}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    barber.status === 'available' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {barber.status === 'available' ? 'Available' : 'Busy'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerPage;
