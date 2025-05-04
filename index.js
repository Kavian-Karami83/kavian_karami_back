const axios = require('axios');
const fs = require('fs/promises');
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

async function processAndSaveData() {
    const [cars, marketPrices, usd] = await Promise.all([
        getCarsData(),
        getMarketPriceData(),
        getCurrencyData()
    ]);

    const enrichedCars = cars.map(car => {
        const match = marketPrices.find(marketCar =>
            marketCar.brand === car.brand &&
            marketCar.model === car.model &&
            marketCar.year === car.year
        );

        const priceDiff = match ? car.price - match.average_price : 0;
        const mileageDiff = match ? car.mileage - match.average_mileage : 0;
        const priceUsd = car.price / usd.sell;

        return {
            ...car,
            price_diff_from_average: priceDiff,
            mileage_diff_from_average: mileageDiff,
            price_usd: Math.round(priceUsd)
        };
    });

    try {
        await fs.writeFile('cars_data.json', JSON.stringify(enrichedCars, null, 2), 'utf-8');
        console.log('Enriched car data saved to cars_data.json');
    } catch (error) {
        console.error('Error saving data file:', error.message);
    }
}
processAndSaveData();