const el = query => document.querySelector(query);
if (el(".login-form"))
  el(".login-form").addEventListener("submit", e => {
    e.preventDefault();
    login();
  });
const login = () => {
  var email = el("#email").value;
  var password = el("#password").value;
  var toaster = el("#toaster");
  toaster.className = "show";
  if (email === "admin@example.com" && password == "password") {
    toaster.innerText = "Authenticated as Admin successfully";
    toaster.style.backgroundColor = "#10a567";
    setTimeout(function() {
      toaster.className = toaster.className.replace("show", "");
      window.location.href = "parties.html";
    }, 3000);
  } else if (email === "user@example.com" && password == "password") {
    toaster.innerText = "Authenticated as User successfully";
    toaster.style.backgroundColor = "#10a567";
    setTimeout(function() {
      toaster.className = toaster.className.replace("show", "");
      window.location.href = "vote.html";
    }, 3000);
  } else {
    toaster.innerText = "Invalid Email/Password, Please Try again";
    toaster.style.backgroundColor = "red";
    setTimeout(function() {
      toaster.className = toaster.className.replace("show", "");
    }, 3000);
  }
};

if (el(".forgot-form"))
  el(".forgot-form").addEventListener("submit", e => {
    e.preventDefault();
    forgotPwd();
  });

const forgotPwd = () => {
  var email = el("#email").value;
  var toaster = el("#toaster");
  toaster.className = "show";
  if (email === "admin@example.com" || email === "user@example.com") {
    toaster.innerText = "Reset Link sent successfully, Check your emails!";
    toaster.style.backgroundColor = "#10a567";
    setTimeout(function() {
      toaster.className = toaster.className.replace("show", "");
      window.location.href = "login.html";
    }, 3000);
  } else {
    toaster.innerText = "User doesn't exist, Please Try again!";
    toaster.style.backgroundColor = "red";
    setTimeout(function() {
      toaster.className = toaster.className.replace("show", "");
    }, 3000);
  }
};
