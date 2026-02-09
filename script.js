const apiKey = "bc949a445487eef221aa464bfb7c2c6c";

const forecastDiv = document.getElementById("forecast");
const btn = document.getElementById("getForecast");
const cityInput = document.getElementById("city");

btn.addEventListener("click", () => {

  const city = cityInput.value;
  if (!city) {
    alert("Please enter a city name");
    return;
  }


  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
  )
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      // console.log(city);

      forecastDiv.innerHTML = "";
      data.list[0].dt_txt;
      const dailyData = data.list.filter((item) =>
        item.dt_txt.includes("12:00:00")
      );
      // console.log(dailyData);

      dailyData.forEach((val) => {
        // console.log(val);

        const date = new Date(val.dt_txt).toDateString();
        const temp = Math.round(val.main.temp);
        const desc = val.weather[0].description;
        const icon = val.weather[0].icon;

        const card = `<div class="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center">
                <p class="font-semibold text-gray-700">${date}</p>
                <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather" class="w-16 my-2">
                <p class="text-blue-600 font-bold text-lg">${temp}</p>
                <p class="text-gray-500">${desc}</p>
            </div>`;
        forecastDiv.innerHTML += card;
        cityInput.value = ""
      });
    })
    .catch((err) => {
      console.error(err);
      forecastDiv.innerHTML = `<p class="text-red-500">City not found!</p>`;
    });
});
