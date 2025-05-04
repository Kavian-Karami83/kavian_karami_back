const axios = require('axios');

async function getCarsData() {
    try {
      const response = await axios.get('https://lm-models.s3.ir-thr-at1.arvanstorage.ir/cars.json');
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching cars data:', error.message);
      return [];
    }
  }
  getCarsData().then(data => {
    console.log('🚗 Cars Data:', data);
  });
  