export function service() {
    'use strict';
    
    return {
        loadMoreRequest: ({url, builder, store}) => loadMoreRequest(url, builder, store),
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

const loadMoreRequest = function (apiUrlLatest, cardBuilderTemplate, clientSideStorage) {
    fetch(apiUrlLatest + "?carId=" + clientSideStorage.getLastCarId()).then((response) => {
        console.log(apiUrlLatest + "?carId=" + clientSideStorage.getLastCarId());
        return response.json();
    }).then(function (data) {
        clientSideStorage.add(data.cars).then(() => {
            loadMore(clientSideStorage, cardBuilderTemplate);           
        });
    });
}

const loadMore = function (clientSideStorage, cardBuilderTemplate) {
    clientSideStorage.get().then((cars) => {
        cardBuilderTemplate.append(cars);  
    });
}