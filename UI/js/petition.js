const el = elm => document.querySelector(elm);
const modal = el("#myModal");

const btn = el("#myBtn");

const span = el(".close");

btn.onclick = function() {
  modal.style.display = "block";
};

span.onclick = function() {
  modal.style.display = "none";
};

el("#petition-form").addEventListener("submit", e => {
  e.preventDefault();
  el("#body").style.backgroundImage = "none";
  el("#default-heading").innerText = "All Petitions";
  modal.style.display = "none";
  el(".table").classList.remove("d-none");
});
const openFile = () => el(".fileInput").click();
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
