const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const sun = document.querySelector('.sun');
const cat = document.querySelector('.catgif');
const error404 = document.querySelector('.not-found');
const input = document.querySelector('.search-box input');

search.addEventListener('click',() => {
    const APIKey = '41c02d2fec4f93fda1df462e01987a36'
    const city = document.querySelector('.search-box input').value;
    

    if  (city === '')
         return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    .then(response => response.json())
    .then(json => {
            if(json.cod === '404'){
                container.style.height = '404px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                sun.style.display = 'none';
                cat.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return
            }


   

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');
            const sunrise = document.querySelector('.sun .sunrise span');
            const sunset = document.querySelector('.sun .sunset span');
            const catgif = document.querySelector('.catgif img')
            
// rajouter air quality, UV, heure locale 

            switch (json.weather[0].main){
                case 'Clear': 
                image.src ='img/icons-meteo/été.gif';
                catgif.src = 'img/gif-chats/chat-soleil.gif' // rajouter image correspondante
                break;

                case 'Rain': 
                image.src ='img/icons-meteo/pluie-intense.gif';
                catgif.src = 'img/gif-chats/chat-pluie.gif'
                ; // rajouter image correspondante
                break;

                case 'Snow': 
                image.src ='img/icons-meteo/neige-légère.gif';
                catgif.src = 'img/gif-chats/chat-neige3.gif' // rajouter image correspondante
                break;

                case 'Clouds': 
                // image.src ='img/icons-meteo/neige-légère.gif'; neige
                // image.src ='img/icons-meteo/brouillard-de-jour.gif'; brouillard
                // image.src ='img/icons-meteo/temps-venteux.gif'; vent
                image.src ='img/icons-meteo/nuage.gif';
                catgif.src = 'img/gif-chats/chat-beau-temps.gif';
                // catgif.src = 'img/gif-chats/chat-neige3.gif'
                // catgif.src = 'img/gif-chats/chat-qui-fuis.gif'
                // catgif.src = 'img/gif-chats/chat-vent2.gif'  // rajouter image correspondante
                break;

                case 'Mist': 
                image.src ='img/icons-meteo/brouillard-de-jour.gif';
                catgif.src = 'img/gif-chats/chat-qui-fuis.gif' // rajouter image correspondante
                break;

                case 'Wind': 
                image.src ='img/icons-meteo/temps-venteux.gif';
                catgif.src = 'img/gif-chats/chat-vent2.gif' // rajouter image correspondante
                break;

                default:
                    image.src='';
                    catgif.src = '';
            }

            const timestamp = `${json.sys.sunrise}`;
            const date = new Date(timestamp * 1000);
            const heureLever = date.toLocaleTimeString();

            const timestamp2 = `${json.sys.sunset}`;
            const date2 = new Date(timestamp2 * 1000);
            const heureCoucher = date2.toLocaleTimeString();

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            //si on veut en savoir plus sur la description du temps en anglais
            // description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}km/h`;
            sunrise.innerHTML = `${heureLever}`;
            sunset.innerHTML = `${heureCoucher}`
            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            sun.style.display = '';
            cat.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            sun.classList.add('fadeIn');
            cat.classList.add('fadeIn');
            container.style.height = '1100px';
            



    });


});

function actionSurEntree(event){
    if (event.keyCode === 13) {
        document.getElementById('mybtn').click();
    }
}

input.addEventListener("keypress", actionSurEntree)