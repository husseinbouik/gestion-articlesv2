// get element from HTML code
const form = document.getElementById("form");
const nom = document.getElementById("nom");
const prix = document.getElementById("prix");
const marque = document.getElementById("marque");
const date = document.getElementById("date");
const Promo = document.getElementsByName("P");
const type = document.getElementById("type");
const mis1 = document.querySelector(".mis1");
const mis2 = document.querySelector(".mis2");
const button = document.querySelector(".btn");
let arr = [];
let ajt = document.getElementById("A");
var promo;
const tableBody = document.querySelector("#productsdetails tbody");
const contIdEdit = document.getElementById("contIdEdit");
// validation onkeyup
function validatenom(lnom) {
  if (lnom.value.trim() === "") {
    setErrorFor(lnom, "First name is required");
  } else if (lnom.value.length < 3 || lnom.value.length > 30) {
    setErrorFor(lnom, "First name is invalid");
  } else {
    setSuccessFor(lnom, "Looks Good!");
  }
}
function validatemarque(lmarque) {
  if (lmarque.value.trim() === "") {
    setErrorFor(lmarque, "Last name is required");
  } else if (lmarque.value.length < 2 || lmarque.value.length > 30) {
    setErrorFor(lmarque, "Last name is invalid");
  } else {
    setSuccessFor(lmarque, "Looks Good!");
  }
}
function validateprix(lprix) {
  if (lprix.value.trim() === "") {
    setErrorFor(lprix, "price  is required");
  } else if (
    lprix.value.length < 1 ||
    lprix.value.length > 30 ||
    lprix.value.match(
      /([A-Z]{3}|[A-Z]?[\$€¥])?\s?(\d{1,3}((,\d{1,3})+)?(.\d{1,3})?(.\d{1,3})?(,\d{1,3})?)/
    )
  ) {
    setSuccessFor(lprix, "Looks Good!");
  } else {
    setErrorFor(lprix, "price is invalid");
  }
}
nom.addEventListener("keyup", function () {
  validatenom(nom);
});
prix.addEventListener("keyup", function () {
  validateprix(prix);
});
marque.addEventListener("keyup", function () {
  validatemarque(marque);
});
// Final validation
function boom() {
  const nomValue = nom.value.trim();
  const prixValue = prix.value.trim();
  const dateValue = date.value.trim();
  const marqueValue = marque.value.trim();
  const typeValue = type.value;
  if (nomValue === "") {
    setErrorFor(nom, "nom is required");
  } else if (nomValue.length < 3 || nomValue.length > 30) {
    setErrorFor(nom, "nom is invalid");
  } else {
    setSuccessFor(nom, "Looks Good!");
    arr.push(true);
  }
  console.log(arr.length);
  if (prixValue === "") {
    setErrorFor(prix, "price  is required");
  } else if (
    prixValue.length > 1 &&
    prixValue.length < 30 &&
    prixValue.match(
      /([A-Z]{3}|[A-Z]?[\$€¥])?\s?(\d{1,3}((,\d{1,3})+)?(.\d{1,3})?(.\d{1,3})?(,\d{1,3})?)/
    )
  ) {
    setSuccessFor(prix, "Looks Good!");
    arr.push(true);
  } else {
    setErrorFor(prix, "price is invalid");
  }
  if (marqueValue === "") {
    setErrorFor(marque, "marque is required");
  } else if (marqueValue.length < 2 || marqueValue.length > 30) {
    setErrorFor(marque, "marque is invalid");
  } else {
    setSuccessFor(marque, "Looks Good!");
    arr.push(true);
  }
  if (dateValue === "") {
    setErrorFor(date, "Date is required");
  } else {
    setSuccessFor(date, "Looks Good!");
    arr.push(true);
  }
  var gen = !Promo[0].checked && !Promo[1].checked;

  if (Promo[0].checked) {
    arr.push(true);
    mis1.innerHTML = "Look good !";
    mis1.style.color = "green";
    promo = "Oui";
  } else if (Promo[1].checked) {
    arr.push(true);
    mis1.innerHTML = "Look good !";
    mis1.style.color = "green";
    promo = "Non";
  } else {
    mis1.innerHTML = "Choose one";
    mis1.style.color = "red";
  }
  console.log(arr.length);
  if (typeValue === "") {
    setErrorFor(type, "choose one");
  } else {
    setSuccessFor(type, "Looks good!");
    arr.push(true);
  }
}
function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  formControl.className = "form-control error";
  small.innerText = message;
}
function setSuccessFor(input, message) {
  const formControl = input.parentElement;
  const samp = formControl.querySelector("samp");
  formControl.className = "form-control success";
  samp.innerText = message;
}
// A Function to add & modify elements in the table
ajt.onclick = function getitdone() {
  // Add In case the value of the input is "Ajouter"
  if (ajt.value === "Ajouter") {
    arr.length = 0;
    boom();
    if (arr.length != 6) {
      arr.length = 0;
      boom();
    } else {
      // Give the id a random number to identefy the element & easyfy the modification process
      let id = Math.floor(Math.random() * 1000000);
      console.log(id);
      const newProd = new Product(
        id,
        nom.value,
        prix.value,
        marque.value,
        date.value,
        type.value,
        promo
      );
      // show & store the added data
      newProd.showData().storeProduct();
      nom.value = "";
      prix.value = "";
      marque.value = "";
      date.value = "";
      type.value = "";
      Promo[0].checked = Promo[0].unchecked;
      Promo[1].checked = Promo[1].unchecked;
    }
    // Modify In case the value of the input is "Modifier"
  } else if (ajt.value === "Modifier") {
    arr.length = 0;
    boom();
    // make sure that all the input's values are valide before jumping to the next step of adding
    if (arr.length != 6) {
      arr.length = 0;
      boom();
    } else {
      document.getElementById("A").value = "Ajouter";
      var id = contIdEdit.value;
      const newProd = new Product(
        id,
        nom.value,
        prix.value,
        marque.value,
        date.value,
        type.value,
        promo
      );
      // Update and store the modified data
      newProd.updateProduct(id);
      tableBody.innerHTML = "";
      Product.showAllProducts();
      nom.value = "";
      prix.value = "";
      marque.value = "";
      date.value = "";
      type.value = "";
      Promo[0].checked = Promo[0].unchecked;
      Promo[1].checked = Promo[1].unchecked;
    }
  }
};
// OOP
class Product {
  constructor(id, nom, prix, marque, date, type, promo) {
    this.id = id;
    this.nom = nom;
    this.prix = prix;
    this.marque = marque;
    this.date = date;
    this.type = type;
    this.promo = promo;
  }
  showData() {
    Product.showHtml(
      this.id,
      this.nom,
      this.prix,
      this.marque,
      this.date,
      this.type,
      this.promo
    );
    return this;
  }
  storeProduct() {
    const allData = JSON.parse(localStorage.getItem("products")) ?? [];
    allData.push({
      id: this.id,
      nom: this.nom,
      prix: this.prix,
      marque: this.marque,
      date: this.date,
      type: this.type,
      promo: this.promo,
    });
    localStorage.setItem("products", JSON.stringify(allData));
  }
  static showAllProducts() {
    if (localStorage.getItem("products")) {
      JSON.parse(localStorage.getItem("products")).forEach((item) => {
        Product.showHtml(
          item.id,
          item.nom,
          item.prix,
          item.marque,
          item.date,
          item.type,
          item.promo
        );
      });
    }
  }
  updateProduct(id) {
    const newItem = {
      id: id,
      nom: this.nom,
      prix: this.prix,
      marque: this.marque,
      date: this.date,
      type: this.type,
      promo: this.promo,
    };
    const updateData = JSON.parse(localStorage.getItem("products")).map(
      (item) => {
        if (item.id == id) {
          return newItem;
        }
        return item;
      }
    );
    localStorage.setItem("products", JSON.stringify(updateData));
  }

