export function template(cars) {
    appendCars(cars);
}

const appendCars = function (cars) {
    let cardHtml = "";

    cars.forEach(eachCar => {
        cardHtml = cardHtml.concat(generateCard(eachCar.value));
    });

    document.querySelector("#carGrid").insertAdjacentHTML('beforeend', cardHtml);
}

const generateCard = function (car) {
    let template = document.querySelector('#car-card').innerHTML;
    const title = car.brand + ' ' + car.model + car.year;

    template = template.replace('{{title}}', title);
    template = template.replace('{{image}}', car.image);
    template = template.replace('{{price}}', car.price);

    return template;
}