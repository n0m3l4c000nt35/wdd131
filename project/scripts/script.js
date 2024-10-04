const toggleMobileMenu = () => {
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("show");
    menuToggle.classList.toggle("active");
  });
};

const displayExistingBookings = () => {
  const bookingsTable = document.getElementById("bookingsTable");
  if (!bookingsTable) return;

  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  const tableBody = bookingsTable.querySelector("tbody");
  tableBody.innerHTML = "";

  bookings.sort((a, b) => new Date(a.date + "T" + a.time) - new Date(b.date + "T" + b.time));

  bookings.forEach(booking => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td data-label="Date">${booking.date}</td>
            <td data-label="Time">${booking.time}</td>
            <td data-label="Duration">${booking.duration} hours</td>
            <td data-label="Room">${booking.roomType}</td>
            <td data-label="Band">${booking.bandName}</td>
        `;
    tableBody.appendChild(row);
  });
};

const isBookingAvailable = newBooking => {
  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  const newBookingStart = new Date(newBooking.date + "T" + newBooking.time);
  const newBookingEnd = new Date(newBookingStart.getTime() + newBooking.duration * 60 * 60 * 1000);

  return !bookings.some(booking => {
    if (booking.roomType !== newBooking.roomType) return false;

    const bookingStart = new Date(booking.date + "T" + booking.time);
    const bookingEnd = new Date(bookingStart.getTime() + booking.duration * 60 * 60 * 1000);

    return newBookingStart < bookingEnd && newBookingEnd > bookingStart;
  });
};

const handleBookingSubmission = event => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const bookingData = Object.fromEntries(formData.entries());

  if (!isBookingAvailable(bookingData)) {
    alert("This time slot is already booked. Please choose another time or room.");
    return;
  }

  let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  bookings.push(bookingData);
  localStorage.setItem("bookings", JSON.stringify(bookings));

  alert("Booking submitted successfully!");
  event.target.reset();
  displayExistingBookings();
};

const handleNewsSubmission = event => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const newsData = Object.fromEntries(formData.entries());
  newsData.date = new Date().toISOString();

  let news = JSON.parse(localStorage.getItem("news")) || [];
  news.push(newsData);
  localStorage.setItem("news", JSON.stringify(news));

  alert("News submitted successfully!");
  event.target.reset();
  displayLatestNews();
};

const displayLatestNews = () => {
  const newsContainer = document.getElementById("newsFeed");
  if (!newsContainer) return;

  const news = JSON.parse(localStorage.getItem("news")) || [];
  const latestNews = news.slice(-3).reverse();

  latestNews.forEach(item => {
    const article = document.createElement("article");
    article.classList.add("newsItem");
    article.innerHTML = `
            <h3>${item.newsTitle}</h3>
            <p>${item.newsContent}</p>
            <time datetime="${item.date}">${new Date(item.date).toLocaleDateString()}</time>
        `;
    newsContainer.appendChild(article);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  displayLatestNews();
  toggleMobileMenu();
  displayExistingBookings();

  const bookingForm = document.getElementById("rehearsalForm");
  if (bookingForm) {
    bookingForm.addEventListener("submit", handleBookingSubmission);
  }

  const newsForm = document.getElementById("newsSubmissionForm");
  if (newsForm) {
    newsForm.addEventListener("submit", handleNewsSubmission);
  }
});
