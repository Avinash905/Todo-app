let noalert = `<div class="alert alert-primary my-5" role="alert">
  Your todo list is empty!
</div>`;
let addalert = `<div class="alert alert-success alert-dismissible fade show" role="alert">
  <strong>Wow!</strong> A new todo has been added to your list
  <button type="button" class="btn-close" aria-label="Close"></button>
</div>`;

show();

btn.addEventListener("click", (e) => {
  e.preventDefault();

  let obj = {
    title: todotitle.value,
    desc: tododesc.value,
  };

  let td = localStorage.getItem("to-do");
  if (td == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(td);
  }
  notesObj.push(obj);
  localStorage.setItem("to-do", JSON.stringify(notesObj));

  document
    .querySelector(".container")
    .insertAdjacentHTML("afterbegin", addalert);

  setTimeout(() => {
    document.querySelector(".alert-success").remove();
  }, 3000);

  show();
});

function show() {
  let td = localStorage.getItem("to-do");
  if (td == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(td);
  }
  let html = "";
  notesObj.forEach((element, index) => {
    html += `<div class="card my-4 mx-1" style="width: 18rem">
    <div class="card-body">
      <h5 class="card-title">${element.title}</h5>
      <p class="card-text">
      ${element.desc}
      </p>
      <button id="${index}" onclick="del(this.id)" type="submit" class="btn btn-danger">
            Delete
          </button>
    </div>
  </div>`;
  });

  if (notesObj.length != 0) {
    document.querySelector(".todos").innerHTML = html;
  } else {
    document.querySelector(".todos").innerHTML = noalert;
  }
}

function del(index) {
  let td = localStorage.getItem("to-do");
  if (td == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(td);
  }

  notesObj.splice(index, 1);
  localStorage.setItem("to-do", JSON.stringify(notesObj));
  show();
}

let search = document.querySelector("#srch");
search.addEventListener("input", () => {
  let val = search.value;
  let todos = document.getElementsByClassName("card");
  Array.from(todos).forEach((element) => {
    let titleSearch = element.getElementsByTagName("h5")[0].innerText;
    if (titleSearch.includes(val)) {
      element.style.display = "flex";
    } else {
      element.style.display = "none";
    }
  });
});
