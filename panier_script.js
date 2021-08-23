const positionsElement = document.querySelector(".tbody");
let total = 0;
function formatPrix (prix){
  return  new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(prix);
}
//-----------------------------------------------------------------------------------------------------
let produits = JSON.parse(localStorage.getItem("produits"));
if (!produits){
  produits = [];
}
//-----------------------------------------------------------------------------------------------------
function restore () {
  let contactSTR = localStorage.getItem('contact');
  if (contactSTR){
    let contact = JSON.parse(contactSTR);
    document.querySelector("#votrenom").value = contact.lastName;
    document.querySelector("#prenom").value = contact.firstName;
    document.querySelector("#email").value = contact.email;
    document.querySelector("#adresse").value = contact.address;
    document.querySelector("#cp").value = contact.code_postal;
    document.querySelector("#ville").value = contact.city;
  }
}
restore();
function reload (){
  const leformulaire = {
    lastName: document.querySelector("#votrenom").value,
    firstName: document.querySelector("#prenom").value,
    email: document.querySelector("#email").value,
    address: document.querySelector("#adresse").value,
    code_postal: document.querySelector("#cp").value,
    city: document.querySelector("#ville").value,
  };
  localStorage.setItem('contact', JSON.stringify(leformulaire));
  window.location.reload();
}
//-----------------------------------------------------------------------------------------------------


//-------------------------------------------------CALCUL  TOTAL ---------------------------------------

function totalProduit (){
  let sousTotalCalcul = [];
  for (m = 0; m < produits.length; m++) {
  let quantité = produits[m].quantity;
  let prixUnitaire = produits[m].price;

  sousTotal = quantité * prixUnitaire;
  sousTotalCalcul.push(sousTotal);
  }
  let prixTotalCalcul = [];
  total = sousTotalCalcul.reduce((acc, cur) => acc + cur,0);

  // le html du prix total :
  const afficherPrixTotal = `<div class="prixTotal">TOTAL : ${formatPrix(total)}</div>`;
  //selection de la classe où injecter mon html
  const positionsElement2 = document.querySelector(".totalprice");
  if (positionsElement2){
  positionsElement2.innerHTML = afficherPrixTotal;
  }
}

//---------------------------------------------------FIN CALCUL SOUS TOTAL-------------------------------------------






//----------------------------------------------------AFFICHAGE DES PRODUITS + PANIER VIDE-----------------------------


function emptyCart (){
  const paniervide = `
    <div class = "containerPanierVide">
        <div>LE PANIER EST VIDE</div>
        <a href="index.html">Retourner à la boutique</a>
    </div>
    `;
  let tableau = document.querySelector(".tableau");
  tableau.innerHTML = paniervide;
  let totalPrice = document.querySelector(".totalprice");
  totalPrice.style.display = 'none';
}
function cart (){
  let totalPrice = document.querySelector(".totalprice");
  totalPrice.style.display = 'block';
  let structureProduitPanier = [];
  for (j = 0; j < produits.length; j++) {
    structureProduitPanier = structureProduitPanier + `
           <tr>
               <td class="divNomCouleur">${produits[j].name}</td>
               <td class="coloris">${produits[j].selectedColor}</td>
               <td class="quantity">${produits[j].quantity}</td>
               <td class="prix">${formatPrix(produits[j].price)}</td>
               <td class="soustotal">${formatPrix(produits[j].price*produits[j].quantity)}</td>
               <td ><button class='delete btn btn-danger' id=${j}><i class="far fa-trash-alt"></i></button></td> <!-- On passe la position du produit dans le tableau de produits afin de l'utiliser pour supprimer le produit -->
           </tr>`;
 }
positionsElement.innerHTML = structureProduitPanier;
}

function affichage (){
  if (!produits || produits.length === 0) {
    emptyCart();
  }
  else {
    cart();
    totalProduit();
  };
}





//-----------------------------------VIDER LE PANIER-------------------------------------------------
function viderPanier (){
  let btn_viderPanier = document.querySelector(".paniervide");
//suppression de la key produit du localstorage
btn_viderPanier.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.removeItem("produits");
  alert("Le panier a été vidé");
  reload();
});
}
viderPanier();


//-----------------------------------------FORMULAIRE-------------------------------------------------
function validateForm (){
  let isValidName = validateName();
  let isValidSurname = validateSurname();
  let isValidEmail = validerEmail();
  let isValidAddress = validateAdress();
  let isValidCP = validateCP();
  let isValidCity = validateCity();
  // Bloquer le POST si les éléments ne sont pas bons
  if (!isValidName || !isValidSurname || !isValidEmail || !isValidAddress || !isValidCP || !isValidCity || produits.length<=0 ){
    return false;
  }
  return true;
}

function send (dataOrder){
  fetch('http://localhost:3000/api/teddies/order',{
    headers : {
      'Accept' : 'application/json',
      'Content-Type' :  'application/json'
    },
    method : 'POST',
    body : JSON.stringify(dataOrder)
  }).then (response => {
    if(response.ok == true){
      return response.json();
    }
  }).then (response => {
    response.total = formatPrix(total);
    window.sessionStorage.setItem('order', JSON.stringify(response));
    window.localStorage.clear();
    window.location.assign('validation.html');
  }).catch(error => {
    console.log(error);
  });
}


