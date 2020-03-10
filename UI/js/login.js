const el = query => document.querySelector(query);
el(".login-form").addEventListener("submit", e => {
  e.preventDefault();
  login();
});
const login = () => {
  var email = el("#email").value;
  var password = el("#password").value;
  var taoster = el("#toaster");
  if (email === "admin@example.com" && password == "password") {
    toaster.className = "show";
    toaster.innerText = "Authenticated as Admin successfully";
    toaster.style.backgroundColor = "#10a567";
    setTimeout(function() {
      taoster.className = taoster.className.replace("show", "");
      window.location.href = "parties.html";
    }, 3000);
  } else if (email === "user@example.com" && password == "password") {
    toaster.className = "show";
    toaster.innerText = "Authenticated as User successfully";
    toaster.style.backgroundColor = "#10a567";
    setTimeout(function() {
      taoster.className = taoster.className.replace("show", "");
      window.location.href = "vote.html";
    }, 3000);
  } else {
    toaster.className = "show";
    toaster.innerText = "Invali Email/Password, Please Try again";
    toaster.style.backgroundColor = "red";
    setTimeout(function() {
      taoster.className = taoster.className.replace("show", "");
    }, 3000);
  }
};
