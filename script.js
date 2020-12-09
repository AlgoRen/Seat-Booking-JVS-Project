const container = document.querySelector(".container");
const seat = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

let ticketPrice = +movieSelect.value;

// Update total and count
function updateSelectedCount() {
  // * Looks for all selected elements in the row with the seat and selected class * //
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}
// Movie select event
movieSelect.addEventListener("change", (e) => {
  // * Updating ticket price from the movieSelect value field * //
  ticketPrice = +e.target.value;
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
