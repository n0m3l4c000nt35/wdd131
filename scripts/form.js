const $year = document.querySelector("#currentyear");
const $lastModified = document.querySelector("#lastModified");

const today = new Date();

if ($year) {
  $year.innerHTML = today.getFullYear();
  $lastModified.innerHTML = `Last Modification: ${document.lastModified}`;
}

const products = [
  {
    id: "fc-1888",
    name: "flux capacitor",
    averageting: 4.5,
  },
  {
    id: "fc-2050",
    name: "power laces",
    averagerating: 4.7,
  },
  {
    id: "fs-1987",
    name: "time circuits",
    averagerating: 3.5,
  },
  {
    id: "ac-2000",
    name: "low voltage reactor",
    averagerating: 3.9,
  },
  {
    id: "jj-1969",
    name: "warp equalizer",
    averagerating: 5.0,
  },
];

const $productName = document.querySelector("#productName");

if ($productName) {
  products.forEach(product => {
    let option = document.createElement("option");
    option.value = product.name;
    option.textContent = product.name;
    $productName.appendChild(option);
  });
}

function incrementReviewCounter() {
  let count = localStorage.getItem("reviewCount") || 0;
  count = parseInt(count) + 1;
  localStorage.setItem("reviewCount", count);
  return count;
}
document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname.includes("review.html")) {
    const count = incrementReviewCounter();
    const counterElement = document.createElement("p");
    counterElement.textContent = `Total reviews: ${count}`;
    document.body.appendChild(counterElement);
  }
});
