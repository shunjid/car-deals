export function storage() {
    "use strict";

    let carInstance = localforage.createInstance({
        name: "cars",
    });
    let lastItemId = {
        value: null,
    };

    return {
        add: (cars) => addCars(cars, carInstance),
        get: () => getCars(carInstance, lastItemId),
        getLastCarId: () => lastItemId.value,
    };
}

const addCars = function (cars, carInstance) {
    return new Promise((resolve, reject) => {
        cars.forEach((eachCar) => {
            carInstance.setItem(eachCar.key.toString(), eachCar.value).then(() => {
                resolve();
            });
        });
    });
};

const getCars = function (carInstance, lastItemId) {
    const limit = 3;

    return new Promise((resolve) => {
        carInstance.keys().then((allKeys) => {
            let startAt = 0;
            let endAt = allKeys.length;


            getLocalForageData(carInstance).then(function (allCars) {
                if (lastItemId.value === null) startAt = 0;
                else {
                    const newlyFetchedFirstItem = allCars[allCars.length - limit];
                    startAt = allCars.findIndex(x => x.id == newlyFetchedFirstItem.id);
                }


                let result = allCars.reverse();
                result = result.slice(startAt, endAt);
                lastItemId.value = allCars[allCars.length - 1].id;
                resolve(result);
            });
        });
    });
};

const getLocalForageData = function (carInstance) {
    return carInstance.keys().then(function (keys) {
        return Promise.all(
            keys.map(function (key, index) {
                return carInstance.getItem(key);
            })
        );
    });
};