export const service = () => {
    "use strict";

    return {
        loadMoreRequest: ({
                url,
                builder,
                store
            }) =>
            loadMoreRequest(url, builder, store),
        loadCar: ({
            id,
            url,
            css
        }) => loadCarPage(id, url, css),
    };
}

const loadCarPage = function (carId, apiUrlCar, materialDesignLite) {
    fetch(apiUrlCar.concat(carId))
        .then((response) => {
            return response.text();
        })
        .then(function (data) {
            const mdlData = materialDesignLite + data;
            document.body.insertAdjacentHTML("beforeend", mdlData);
        })
        .catch(() => {
            alert("Oops, cannot retrieve page");
        });
};

const loadMoreRequest = function (apiUrlLatest, cardBuilderTemplate, clientSideStorage) {
    const lastCarId = clientSideStorage.getLastCarId();
    const extensionForMoreCars = "?carId=".concat(lastCarId);
    const url =
        lastCarId == null ?
        apiUrlLatest :
        apiUrlLatest.concat(extensionForMoreCars);

    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then(function (data) {
            clientSideStorage.add(data.cars).then(() => {
                loadMore(clientSideStorage, cardBuilderTemplate);
            });
        });
};

const loadMore = function (clientSideStorage, cardBuilderTemplate) {
    clientSideStorage.get().then((cars) => {
        cardBuilderTemplate.append(cars);
    });
};