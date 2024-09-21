const $year = document.querySelector("#currentyear");
const $lastModified = document.querySelector("#lastModified");

function calculateWindChill(temperature, windSpeed) {
  return (
    13.12 +
    0.6215 * temperature -
    11.37 * Math.pow(windSpeed, 0.16) +
    0.3965 * temperature * Math.pow(windSpeed, 0.16)
  );
}

function updateWindChill() {
  const temperature = parseFloat(
    document.getElementById("temperature").textContent
  );
  const windSpeed = parseFloat(
    document.getElementById("windSpeed").textContent
  );
  const windChillElement = document.getElementById("windChill");

  if (temperature <= 10 && windSpeed > 4.8) {
    const windChill = calculateWindChill(temperature, windSpeed);
    windChillElement.textContent = windChill.toFixed(1) + "°C";
  } else {
    windChillElement.textContent = "N/A";
  }
}

const today = new Date();

$year.innerHTML = today.getFullYear();
$lastModified.innerHTML = `Last Modification: ${document.lastModified}`;

document.addEventListener("DOMContentLoaded", () => {
  updateWindChill();
});
