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
    console.log('Cars data:', data);
  });
  

 async function getCurrencyData() {
    try {
        const response = await axios.get('https://baha24.com/api/v1/price')
        return response.data.USD;
    } catch (error) {
        console.error('❌ Error fetching currency data:', error.message);
        return [];
    }
}
getCurrencyData().then(data => {
    console.log('Currency data:', data);
  });
  async function getMarketPriceData() {
    try {
        const response = await axios.get('https://lm-models.s3.ir-thr-at1.arvanstorage.ir/market_prices.json')
        return response.data;
    } catch (error) {
        console.error('❌ Error fetching market price data:', error.message);
        return [];
    }
}
getMarketPriceData().then(data => {
    console.log('Market price data:', data);
});