  static showHtml(id, nom, prix, marque, date, type, promo) {
    const trEl = document.createElement("tr");
    trEl.innerHTML = `
              <tr  role='row'>
              <td>${nom}</td>
              <td>${prix}</td>
              <td>${marque}</td>
              <td>${date}</td>
              <td>${type}</td>
              <td>${promo}</td>
                  <td>
                      <button   class="btn btn-info edit" data-id="${id}">Edit</button>
                      <button  class="btn btn-danger delete" data-id="${id}">Delete</button>
                  </td>
              </tr>
          `;
    tableBody.appendChild(trEl);
  }
}
Product.showAllProducts();
tableBody.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    const id = +e.target.getAttribute("data-id");
    const Prods = JSON.parse(localStorage.getItem("products"));
    const newData = Prods.filter((el) => el.id != +id);
    localStorage.setItem("products", JSON.stringify(newData));
    e.target.parentElement.parentElement.remove();
  }
  // edit the products data
  if (e.target.classList.contains("edit")) {
    const id = e.target.getAttribute("data-id");
    const mainItem = JSON.parse(localStorage.getItem("products")).find(
      (item) => item.id == id
    );
    // stock the id of each product in "contIdEdit.value"
    contIdEdit.value = id;
    nom.value = mainItem.nom;
    prix.value = mainItem.prix;
    marque.value = mainItem.marque;
    date.value = mainItem.date;
    type.value = mainItem.type;
    if (mainItem.promo === "Oui") {
      document.getElementById("o").checked = true;
    } else {
      document.getElementById("n").checked = true;
    }
    document.getElementById("A").value = "Modifier";
  }
});
