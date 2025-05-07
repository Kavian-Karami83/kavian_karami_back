const fs = require('fs/promises');

async function loadData() {
  try {
    const data = await fs.readFile('cars_data.json', 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading cars_data.json:', error.message);
    return [];
  }
}
// Q1
function getMostCommonCar(cars) {
  const map = new Map();

  cars.forEach(({ brand, model }) => {
    const key = `${brand} ${model}`;
    map.set(key, (map.get(key) || 0) + 1);
  });

  let max = 0;
  let mostCommon = '';
  for (const [key, count] of map.entries()) {
    if (count > max) {
      max = count;
      mostCommon = key;
    }
  }

  console.log(`Q1: Most common car is ${mostCommon} with ${max} entries.`);
}
// Q2
function getTop3ExpensiveCars(cars) {
  const sorted = [...cars].sort((a, b) => b.price - a.price);
  const top3 = sorted.slice(0, 3);
  console.log('Q2: Top 3 most expensive cars:');
  top3.forEach(car => {
    console.log(`- ${car.brand} ${car.model} (${car.year}) → ${car.price.toLocaleString()} IRR`);
  });
}
// Q3
function getUsdPriceDifference(cars) {
  const sorted = [...cars].sort((a, b) => a.price_usd - b.price_usd);
  const diff = sorted[sorted.length - 1].price_usd - sorted[0].price_usd;
  console.log(`Q3: USD price difference is $${diff.toFixed(2)}`);
}
// Q4
function getCarCountByColor(cars) {
  const map = {};

  cars.forEach(({ color }) => {
    map[color] = (map[color] || 0) + 1;
  });

  console.log('Q4: Car count by color:');
  Object.entries(map).forEach(([color, count]) => {
    console.log(`- ${color}: ${count}`);
  });
}
// Q5
function getLowestPriceMileagePerModel(cars) {
  const map = new Map();

  cars.forEach(car => {
    const key = `${car.brand}-${car.model}`;
    const existing = map.get(key);

    if (
      !existing ||
      (car.price < existing.price && car.mileage < existing.mileage)
    ) {
      map.set(key, car);
    }
  });

  console.log('Q5: Cars with lowest price & mileage per brand-model:');
  for (const [key, car] of map.entries()) {
    console.log(`- ${key}: ${car.price} IRR, ${car.mileage} km`);
  }
}
// Q6
function getTop5FairPricedCars(cars) {
  const sorted = [...cars].sort((a, b) =>
    Math.abs(a.price_diff_from_average) - Math.abs(b.price_diff_from_average)
  );
  const top5 = sorted.slice(0, 5);

  console.log('Q6: Top 5 fair-priced cars:');
  top5.forEach(car => {
    console.log(`- ${car.brand} ${car.model} (${car.year}) → Diff: ${car.price_diff_from_average}`);
  });
}
// Q7
function getTop5FairMileageCars(cars) {
  const sorted = [...cars].sort((a, b) =>
    Math.abs(a.mileage_diff_from_average) - Math.abs(b.mileage_diff_from_average)
  );
  const top5 = sorted.slice(0, 5);

  console.log('Q7: Top 5 fair-mileage cars:');
  top5.forEach(car => {
    console.log(`- ${car.brand} ${car.model} (${car.year}) → Diff: ${car.mileage_diff_from_average}`);
  });
}

async function runAnalysis() {
  const cars = await loadData();

  getMostCommonCar(cars);
  getTop3ExpensiveCars(cars);
  getUsdPriceDifference(cars);
  getCarCountByColor(cars);
  getLowestPriceMileagePerModel(cars);
  getTop5FairPricedCars(cars);
  getTop5FairMileageCars(cars);
}

runAnalysis();
