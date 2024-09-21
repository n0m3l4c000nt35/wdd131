const $year = document.querySelector("#currentyear");
const $lastModified = document.querySelector("#lastModified");

function calculateWindChill(temperature, windSpeed) {
  if (temperature <= 10 && windSpeed > 4.8) {
    return (
      13.12 +
      0.6215 * temperature -
      11.37 * Math.pow(windSpeed, 0.16) +
      0.3965 * temperature * Math.pow(windSpeed, 0.16)
    );
  } else {
    return "N/A";
  }
}

function updateWindChill() {
  const temperature = parseFloat(
    document.getElementById("temperature").textContent
  );
  const windSpeed = parseFloat(
    document.getElementById("windSpeed").textContent
  );
  const windChillElement = document.getElementById("windChill");

  const windChill = calculateWindChill(temperature, windSpeed);
  windChillElement.textContent =
    typeof windChill === "number" ? windChill.toFixed(1) + "°C" : windChill;
}

const today = new Date();

$year.innerHTML = today.getFullYear();
$lastModified.innerHTML = `Last Modification: ${document.lastModified}`;

document.addEventListener("DOMContentLoaded", () => {
  updateWindChill();
});
