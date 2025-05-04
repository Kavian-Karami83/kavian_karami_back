const axios = require('axios');

const models = 'https://lm-models.s3.ir-thr-at1.arvanstorage.ir/cars.json';

axios.get(models)
    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
        console.log(error);
    });
