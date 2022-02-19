import axios from './axios';

const API_KEY = '01fefbd1f0e12049b00920c1d5a633fb';

export function getCityByLocationName(name) {
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
    return axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=1&appid=${API_KEY}`)
        .then(response => response.data.length ? response.data[0] : null);
        // .then(function (response) {
        // // handle success
        // console.log(response);
        // })
        // .catch(function (error) {
        // // handle error
        // console.log(error);
        // })
        // .then(function () {
        // // always executed
        // });
}
