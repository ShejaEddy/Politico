const el = query => document.querySelector(query);
(() => {
  el("#offices").classList.add("active-link");
  if (el(".create-new-office"))
    el(".create-new-office").addEventListener("submit", e => {
      e.preventDefault();
    });

  const div = el("#offices-list");
  let id;
  const offices = [
    { name: "President", type: "Legislative" },
    { name: "Minister of health", type: "Local Government" },
    { name: "Minister of defense", type: "Federal" },
    { name: "Refer", type: "State" },
    { name: "Vice President", type: "Federal" }
  ];
  const setDOM = data => {
    let html = "";
    for (let i = 0; i < data.length; i++) {
      html += ` <div class="list" id="list-${i}" onclick="ChangeView('office')">
                  <div class="details">
                    <p class="name">${data[i].name}</p>
                    <p class="bio">Type: ${data[i].type}</p>
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
        el(".update-name").value = offices[id].name;
        el(".update-type").value = offices[id].type;
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
  setDOM(offices);
  el(".update-name").addEventListener("input", e => {
    if (e.value != offices[id].name) el(".create").disabled = false;
  });
  el(".update-type").addEventListener("change", e => {
    if (e.value != offices[id].type) el(".create").disabled = false;
  });
  el(".create").addEventListener("click", () => {
    offices[id].name = el(".update-name").value;
    offices[id].type = el(".update-type").value;
    setDOM(offices);
    el(".create").disabled = true;
    const taoster = el("#toaster");
    toaster.className = "show";
    toaster.innerText = "Politician updated successfully";
    toaster.style.backgroundColor = "#10a567";
    setTimeout(function() {
      taoster.className = taoster.className.replace("show", "");
    }, 3000);
  });

  el(".delete-approved").addEventListener("click", () => {
    offices.splice(id, 1);
    setDOM(offices);
    closeModal("delete-modal");
    const taoster = el("#toaster");
    toaster.className = "show";
    toaster.innerText = "Offices deleted successfully";
    toaster.style.backgroundColor = "red";
    setTimeout(function() {
      taoster.className = taoster.className.replace("show", "");
    }, 3000);
  });
})();
