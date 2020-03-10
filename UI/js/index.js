const elAll = query => document.querySelectorAll(query);
const ChangeView = route => (window.location.href = `${route}.html`);
const openModal = id => {
  event.preventDefault();
  el(`#${id}`).classList.remove("d-none");
};
const closeModal = id => {
  event.preventDefault();
  el(`#${id}`).classList.add("d-none");
};
elAll(".card").forEach(el =>
  el.addEventListener("click", () => (window.location.href = "candidates.html"))
);
