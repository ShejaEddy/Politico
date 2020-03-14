const el = query => document.querySelector(query);
el(".close-profile").addEventListener("click", () => {
  el(".candidate-profile").style.display = "none";
});
if (el(".close-tab"))
  el(".close-tab").addEventListener(
    "click",
    () => (window.location.href = "vote.html")
  );
elAll(".list").forEach(
  element =>
    element.addEventListener(
      "click",
      () => (el(".candidate-profile").style.display = "block")
    ),
  true
);
const candidates = [
  {
    name: "sheja eddy",
    party: "FPR INKOTANYI",
    profile: "../img/avatar_user.png",
    logo: "../img/1.png",
    office: "President of the nation"
  },
  {
    name: "Mukantwari Antoinette",
    party: "GREEN PARTY",
    profile: "../img/avatar.png",
    logo: "../img/5.png",
    office: "Minister of Light"
  },
  {
    name: "Remy Jean Bosco",
    party: "GREEN PARTY",
    profile: "../img/avatar_black.png",
    logo: "../img/3.png",
    office: "Minister of Defence"
  }
];
const div = el(".all-candidates");
let id; let isOffice; let isParty; let isResult;
if (el(".party-profile")) isParty = true;
if (el(".office-details")) isOffice = true;
if (el(".candidates-body")) isResult = true;

const setDOM = data => {
  let html = "";
  for (let i = 0; i < data.length; i++) {
    html += `<div class="list">
				<div class="d-flex">
					<div class="profile" style="background-image: url(${data[i].profile});"></div>
					<div class="details">
						<p class="name">${data[i].name}</p>
						<p class="bio">${isParty ? data[i].office : data[i].party}</p>
					</div>
				</div>
				<div class="d-flex">
                    <div class="profile" style="background-image: url(${
                      data[i].logo
                    });"></div>
                    ${
                      !(isOffice || isParty || isResult)
                        ? `<div class="options">
						<button class="vote-btn" id="vote-${i}" onclick="event.cancelBubble=true">Vote</button>
					</div>`
                        : ""
                    }
				</div>
			</div>`;
  }
  div.innerHTML = html;
  elAll(".vote-btn").forEach(r => {
    r.addEventListener("click", e => {
      id = e.target.getAttribute("id").replace("vote-", "");
      openModal("vote-modal");
    });
  });
  elAll(".list").forEach(r => {
    r.addEventListener("click", e => {
      el(".candidate-profile").style.display = "block";
      if (el("#body")) el("#body").style.display = "flex";
    });
  });
};
setDOM(candidates);
if (el(".vote-approved")) {
  el(".vote-approved").addEventListener("click", () => {
    closeModal("vote-modal");
    const voted = [candidates[id]];
    setDOM(voted);
    elAll(".vote-btn")[0].innerText = "Voting...";
    const taoster = el("#toaster");
    setTimeout(function() {
      toaster.className = "show";
      toaster.innerText = "Vote Casted successfully";
      toaster.style.backgroundColor = "#10a567";
      elAll(".vote-btn")[0].innerHTML = `Voted <i class="fas fa-check"></i>`;
    }, 2000);
    setTimeout(function() {
      taoster.className = taoster.className.replace("show", "");
      ChangeView("vote");
    }, 4000);
  });
}
