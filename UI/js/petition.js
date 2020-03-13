var modal = document.getElementById("myModal");

var btn = document.getElementById("myBtn");

var span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
    modal.style.display = "block";
}

span.onclick = function () {
    modal.style.display = "none";
}
const el = (elm) => document.querySelector(elm)
el("#petition-form").addEventListener("submit", (e) => {
    e.preventDefault();
    el("#body").style.backgroundImage = "none";
    el('#default-heading').innerText = "All Petitions";
    modal.style.display = "none";
    el(".table").classList.remove ("d-none");
})
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}