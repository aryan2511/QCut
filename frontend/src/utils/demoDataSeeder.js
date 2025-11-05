import { barberAPI, queueAPI } from '../services/api';

/**
 * Seeds the database with demo data for testing
 * Run this from browser console: seedDemoData()
 */
export const seedDemoData = async () => {
  try {
    console.log('🌱 Starting to seed demo data...');

    // Demo barbers
    const demoBarbers = [
      { barberName: 'Mike Johnson', barberPhone: '555-0101', barberChairNo: 1 },
      { barberName: 'Sarah Williams', barberPhone: '555-0102', barberChairNo: 2 },
      { barberName: 'James Brown', barberPhone: '555-0103', barberChairNo: 3 },
    ];

    // Create barbers
    console.log('Adding barbers...');
    for (const barber of demoBarbers) {
      await barberAPI.createBarber(barber);
      console.log(`✅ Added barber: ${barber.barberName}`);
    }

    // Demo customers in queue
    const demoCustomers = [
      { customerName: 'John Doe', serviceType: 'Haircut' },
      { customerName: 'Jane Smith', serviceType: 'Haircut & Shave' },
      { customerName: 'Bob Wilson', serviceType: 'Shave' },
      { customerName: 'Alice Johnson', serviceType: 'Hair Coloring' },
      { customerName: 'Charlie Brown', serviceType: 'Styling' },
    ];

    // Add customers to queue
    console.log('Adding customers to queue...');
    for (const customer of demoCustomers) {
      await queueAPI.addToQueue(customer);
      console.log(`✅ Added customer: ${customer.customerName}`);
    }

    console.log('🎉 Demo data seeded successfully!');
    console.log('📊 Summary:');
    console.log(`   - Barbers: ${demoBarbers.length}`);
    console.log(`   - Customers in queue: ${demoCustomers.length}`);
    console.log('');
    console.log('🔄 Refresh the page to see the data!');

    return {
      success: true,
      barbers: demoBarbers.length,
      customers: demoCustomers.length,
    };
  } catch (error) {
    console.error('❌ Error seeding demo data:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Clears all data from the database
 * WARNING: This will delete all barbers and queue entries!
 */
export const clearAllData = async () => {
  try {
    if (!window.confirm('⚠️ Are you sure you want to delete ALL data? This cannot be undone!')) {
      return { success: false, message: 'Cancelled by user' };
    }

    console.log('🗑️ Starting to clear all data...');

    // Get all barbers and queue entries
    const [barbersRes, queueRes] = await Promise.all([
      barberAPI.getAllBarbers(),
      queueAPI.getAllQueueEntries(),
    ]);

    // Delete all queue entries
    console.log('Deleting queue entries...');
    for (const entry of queueRes.data) {
      await queueAPI.removeFromQueue(entry.id);
      console.log(`✅ Deleted queue entry: ${entry.customerName}`);
    }

    // Delete all barbers
    console.log('Deleting barbers...');
    for (const barber of barbersRes.data) {
      await barberAPI.deleteBarber(barber.barberId);
      console.log(`✅ Deleted barber: ${barber.barberName}`);
    }

    console.log('🎉 All data cleared successfully!');
    console.log('🔄 Refresh the page to see the changes!');

    return {
      success: true,
      deletedBarbers: barbersRes.data.length,
      deletedQueueEntries: queueRes.data.length,
    };
  } catch (error) {
    console.error('❌ Error clearing data:', error);
    return { success: false, error: error.message };
  }
};

// Export functions to window for easy access from console
if (typeof window !== 'undefined') {
  window.seedDemoData = seedDemoData;
  window.clearAllData = clearAllData;
}

export default { seedDemoData, clearAllData };
