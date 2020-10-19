export function storage() {
    'use strict';

    let carInstance = localforage.createInstance({
        name: "cars"
    });

    return {
        add: (cars) => addCars(cars, carInstance),
        get: () => getCars(carInstance)
    }
}

const addCars = function (cars, carInstance) {
    return new Promise((resolve, reject) => {
        cars.forEach(eachCar => {
            carInstance.setItem(eachCar.key.toString(), eachCar.value).then(() => {
                resolve();
            });
        });
    });
};

const getCars = function (carInstance) {
    const limit = 3;
    let lastItemId = null;

    return new Promise((resolve, reject) => {
        carInstance.keys().then((keys) => {
            let index = keys.indexOf(lastItemId);
            if(index == -1) index = keys.length;
            if(index == 0) {
                resolve([]);
            }

            let splicedKeys = keys.splice(index - limit, limit);
            let obj = {};

            getLocalForageData(carInstance)
            .then(function (values) {
                resolve(values);
            })

            // splicedKeys.forEach((eachKey) => {
            //     obj[eachKey] = carInstance.getItem(eachKey);
            // });

            // let returnArr = Object.keys(obj).map(function (k) {
            //     return obj[k.toString()];
            // }).reverse();

            // lastItemId = returnArr[returnArr.length - 1].id.toString();
            // resolve(returnArr);
        });
    });
}

const getLocalForageData = function(carInstance) {
    return carInstance.keys().then(function (keys) {
        return Promise.all(keys.map(function (key) {
            return carInstance.getItem(key);
        }))
    });
}