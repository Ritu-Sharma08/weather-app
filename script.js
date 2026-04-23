const cityInput = document.getElementById("city");
const resultDiv = document.getElementById("result");
const clearBtn = document.getElementById("clearBtn");
const searchBtn = document.getElementById("searchBtn");
const apiKey = "5b733bfc027b1d80c64bb9afd56f939b";

// ENTER KEY SUPPORT
cityInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    getWeather();
  }
});

async function getWeather() {

  const city = cityInput.value.trim();

  // EMPTY INPUT CHECK
  if (city === "") {
    resultDiv.innerHTML = "Please enter a city name";
    return;
  }

  // LOADING STATE
  resultDiv.innerHTML = "Loading...";
  searchBtn.disabled = true;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // ERROR HANDLING
    if (data.cod != 200) {
      resultDiv.innerHTML = "City not found ❌";
      searchBtn.disabled = false;
      return;
    }

    // RESULT UI
    resultDiv.innerHTML = `
      <div class="weather-card">
        <h2>${data.name}</h2>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
        <p>🌡 Temp: ${data.main.temp}°C</p>
        <p>🌤 Weather: ${data.weather[0].main}</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
      </div>
    `;

    // SHOW CLEAR BUTTON
    clearBtn.style.display = "inline-block";

    // BACKGROUND CHANGE
    const weatherType = data.weather[0].main;

    if (weatherType === "Clear") {
      document.body.style.background = "linear-gradient(to right, #fceabb, #f8b500)";
    } else if (weatherType === "Clouds") {
      document.body.style.background = "linear-gradient(to right, #bdc3c7, #2c3e50)";
    } else if (weatherType === "Rain") {
      document.body.style.background = "linear-gradient(to right, #4b79a1, #283e51)";
    } else {
      document.body.style.background = "#5a5475";
    }

  } catch (error) {
    resultDiv.innerHTML = "Error fetching data";
  }

  // ENABLE BUTTON AGAIN
  searchBtn.disabled = false;
}

// CLEAR BUTTON FUNCTION
clearBtn.addEventListener("click", function () {
  resultDiv.innerHTML = "";
  cityInput.value = "";
  cityInput.focus();
  clearBtn.style.display = "none";

  // RESET BACKGROUND
  document.body.style.background = "#5a5475";
});