import { template } from './template.js';

export function service() {
    'use strict';
    const apiUrlPath = 'https://bstavroulakis.com/pluralsight/courses/progressive-web-apps/service/';
    const apiUrlLatest = apiUrlPath.concat('latest-deals.php');

    loadMoreRequest(apiUrlLatest);
}

const loadMoreRequest = function (apiUrlLatest) {
    fetch(apiUrlLatest).then((response) => {
        return response.json();
    }).then(function (data) {
        template(data.cars);
    });
}