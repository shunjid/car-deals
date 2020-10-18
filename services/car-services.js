export function service() {
    'use strict';
    
    return {
        loadMoreRequest: ({url, builder}) => loadMoreRequest(url, builder),
        loadCar: ({id, url, css}) => loadCarPage(id, url, css)
    }
}

const loadCarPage = function(carId, apiUrlCar, materialDesignLite) {
    fetch(apiUrlCar + carId).then((response) => {
        return response.text();
    }).then(function (data) {
        const mdlData = materialDesignLite + data;
        document.body.insertAdjacentHTML('beforeend', mdlData);
    }).catch(() => {
        alert("Oops, cannot retrieve page");
    });
}

const loadMoreRequest = function (apiUrlLatest, cardBuilderTemplate) {
    fetch(apiUrlLatest).then((response) => {
        return response.json();
    }).then(function (data) {
        cardBuilderTemplate.append(data.cars);
    });
}