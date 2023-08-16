let UserEmail = document.getElementById("UserEmail");
let title = document.getElementById("title");
let content = document.getElementById("content");
let categories = document.getElementById("categories");
let NoteButton = document.getElementById("AddNoteButton");
let TableBody = document.getElementById("table-body");
let tableHead = document.getElementById("table-Head");
let EmteydataBody = document.getElementById("Emtey-data");
let SearchInput = document.getElementById("SearchInput");

let Email = window.location.search.replace("?", "");

UserEmail.innerHTML = Email;

let AllNotes;
let Mynotestitle = [];
let MynotesContent = [];
let MynotesCategories = [];

if (localStorage.getItem("note")) {
  AllNotes = JSON.parse(localStorage.getItem("note"));
} else {
  AllNotes = [];
}

NoteButton.addEventListener("click", AddNoteFunction);
SearchInput.addEventListener("keyup", Search);

function AddNoteFunction() {
  if (!Email) {
    alert("not authorized");
    location.reload();
  } else if (title.value.length == 0) {
    alert("Please Enter Your title of Note");
  } else if (content.value.length == 0) {
    alert("Please Enter The Content of Note");
  } else {
    let NoteInformation = {
      Email: Email,
      Title: title.value,
      Content: content.value,
      Categories: categories.value,
    };

    AllNotes.push(NoteInformation);
    localStorage.setItem("note", JSON.stringify(AllNotes));
    alert("The note has been registered successfully");
    location.reload();
  }
}

for (let i = 0; i < AllNotes.length; i++) {
  if (AllNotes[i].Email === Email) {
    Mynotestitle.push(AllNotes[i].Title);
    MynotesContent.push(AllNotes[i].Content);
    MynotesCategories.push(AllNotes[i].Categories);
  }
}

//console.log(Mynotes);

function DisplayRedMassage() {
  if (Mynotestitle.length === 0) {
    EmteydataBody.innerHTML =
      '<h1 style="color:red ;font-size: 7vw;font-weight=bold" >there is no items to display</h1>';
    tableHead.innerHTML = "";
    SearchInput.style.display = "none";
  } else {
    tableHead.innerHTML =
      "<tr><th>ID</th> <th>Title</th> <th>Content</th> <th>Category</th></tr>";
    EmteydataBody.innerHTML = "";
  }
}

DisplayRedMassage();

function dispalyInTabel() {
  let temp = "";
  for (let i = 0; i < Mynotestitle.length; i++) {
    temp +=
      "<tr> <td>" +
      parseInt(i + 1) +
      "</td>" +
      '<td style="display:none">' +
      Mynotestitle[i] +
      "</td>" +
      '<td><input value="' +
      Mynotestitle[i] +
      '" type="text" class="form-control w-90 me-5" id="update-title-' +
      i +
      '"></td>' +
      '<td><input value="' +
      MynotesContent[i] +
      '" type="text" class="form-control w-90 me-5" id="update-Content-' +
      i +
      '"></td>' +
      '<td><input value="' +
      MynotesCategories[i] +
      '" type="text" class="form-control w-90 me-5" id="update-Category-' +
      i +
      '"></td>' +
      '<td> <button class="btn btn-secondary me-3" onclick="UpdateNote(' +
      i +
      ')" id="update-btn">Update</button>' +
      '<button class="btn btn-danger" onclick="deleteNote(' +
      i +
      ')" id="delet-btn">Delete</button></td></tr>';
  }
  TableBody.innerHTML = temp;
}

dispalyInTabel();

function UpdateNote(index) {
  let UpdateNotetitle = document.getElementById("update-title-" + index).value;
  let UpdateNoteContent = document.getElementById(
    "update-Content-" + index
  ).value;
  let UpdateNoteCategory = document.getElementById(
    "update-Category-" + index
  ).value;

  if (!UpdateNotetitle) {
    alert("Please Enter TheTitle of Note");
  } else if (!UpdateNoteContent) {
    alert("Please Enter the Content of Note");
  } else {
    AllNotes[index].Title = UpdateNotetitle;
    AllNotes[index].Content = UpdateNoteContent;
    AllNotes[index].Categories = UpdateNoteCategory;
    localStorage.setItem("note", JSON.stringify(AllNotes));
    alert("the Note has been updated Successfully");
    location.reload();
  }
}

function deleteNote(index) {
  if (!confirm("Are you sure To Delet this Note")) {
    return false;
  } else {
    let deletItem = AllNotes.splice(index, 1);
    localStorage.setItem("note", JSON.stringify(AllNotes));
    location.reload();
  }
}

function Search() {
  let filter, tr, td, i, txtValue;
  filter = SearchInput.value.toUpperCase();
  tr = TableBody.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
