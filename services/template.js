export function template() {
    return {
        append : (cars) => appendCars(cars)
    };
}

const appendCars = function (cars) {
    let cardHtml = "";

    cars.forEach(eachCar => {
        cardHtml = cardHtml.concat(generateCard(eachCar.value));
    });

    document.getElementById('loader').hidden = true;
    document.getElementById('actionButton').style.visibility = 'visible';
    document.querySelector("#carGrid").insertAdjacentHTML('beforeend', cardHtml);
}

const generateCard = function (car) {
    const title = car.brand + ' ' + car.model + car.year;
    const cardInfo = {
        '{{title}}': title,
        '{{image}}': car.image,
        '{{details-id}}': car.details_id,
        '{{price}}': car.price
    };
    let template = document.querySelector('#car-card').innerHTML;

    for (let [key, value] of Object.entries(cardInfo)) {
        template = template.replace(key, value);
    }

    return template;
}