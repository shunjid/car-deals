export function storage() {
    'use strict';

    let carInstance = localforage.createInstance({
        name: "cars"
    });

    return {
        add: (cars) => addCars(cars, carInstance)
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