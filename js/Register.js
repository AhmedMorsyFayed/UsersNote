let RegisterName = document.getElementById("UserName");
let RegisterEmail = document.getElementById("UserEmail");
let RegisterPassword = document.getElementById("UserPassword");
let RegisterButton = document.getElementById("RegisterButton");
let lowerCaseLetters = /[a-z]/g;
let upperCaseLetters = /[A-Z]/g;
let numbers = /[0-9]/g;
let emailCheck =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

let users;
let useremails = [];

if (localStorage.getItem("users")) {
  users = JSON.parse(localStorage.getItem("users"));
} else {
  users = [];
}

for (let i = 0; i < users.length; i++) {
  useremails.push(users[i].email);
}

console.log(useremails);

RegisterButton.addEventListener("click", RegisterFunction);

function RegisterFunction() {
  if (RegisterName.value.length === "") {
    alert("Please Enter Your Name");
  } else if (RegisterName.value.length < 7) {
    alert("Please Enter Your Family Name");
  } else if (!RegisterName.value.match(upperCaseLetters)) {
    alert("please add 1 uppercase letter");
  } else if (!RegisterName.value.match(lowerCaseLetters)) {
    alert("please add 1 lowercase letter");
  } else if (RegisterEmail.value.length === "") {
    alert("Please Enter Your Email");
  } else if (!emailCheck.test(RegisterEmail.value)) {
    alert("Please Enter a vaild Email");
  } else if (useremails.includes(RegisterEmail.value)) {
    alert("this email is used ,enter aonther email");
  } else if (RegisterPassword.value.length === "") {
    alert("Please Enter Your password");
  } else if (RegisterPassword.value.length > 8) {
    alert("Max of 8");
  } else if (!RegisterPassword.value.match(numbers)) {
    alert("please add 1 number");
  } else {
    let userData = {
      name: RegisterName.value,
      email: RegisterEmail.value,
      password: RegisterPassword.value,
    };

    users.push(userData);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Your account has been created");
    ClearInputs();
    location.reload();
    window.location.href = "http://127.0.0.1:5500/login.html";
  }
}

function ClearInputs() {
  RegisterEmail.value = "";
  RegisterName.value = "";
  RegisterPassword.value = "";
}