function getData (){
  const leformulaire = {
    lastName: document.querySelector("#votrenom").value,
    firstName: document.querySelector("#prenom").value,
    email: document.querySelector("#email").value,
    address: document.querySelector("#adresse").value,
    code_postal: document.querySelector("#cp").value,
    city: document.querySelector("#ville").value,
  };
//Données du formulaire --------------------------------------------------------------------------------
    const dataOrder = {
    contact: leformulaire,
    products : produits.map(produit => produit._id),
    }
    return dataOrder;
}
function sendButton (){
  let btn_envoyerleformulaire = document.querySelector(".bouton_commande");
btn_envoyerleformulaire.addEventListener("click",function (e) {
  e.preventDefault(); 

    if (!validateForm ()){
      
      return;
    }

let dataOrder = getData();
send(dataOrder);
});
}


//fin formulaire------------------------------------------------------------------------------------------------



function validateName() {
  let inputName = document.querySelector("#votrenom");
  let valueName = inputName.value;
  let errorName = document.querySelector(".nom");
  //trim permet de supprimer les espaces au extremités d'une chaine de caractères
  if (!valueName.trim()) {
    errorName.innerText = "Veuillez remplir ce champ";
    errorName.style.display = "block";
    inputName.value = ""; // '' permet de vider le champs entierement
    return false;
  }
  if (valueName.length < 2) {
    errorName.innerText = "Votre nom est trop court";
    errorName.style.display = "block";
    return false;
  }
  errorName.style.display = "none";
  return true;
}

function validateSurname() {
  let inputSurname = document.querySelector("#prenom");
  let valueSurname = inputSurname.value;
  let errorSurname = document.querySelector(".prenom");
  if (!valueSurname.trim()) {
    errorSurname.innerText = "Veuillez remplir ce champ";
    errorSurname.style.display = "block";
    inputSurname.value = "";
    return false;
  }
  if (valueSurname.length < 2) {
    errorSurname.innerText = "Votre prenom est trop court";
    errorSurname.style.display = "block";
    return false;
  }
  errorSurname.style.display = "none";
  return true;
}
// METHODE REGEX
function validerEmail() {
  let inputMail = document.getElementById("email");
  let valueMail = inputMail.value;
  let errorMail = document.querySelector(".email");
  var regx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (!regx.test(inputMail.value)) {
    errorMail.innerText = "Adresse email incorrecte";
    errorMail.style.display = "block";
    inputMail.value = "";
    inputMail.focus;
    return false;
  } else {
    errorMail.style.display = "none";
    return true;
  }
}

function validateAdress() {
  let inputAdress = document.querySelector("#adresse");
  let valueAdress = inputAdress.value;
  let errorAdress = document.querySelector(".adresse");
  if (!valueAdress.trim()) {
    errorAdress.innerText = "Veuillez remplir ce champ";
    errorAdress.style.display = "block";
    inputAdress.value = "";
    return false;
  }
  if (valueAdress.length < 5) {
    errorAdress.innerText = "Adresse erronée";
    errorAdress.style.display = "block";
    return false;
  }
  errorAdress.style.display = "none";
  return true;
}

function validateCP() {
  let inputCP = document.querySelector("#cp");
  let valueCP = inputCP.value;
  let errorCP = document.querySelector(".cp");
  if (!valueCP.trim()) {
    errorCP.innerText = "Veuillez remplir ce champ";
    errorCP.style.display = "block";
    inputCP.value = "";
    return false;
  }
  if (valueCP.length < 5) {
    errorCP.innerText = "Entrer un code postal correct";
    errorCP.style.display = "block";
    return false;
  }
  errorCP.style.display = "none";
  return true;
}

function validateCity() {
  let inputCity = document.querySelector("#ville");
  let valueCity = inputCity.value;
  let errorCity = document.querySelector(".ville");
  if (!valueCity.trim()) {
    errorCity.innerText = "Veuillez remplir ce champ";
    errorCity.style.display = "block";
    inputCity.value = "";
    return false;
  }
  if (valueCity.length < 2) {
    errorCity.innerText = "Veuillez recommencer";
    errorCity.style.display = "block";
    return false;
  }
  errorCity.style.display = "none";
  return true;
}
function deleteProduct (){
  let deleteButtons = document.querySelectorAll('.delete');
  deleteButtons.forEach ((buttonDelete)=>{
  buttonDelete.addEventListener('click', function(e){
    e.preventDefault();
    let index = e.currentTarget.id; //on récupère la position du produit dans le tableau de produits
    produits = produits.filter((produit, position)=> position != index);// on filtre tous les produits dont la position est différente de la valeur de la variable index
    localStorage.setItem('produits', JSON.stringify(produits));// on met à jour les produits dans le localstorage
    reload();//on recharge la page
  })
  })
}
affichage();
sendButton();
deleteProduct();

