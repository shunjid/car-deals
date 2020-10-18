import { service } from './car-services.js';
import { template } from './template.js';

const apiUrlPath = 'https://bstavroulakis.com/pluralsight/courses/progressive-web-apps/service/';
const apiUrlLatest = apiUrlPath.concat('latest-deals.php');
const apiUrlCar = apiUrlPath.concat('car.php?carId=');
const materialDesignLite = document.querySelector('#mdl').innerHTML;

const cardBuilderTemplate = template();
const carServices = service();

carServices.loadMoreRequest({
    url: apiUrlLatest,
    builder: cardBuilderTemplate
});

window.pageEvents = {
    loadCarPage: function (carId) {
        carServices.loadCar({
            id: carId,
            url: apiUrlCar,
            css: materialDesignLite
        });
    }
}
