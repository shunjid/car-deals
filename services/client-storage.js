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

    return new Promise((resolve, reject) => {
        carInstance.keys().then((allKeys) => {
            let startAt = 0;
            let endAt = allKeys.length;

            if (lastItemId.value === null) startAt = 0;
            else {
                console.log(allKeys);
                console.log(`finding: ${lastItemId.value}`);
                startAt = allKeys.indexOf(lastItemId.value.toString());
            }

            getLocalForageData(carInstance).then(function (values) {
                let result = values.reverse();
                console.log(`Start: ${startAt} End: ${endAt}`);
                result = result.slice(startAt, endAt);
                console.log(result);
                lastItemId.value = values[values.length - 1].id;
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