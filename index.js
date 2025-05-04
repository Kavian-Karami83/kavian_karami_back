const axios = require('axios');

const models = 'https://lm-models.s3.ir-thr-at1.arvanstorage.ir/cars.json';
const currency = 'https://baha24.com/api/v1/price';

axios.get(models)
    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
        console.log(error);
    });

axios.get(currency)
    .then(function (response) {
        console.log(response.data.USD);


    })
    .catch(function (error) {
        console.log(error);
    }

    );