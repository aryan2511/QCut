import React, { useState, useEffect } from 'react';
import { barberAPI, queueAPI } from '../services/api';
import { Plus, Edit2, Trash2, UserCheck, UserX, RefreshCw, AlertCircle, Phone } from 'lucide-react';

const DashboardPage = () => {
  const [barbers, setBarbers] = useState([]);
  const [queue, setQueue] = useState([]);
  const [stats, setStats] = useState({ queueSize: 0, estimatedWaitTime: 0 });
  const [showBarberForm, setShowBarberForm] = useState(false);
  const [editingBarber, setEditingBarber] = useState(null);
  const [barberForm, setBarberForm] = useState({
    barberName: '',
    barberPhone: '',
    barberChairNo: '',
  });

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 3000); // Poll every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const [barbersRes, queueRes, statsRes] = await Promise.all([
        barberAPI.getAllBarbers(),
        queueAPI.getAllQueueEntries(),
        queueAPI.getQueueStats(),
      ]);
      setBarbers(barbersRes.data);
      setQueue(queueRes.data);
      setStats(statsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleBarberSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingBarber) {
        await barberAPI.updateBarber(editingBarber.barberId, barberForm);
      } else {
        await barberAPI.createBarber(barberForm);
      }
      setBarberForm({ barberName: '', barberPhone: '', barberChairNo: '' });
      setShowBarberForm(false);
      setEditingBarber(null);
      fetchData();
    } catch (error) {
      console.error('Error saving barber:', error);
      alert('Failed to save barber');
    }
  };

  const handleEditBarber = (barber) => {
    setEditingBarber(barber);
    setBarberForm({
      barberName: barber.barberName,
      barberPhone: barber.barberPhone,
      barberChairNo: barber.barberChairNo,
    });
    setShowBarberForm(true);
  };

  const handleDeleteBarber = async (id) => {
    if (window.confirm('Are you sure you want to delete this barber?')) {
      try {
        await barberAPI.deleteBarber(id);
        fetchData();
      } catch (error) {
        console.error('Error deleting barber:', error);
        alert('Failed to delete barber');
      }
    }
  };

  const handleCallNext = async (barberId) => {
    try {
      await queueAPI.callNextCustomer(barberId);
      fetchData();
    } catch (error) {
      console.error('Error calling next customer:', error);
      alert('No customers in queue or barber is busy');
    }
  };

  const handleCompleteService = async (queueEntryId) => {
    try {
      await queueAPI.completeService(queueEntryId);
      fetchData();
    } catch (error) {
      console.error('Error completing service:', error);
      alert('Failed to complete service');
    }
  };

  const handleRemoveFromQueue = async (id) => {
    if (window.confirm('Remove this customer from queue?')) {
      try {
        await queueAPI.removeFromQueue(id);
        fetchData();
      } catch (error) {
        console.error('Error removing from queue:', error);
        alert('Failed to remove from queue');
      }
    }
  };

  const inProgressEntries = barbers
    .filter(b => b.status === 'busy')
    .map(b => {
      const entry = queue.find(q => q.barberId === b.barberId);
      return entry ? { ...entry, barber: b } : null;
    })
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Shop Dashboard</h1>
            <p className="text-gray-600">Manage barbers and queue</p>
          </div>
          <button
            onClick={fetchData}
            className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-all"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Refresh</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm">Total Barbers</p>
            <p className="text-3xl font-bold text-gray-800">{barbers.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm">Queue Size</p>
            <p className="text-3xl font-bold text-blue-600">{stats.queueSize}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm">Available Barbers</p>
            <p className="text-3xl font-bold text-green-600">
              {barbers.filter(b => b.status === 'available').length}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Barbers Section */}
          <div>
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-800">Barbers</h2>
                  <button
                    onClick={() => {
                      setShowBarberForm(true);
                      setEditingBarber(null);
                      setBarberForm({ barberName: '', barberPhone: '', barberChairNo: '' });
                    }}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Barber</span>
                  </button>
                </div>
              </div>

              <div className="p-6">
                {barbers.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <AlertCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No barbers added yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {barbers.map((barber) => (
                      <div key={barber.barberId} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-800">{barber.barberName}</h3>
                            <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                              <Phone className="w-4 h-4" />
                              <span>{barber.barberPhone}</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">Chair #{barber.barberChairNo}</p>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditBarber(barber)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                              title="Edit"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteBarber(barber.barberId)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            barber.status === 'available'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {barber.status === 'available' ? 'Available' : 'Busy'}
                          </span>
                          
                          {barber.status === 'available' && stats.queueSize > 0 && (
                            <button
                              onClick={() => handleCallNext(barber.barberId)}
                              className="flex items-center space-x-2 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                            >
                              <UserCheck className="w-4 h-4" />
                              <span>Call Next</span>
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Barber Form Modal */}
            {showBarberForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    {editingBarber ? 'Edit Barber' : 'Add New Barber'}
                  </h3>
                  <form onSubmit={handleBarberSubmit} className="space-y-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Name</label>
                      <input
                        type="text"
                        value={barberForm.barberName}
                        onChange={(e) => setBarberForm({ ...barberForm, barberName: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Phone</label>
                      <input
                        type="tel"
                        value={barberForm.barberPhone}
                        onChange={(e) => setBarberForm({ ...barberForm, barberPhone: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Chair Number</label>
                      <input
                        type="number"
                        value={barberForm.barberChairNo}
                        onChange={(e) => setBarberForm({ ...barberForm, barberChairNo: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="flex space-x-3">
                      <button
                        type="submit"
                        className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                      >
                        {editingBarber ? 'Update' : 'Add'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowBarberForm(false);
                          setEditingBarber(null);
                        }}
                        className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>

          {/* Queue Section */}
          <div>
            {/* In Progress */}
            {inProgressEntries.length > 0 && (
              <div className="bg-white rounded-lg shadow mb-6">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-800">In Progress</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {inProgressEntries.map((entry) => (
                      <div key={entry.id} className="border-2 border-yellow-300 bg-yellow-50 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-800">{entry.customerName}</h3>
                            <p className="text-sm text-gray-600">{entry.serviceType}</p>
                            <p className="text-sm text-gray-600 mt-1">
                              Barber: {entry.barber.barberName} (Chair #{entry.barber.barberChairNo})
                            </p>
                          </div>
                          <button
                            onClick={() => handleCompleteService(entry.id)}
                            className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                          >
                            <UserCheck className="w-4 h-4" />
                            <span>Complete</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Waiting Queue */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800">Waiting Queue</h2>
              </div>
              <div className="p-6">
                {queue.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <UserX className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No customers in queue</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {queue.map((entry, index) => (
                      <div
                        key={entry.id}
                        className={`flex items-center justify-between p-4 rounded-lg border-2 ${
                          index === 0 ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                            index === 0 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-700'
                          }`}>
                            {entry.position}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">{entry.customerName}</p>
                            <p className="text-sm text-gray-600">{entry.serviceType}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveFromQueue(entry.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Remove"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
