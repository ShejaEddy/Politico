const el = query => document.querySelector(query);

(() => {
  el("#parties").classList.add("active-link");

  if (el(".create-new-party"))
    el(".create-new-party").addEventListener("submit", e => {
      e.preventDefault();
    });
  if (el("#upload"))
    el("#upload").addEventListener("click", e => {
      el("#logo-input").click();
    });

  let div = el("#parties-list");
  let id;
  let parties = [
    { name: "INGABIRE", hq: "Remera", logo: `../img/1.png` },
    {
      name: "INKOTANYI",
      hq: "Kimironko",
      logo: `../img/3.png`
    },
    {
      name: "FPR",
      hq: "Nyamirambo",
      logo: `../img/2.png`
    },
    { name: "GOP", hq: "Gisozi", logo: `../img/7.png` },
    { name: "GREEN PARTY", hq: "Kinazi", logo: `../img/5.png` }
  ];
  const setDOM = data => {
    let html = "";
    for (let i = 0; i < data.length; i++) {
      html += ` <div class="list" id="list-${i}" onclick="ChangeView('party')">
                  <div class="user-data">
                    <div class="profile" style="background-image: url(${data[i].logo})"></div>
                  <div class="details">
                    <p class="name">${data[i].name}</p>
                    <p class="bio">hq: ${data[i].hq}</p>
                  </div>
                  </div>
                  <div class="options">
                    <i class="fas fa-pen update" id="update-${i}" onclick="event.cancelBubble=true"></i>
                    <i class="fas fa-trash delete ml-1" id="delete-${i}" onclick="event.cancelBubble=true"></i>
                  </div>
                </div>`;
    }
    div.innerHTML = html;
    elAll(".update").forEach(r => {
      r.addEventListener("click", e => {
        id = e.target.getAttribute("id").replace("update-", "");
        el(
          ".update-profile"
        ).style.backgroundImage = `url(${parties[id].logo})`;
        el(".update-name").value = parties[id].name;
        el(".update-hq").value = parties[id].hq;
        openModal("update-modal");
      });
    });
    elAll(".delete").forEach(r => {
      r.addEventListener("click", e => {
        id = e.target.getAttribute("id").replace("delete-", "");
        openModal("delete-modal");
      });
    });
  };
  setDOM(parties);
  let image;
  el(".update-upload").addEventListener("click", () => {
    el("#logo-input").click();
    el("#logo-input").addEventListener("change", e => {
      var target = e.target.files[0];
      if (!target.type.includes("image/")) {
        alert("Please select an image file");
        return;
      }
      image = URL.createObjectURL(target);
      el(".create").disabled = false;
      el(".update-profile").style.backgroundImage = `url(${image})`;
    });
  });
  el(".update-name").addEventListener("input", e => {
    if (e.value != parties[id].name) el(".create").disabled = false;
  });
  el(".update-hq").addEventListener("change", e => {
    if (e.value != parties[id].hq) el(".create").disabled = false;
  });
  el(".create").addEventListener("click", () => {
    if (image) parties[id].logo = image;
    parties[id].name = el(".update-name").value;
    parties[id].hq = el(".update-hq").value;
    setDOM(parties);
    image = null;
    el(".create").disabled = true;
    var taoster = el("#toaster");
    toaster.className = "show";
    toaster.innerText = "Politician updated successfully";
    toaster.style.backgroundColor = "#10a567";
    setTimeout(function() {
      taoster.className = taoster.className.replace("show", "");
    }, 3000);
  });

  el(".delete-approved").addEventListener("click", () => {
    parties.splice(id, 1);
    setDOM(parties);
    closeModal("delete-modal");
    var taoster = el("#toaster");
    toaster.className = "show";
    toaster.innerText = "Party deleted successfully";
    toaster.style.backgroundColor = "red";
    setTimeout(function() {
      taoster.className = taoster.className.replace("show", "");
    }, 3000);
  });
})();
