let Email = document.getElementById("Email");
let Password = document.getElementById("Password");
let LoginButton = document.getElementById("LoginButton");

let users;
let AllEmails = [];

if (localStorage.getItem("users")) {
  users = JSON.parse(localStorage.getItem("users"));

  for (let i = 0; i < users.length; i++) {
    AllEmails.push(users[i].email);
  }
}


LoginButton.addEventListener("click", LoginFunction);

function LoginFunction() {

   if (Email.value.length === "") {
    alert("Please Enter Your Email");
  } else if (!AllEmails.includes(Email.value)) {
    alert("Invalid Email or need to Register First");
  } else if (Password.value.length === "") {
    alert("Please Enter Your Password");
  } else {
    let index = AllEmails.indexOf(Email.value);
    let TruePassword = users[index].password;

    if (Password.value === TruePassword) {
      alert("You are logged in.");
      window.location.href =
        "http://127.0.0.1:5500/Homapage.html?" + Email.value;
    } else {
      alert("Error on login");
    }
  }
}
