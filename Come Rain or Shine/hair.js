const apiKey = "cf6fef1be5ee4040990190520242811"; // API key
const weatherEndpoint = "https://api.weatherapi.com/v1/current.json"; // API endpoint

document.getElementById("getWeather").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value;
  if (!city) {
    alert("Sis, enter a city name first!");
    return;
  }

  fetch(`${weatherEndpoint}?key=${apiKey}&q=${city}&aqi=no`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        alert("City not found. Try again.");
      } else {
        updateResults(data);
      }
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      alert("Something went wrong. Try again later.");
    });
});

function updateResults(data) {
  const resultContainer = document.querySelector(".result-container");
  resultContainer.innerHTML = "";

  const cityName = document.createElement("h2");
  cityName.innerText = `Weather in ${data.location.name}, ${data.location.region}`;

  const temperature = document.createElement("p");
  temperature.innerText = `Temperature: ${data.current.temp_c}°C`;

  const weatherDescription = document.createElement("p");
  weatherDescription.innerText = `Condition: ${data.current.condition.text}`;

  const hairstyle = document.createElement("p");
  hairstyle.innerText = suggestHairstyle(data.current.condition.text, data.current.temp_c);
  hairstyle.classList.add("tip");
  hairstyle.title = "Hover for more Black hair tips!";

  hairstyle.addEventListener("mouseover", () => {
    hairstyle.innerText = "Moisturize & protect—your crown deserves it!";
  });

  hairstyle.addEventListener("mouseout", () => {
    hairstyle.innerText = suggestHairstyle(data.current.condition.text, data.current.temp_c);
  });

  resultContainer.appendChild(cityName);
  resultContainer.appendChild(temperature);
  resultContainer.appendChild(weatherDescription);
  resultContainer.appendChild(hairstyle);
}

function suggestHairstyle(description, temp) {
  if (description.toLowerCase().includes("rain") || description.toLowerCase().includes("storm")) {
    return "Girl, it's time for a protective style—braids, faux locs, or a wig!";
  } else if (description.toLowerCase().includes("sun") && temp > 25) {
    return "Humidity is real! Rock a twist-out or keep it slicked with a gelled bun.";
  } else if (description.toLowerCase().includes("wind")) {
    return "Sis, tuck that hair in! Headwraps, low buns, or a protective style will save you.";
  } else {
    return "Versatile day! Rock a fro, silk press, or some defined curls.";
  }
}
