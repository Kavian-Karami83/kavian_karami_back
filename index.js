const axios = require('axios');
async function getCarsData() {
    try {
        const response = await axios.get('https://lm-models.s3.ir-thr-at1.arvanstorage.ir/cars.json');
        return response.data;
    } catch (error) {
        console.error('Error fetching cars data:', error.message);
        return [];
    }
}


async function getCurrencyData() {
    try {
        const response = await axios.get('https://baha24.com/api/v1/price');
        return response.data.USD;
    } catch (error) {
        console.error('Error fetching currency data:', error.message);
        return [];
    }
}


async function getMarketPriceData() {
    try {
        const response = await axios.get('https://lm-models.s3.ir-thr-at1.arvanstorage.ir/market_prices.json');
        return response.data;
    } catch (error) {
        console.error('Error fetching market price data:', error.message);
        return [];
    }
}


async function main() {
    const [carsData, currencyData, marketPriceData] = await Promise.all([
        getCarsData(),
        getCurrencyData(),
        getMarketPriceData()
    ]);

    console.log('Cars:', carsData.length);
    console.log('Currency (USD):', currencyData);
    console.log('Market Prices:', marketPriceData.length);
}

main();
