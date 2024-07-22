// !------------------------------------------
// *Modal Part
// *Part 1 :btn => display popup
const btnAdd = document.getElementById("modalBtn");
// !-------------------------------------------------
// *part 2: btn display timer
const popup = document.getElementById("popup");
const text = document.getElementById("text");
// !---------------------------------------
//* Get the modal
const modal = document.getElementById("myModal");

//* Get the <span> element that closes the modal
const span = document.getElementById("closeModal");
const modalContent = document.querySelector(".modal-content");

//* When the user clicks on the button, open the modal
function addModal() {
  modal.classList.add("modal-display");
  modalContent.classList.add("modal-content-display");
}

//* When the user clicks on <span> (x), close the modal
function btnCloseModal() {
  modal.classList.remove("modal-display");
  modalContent.classList.remove("modal-content-display");
  return;
}

span.addEventListener("click", btnCloseModal);

//* When the user clicks anywhere outside of the modal, close it
function clickCloseModal() {
  modal.classList.remove("modal-display");
  modalContent.classList.remove("modal-content-display");
  return;
}
window.addEventListener("click", (e) => {
  if (e.target == modal) {
    clickCloseModal();
  }
});
btnAdd.addEventListener("click", addModal);
