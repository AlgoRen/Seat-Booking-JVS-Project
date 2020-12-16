const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

populateUI();

let ticketPrice = +movieSelect.value;

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

// Update total and count
function updateSelectedCount() {
  // * Looks for all selected elements in the row with the seat and selected class * //
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  // * Copy selected seats into an array
  // * Map through array
  // * Return a new array indexes
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Get data from localStorage and populate UI
function populateUI() {
  // * Uses an array of index values stored in localStorage to determine which
  // * seats need to be made selected by adding the selected class.
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    // * Going through each seat and checking to see if it is there
    // * By checking to see if selectedSeats index is greater than -1...
    // * Meaning that it is and that we will be adding a class of selected.
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
  // Get's the selected movie index from localStorage
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  // If there is an index in localstorage then we will update movieSelect
  if (selectedMovieIndex !== null) {
    // The movie is being set to the movie index found in localStorage
    // * The selectIndex method is a built in method on the select element * //
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Movie select event
movieSelect.addEventListener("change", (e) => {
  // * Updating ticket price from the movieSelect value field * //
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Seat click event
container.addEventListener("click", (e) => {
  // If the clicked on element is a seat and not occupied then toggle the class selected
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");

    updateSelectedCount();
  }
});

// Initial count and total set
updateSelectedCount();
