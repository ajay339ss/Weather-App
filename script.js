// Get weather data from the API
async function getWeather() {
    const apiKey = "65490b5b660e4061157713b14dbaa759"; // Replace with a valid API key
    const city = document.getElementById("city").value.trim(); // Get the city input

    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`; // Fixed the URL with backticks

    try {
        showLoadingState(); // Show loading spinner while fetching
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("City not found or API error");
        }
        const data = await response.json();
        updateWeatherUI(data); // Update the UI with weather data
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to fetch weather. Check API key and city name.");
        resetWeatherUI();
    } finally {
        hideLoadingState(); // Ensure spinner is hidden after data is fetched
    }
}

// Update the UI with weather data
function updateWeatherUI(data) {
    console.log("Weather Data Received:", data); // Debugging

    if (!data || !data.main || !data.weather || !data.wind) {
        console.error("Invalid weather data:", data);
        resetWeatherUI();
        return;
    }

    document.getElementById("city-name").innerText = `Weather in ${data.name}`; // Fixed string interpolation
    document.getElementById("temperature").innerText = `Temperature: ${data.main.temp}°C`; // Fixed string interpolation
    document.getElementById("description").innerText = `Condition: ${data.weather[0].description}`; // Fixed string interpolation
    document.getElementById("wind-speed").innerText = `Wind Speed: ${data.wind.speed} m/s`; // Fixed string interpolation
    document.getElementById("humidity").innerText = `Humidity: ${data.main.humidity}%`; // Fixed string interpolation

    // Show weather icon
    const weatherIcon = document.getElementById("weather-icon");
    if (weatherIcon) {
        weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`; // Fixed string interpolation
        weatherIcon.style.display = "block"; // Show the icon
    }

    document.getElementById("weather-info").style.display = "block"; // Show weather info

    // Change background based on weather condition
    changeBackground(data.weather[0].main);
}

// Change the background based on weather condition
function changeBackground(condition) {
    const body = document.body;
    const backgrounds = {
        Clear: "linear-gradient(to right, #f7b733, #fc4a1a)",
        Clouds: "linear-gradient(to right, #bdc3c7, #2c3e50)",
        Rain: "linear-gradient(to right, #00c6ff, #0072ff)",
        Snow: "linear-gradient(to right, #e6e9f0, #eef1f5)",
        Thunderstorm: "linear-gradient(to right, #141E30, #243B55)",
        Default: "linear-gradient(to right, #56CCF2, #2F80ED)",
    };

    body.style.background = backgrounds[condition] || backgrounds.Default; // Set the background
}

// Toggle Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
}

// Apply Dark Mode on page load
window.onload = function () {
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
    }
};

// Show the loading state (spinner and placeholders)
function showLoadingState() {
    const spinner = document.getElementById("loading-spinner");
    if (spinner) spinner.style.display = "block"; // Show the spinner

    document.getElementById("city-name").innerText = "Fetching weather...";
    document.getElementById("temperature").innerText = "";
    document.getElementById("description").innerText = "";
    document.getElementById("wind-speed").innerText = "";
    document.getElementById("humidity").innerText = "";

    const weatherIcon = document.getElementById("weather-icon");
    if (weatherIcon) weatherIcon.style.display = "none"; // Hide the weather icon while loading
}

// Hide the loading state (hide the spinner)
function hideLoadingState() {
    const spinner = document.getElementById("loading-spinner");
    if (spinner) spinner.style.display = "none"; // Hide the spinner
}

// Reset the UI on error
function resetWeatherUI() {
    document.getElementById("city-name").innerText = "Weather data unavailable";
    document.getElementById("temperature").innerText = "";
    document.getElementById("description").innerText = "";
    document.getElementById("wind-speed").innerText = "";
    document.getElementById("humidity").innerText = "";

    const weatherIcon = document.getElementById("weather-icon");
    if (weatherIcon) weatherIcon.style.display = "none"; // Hide the icon
}
