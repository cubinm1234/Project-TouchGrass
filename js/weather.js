const APIkey = "8bb6abf43cd329574abc2f69beb3b4ab";

async function getWeather(key, callback) {
  let APIurl = `https://api.openweathermap.org/data/2.5/weather?q=Vietnam&units=metric&appid=${key}`;
  const request = await fetch(APIurl);
  const response = await request.json();
  callback(response);
  console.log(response)
}

const weatherFeed = document.getElementById("weather-feed");

function generateWeathersFeed(info) {
    const weatherDescription = generateWeatherDescription(info.weather);
    const icon = generateImg(info.weather);
    const weatherHtml = `
      <div class="mx-4 py-3 border-b border-solid border-slate-200">${info.name}</div>
      <div class="flex justify-between items-center pt-2 pb-3 px-4">
        <div>
          ${weatherDescription}
          <div class="flex items-end text-3xl font-normal my-0.5">${info.main.temp}°
            <div class="text-sm font-medium ml-1">C</div>
          </div>
        </div>
        ${icon}
      </div>
    `
    weatherFeed.insertAdjacentHTML("afterbegin", weatherHtml);
}

function generateWeatherDescription(des = []) {
  for (i = 0; i < des.length; i++) {
    return `
      <div class="capitalize text-sm font-medium">${des[i].description}</div>
    `
  }
}

function generateImg(img = []) {
  for (i = 0; i < img.length; i++) {
    return `
    <img src="http://openweathermap.org/img/wn/${img[i].icon}@2x.png" alt="">
    `
  }
} 

getWeather(APIkey, generateWeathersFeed);