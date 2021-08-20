//Récupération de la chaine de requête
const queryString_url_id = window.location.search; // Propriété contenant l'URL du document
const IdPeluche = queryString_url_id.slice(4); //Permet d'isoler l'id sans le préfixe

async function oneProduct () {
  const response = await fetch(`http://localhost:3000/api/teddies/${IdPeluche}`);//Récupération des données de chaque produit avec un gabarit
  let data = await response.json();
  data.price = data.price/100;
  maPeluche(data);//on appelle la fonction de construction mapeluche et on y place data
} 
oneProduct();

/*let body = document.querySelector("body");
let lebody = document.createElement("div");
lebody.classList.add("lebody");
body.appendChild(lebody);*/

function maPeluche(data) {
  let container = document.querySelector(".container");
//Création des éléments et Assignation à leur parents

  let img = document.createElement("img");
  img.src = data.imageUrl;
  img.classList.add("image_produit");
  img.alt = data.name;
  container.appendChild(img);
//Informations globales-------------------------------------------------------------------------------------------
  let info_produit = document.createElement("div");
  info_produit.classList.add("info_produit");
  container.appendChild(info_produit);
//Nom du produit-------------------------------------------------------------------------------------------
  let h1 = document.createElement("h1");
  h1.innerText = data.name;
  info_produit.appendChild(h1);
//Prix du produit-------------------------------------------------------------------------------------------
  let price = document.createElement("p");
  price.classList.add("price");
  price.innerText = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(data.price);
  info_produit.appendChild(price);
//Description du produit-------------------------------------------------------------------------------------------
  let description = document.createElement("p");
  description.classList.add("description");
  description.innerText = data.description;
  info_produit.appendChild(description);
//Couleur du produit -  Création du menu déroulant-------------------------------------------------------------------------------------------
  let colorMenu = document.createElement("select"); 
  colorMenu.classList.add("colorMenu");
  let alerte = document.createElement("small"); //texte d'erreur
  alerte.id = "alerte";
  info_produit.appendChild(colorMenu);
  info_produit.appendChild(alerte);
// Création du choix par défaut
  let optionDefaut = document.createElement("option"); 
  optionDefaut.innerText = "Couleurs disponibles";
  optionDefaut.value = ""; //aucune value pour un résultat null à la sélection
  colorMenu.appendChild(optionDefaut);

  for (let i = 0; i < data.colors.length; i += 1) {
    let info = data.colors[i]; // Clé "colors" dans les données du produits (data)
    let color = document.createElement("option"); // Variable 'color' qui correspondra à chaque couleur
    color.classList.add("color");
    color.innerText = info; //Texte de la variable color = info = data.colors
    color.value = info; //Valeur de la variable color = info = data.colors
    colorMenu.appendChild(color);
  }
  colorMenu.addEventListener("change", function (e) {//Change est déclenché lorsqu'un changement de valeur est réalisé par l'utilisateur
    let valeur = e.target.value; //e correspond au type change, target correspond à l'élément html select, et value correspond à color
    if (valeur) {
      alerte.innerText = "";
    }
  });
//Quantité du produit-------------------------------------------------------------------------------------------
  let choixQuantité = document.createElement('input');
  choixQuantité.type = 'number';
  choixQuantité.classList.add('quantité');
  choixQuantité.value = 1;
  choixQuantité.min = 1;
  info_produit.appendChild(choixQuantité);
//Bouton ajouer au panier-------------------------------------------------------------------------------------------
  let button = document.createElement("button");
  button.innerText = "Ajouter au panier";
  info_produit.appendChild(button);
  button.addEventListener("click", function (e) {
    e.preventDefault();
    let selectedColor = colorMenu.value; //Couleur choisi avec la valeur du menu déroulant
    if (!selectedColor) {
      alerte.innerText = "Veuillez sélectionner une couleur";
    } else {
      let produit = data; //produit équivaut aux données du produit
      produit.selectedColor = selectedColor;
      let datas = localStorage.getItem("produits");
      let panier = datas ? JSON.parse(datas) : []; //data? signie que si cette donnée est définie, converison en JSON. Sinon, affichage tableau vide.
      let index = panier.findIndex(function (element) {
        return (
          element._id === produit._id &&
          element.selectedColor === produit.selectedColor
        );
      });     
      if (index >= 0) {
        let exist = panier[index];
        exist.quantity = exist.quantity + choixQuantité.value;
        panier[index] = exist; //pour remplacer le produit qui a été incrémenter, passer de 1 à 2 3 4..
      } else {
        produit.quantity = choixQuantité.value;
        panier.push(produit); //rentre les données du produits (data)dans le tableau "panier"
      }
      localStorage.setItem("produits", JSON.stringify(panier));
      alert('Le produit a été ajouté au panier');
    }
  });
}
