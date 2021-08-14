/*function afficherProduits(){
    let datas = localStorage.getItem('produits');
    if (datas){
        let produits = JSON.parse(datas);
        let containerProduits = document.querySelector('.containerProduits');
        for (const produit of produits) {
            let divNomCouleur = document.createElement('div');
            divNomCouleur.classList.add('divNomCouleur');
            let nomProduit = document.createElement('p');
            nomProduit.innerText = produit.name;
            divNomCouleur.appendChild(nomProduit);
            let couleurProduit = document.createElement('p');
            couleurProduit.innerText = produit.selectedColor;
            divNomCouleur.appendChild(couleurProduit);
            let quantityProduit = document.createElement('p');
            quantityProduit.innerText = produit.quantity;
            quantityProduit.classList.add('quantity');
            divNomCouleur.appendChild(quantityProduit);
            containerProduits.appendChild(divNomCouleur);
        }
    }
}
afficherProduits();*/

let produitLocalStorage = JSON.parse(localStorage.getItem('produits'));
console.log(produitLocalStorage);
produits = produitLocalStorage;
//selection de la classe ou je vais injecter mon html
const positionsElement = document.querySelector('.tbody');
//si le panier est vide : afficher le panier est vide
let structureProduitPanier =  [];
if (produits === null)
{
    const paniervide = `
    <div class = "containerPanierVide">
        <div>LE PANIER EST VIDE</div>
        <a href="index.html">Retourner à la boutique</a>
    </div>
    `
    let tableau = document.querySelector('.tableau');
    tableau.innerHTML= paniervide;
}else 
{

    // si le panier n'est pas vide , afficher les produits dans le localstorage
    let nbproduit = 0;


    for (j = 0; j < produits.length; j++){
        
        nbproduit += produits[j].quantity;
        structureProduitPanier = structureProduitPanier +  `
       
            <tr>
                <td class="divNomCouleur">${produitLocalStorage[j].name}</td>
                <td class="quantity">${produitLocalStorage[j].quantity}</td>
                <td class="coloris">${produitLocalStorage[j].selectedColor}</td>
                <td class="prix">${produitLocalStorage[j].price}</td>
                <td class="soustotal"></td>

            </tr>
            `;
  
}

if (j === produitLocalStorage.length);{
positionsElement.innerHTML = structureProduitPanier;
    }
    console.log('je suis ici ' + nbproduit);
}

//-------------------------------------------------TOTAL Prix produit----------------------------------------

for (m = 0; m < produits.length; m++){
    let quantité = produitLocalStorage[m].quantity;
    let prixUnitaire = produitLocalStorage[m].price;

    sousTotal = quantité * prixUnitaire;

    console.log(sousTotal);

}


//-------------------------------------------------TOTAL PANIER----------------------------------------

// Déclaration d'une variable pour y mettre les prix present dans le panier

let prixTotalCalcul = [];

// Ensuite on va chercher les prix dans le panier

for (let k = 0; k < produitLocalStorage.length; k++){
    let prixProduitPanier = produitLocalStorage[k].price;
   

    // Mettre à present les prix dans un tableau , donc dans la variable prixTotalCalcul

    prixTotalCalcul.push(prixProduitPanier);
    console.log(prixTotalCalcul);
}

// additonner le tout avec reduce

const reducer = (acc, cur) => acc + cur;
const prixTotal = prixTotalCalcul.reduce(reducer);
console.log(prixTotal);

// le html du prix total :

const afficherPrixTotal = `<div class="prixTotal">Le prix total est : ${prixTotal}</div>`;
//selection de la classe ou je vais injecter mon html
const positionsElement2 = document.querySelector('.tfoot');
positionsElement2.innerHTML = afficherPrixTotal;


//-----------------------------------VIDER LE PANIER-------------------------------------------------


let btn_viderPanier = document.querySelector('.paniervide');

//suppression de la key produit du localstorage

btn_viderPanier.addEventListener('click', (e)=>{
    e.preventDefault();
    localStorage.removeItem('produits');
    alert('Le panier a été vidé');
    window.location.href = "panier.html";

});




//-----------------------------------------FORMULAIRE-------------------------------------------------


//selection du bouton

let btn_envoyerleformulaire = document.querySelector('.bouton_commande');

//adEvenetlistener

btn_envoyerleformulaire.addEventListener('click',function(e){
    e.preventDefault();

validateName();
validateSurname();
validerEmail();
validateAdress();
validateCP();
validateCity();


    const leformulaire = {

        nom : document.querySelector('#votrenom').value,
        prenom : document.querySelector('#prenom').value,
        email : document.querySelector('#email').value,
        adresse : document.querySelector('#adresse').value,
        code_postal : document.querySelector('#cp').value,
        ville : document.querySelector('#ville').value
    }
    
    console.log(leformulaire);

} )

function validateName(){
    let inputName = document.querySelector('#votrenom');
    let valueName = inputName.value;
    let errorName = document.querySelector('.nom');
    //trim permet de supprimer les espaces au extremités d'une chaine de caractères
    if ( !valueName.trim()){
        errorName.innerText = 'Veuillez remplir ce champ';
        errorName.style.display = 'block';
        inputName.value = '';// '' permet de vider le champs entierement
        return false;
    }
    if (valueName.length < 2)
    {
        errorName.innerText = 'Votre nom est trop court';
        errorName.style.display = 'block';
        return false;
    }
    errorName.style.display = 'none';
    return true;
}

function validateSurname(){
    let inputSurname = document.querySelector('#prenom');
    let valueSurname = inputSurname.value;
    let errorSurname = document.querySelector('.prenom');
    //trim permet de supprimer les espaces au extremités d'une chaine de caractères
    if ( !valueSurname.trim()){
        errorSurname.innerText = 'Veuillez remplir ce champ';
        errorSurname.style.display = 'block';
        inputSurname.value = '';// '' permet de vider le champs entierement
        return false;
    }
    if (valueSurname.length < 2)
    {
        errorSurname.innerText = 'Votre prenom est trop court';
        errorSurname.style.display = 'block';
        return false;
    }
   

}

function validerEmail(){

    let inputMail = document.getElementById('email');
    let valueMail = inputMail.value;
    let errorMail = document.querySelector('.email');
    var regx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

        if(!regx.test(inputMail.value)){
            errorMail.innerText = 'Adresse email incorrecte';
            errorMail.style.display = 'block';
            inputMail.value = '';// '' permet de vider le champs entierement
            inputMail.focus;
            return false;
        }
        else{
            errorMail.style.display = 'none';
        }
}


function validateAdress(){
    let inputAdress = document.querySelector('#adresse');
    let valueAdress = inputAdress.value;
    let errorAdress = document.querySelector('.adresse');
    //trim permet de supprimer les espaces au extremités d'une chaine de caractères
    if ( !valueAdress.trim()){
        errorAdress.innerText = 'Veuillez remplir ce champ';
        errorAdress.style.display = 'block';
        inputAdress.value = '';// '' permet de vider le champs entierement
        return false;
    }
    if (valueAdress.length < 5)
    {
        errorAdress.innerText = 'Adresse erronée';
        errorAdress.style.display = 'block';
        return false;
    }
    errorAdress.style.display = 'none';
    return true;
}

function validateCP(){
    let inputCP = document.querySelector('#cp');
    let valueCP = inputCP.value;
    let errorCP = document.querySelector('.cp');
    //trim permet de supprimer les espaces au extremités d'une chaine de caractères
    if ( !valueCP.trim()){
        errorCP.innerText = 'Veuillez remplir ce champ';
        errorCP.style.display = 'block';
        inputCP.value = '';// '' permet de vider le champs entierement
        return false;
    }
    if (valueCP.length < 5)
    {
        errorCP.innerText = 'Entrer un code postal correct';
        errorCP.style.display = 'block';
        return false;
    }
    errorCP.style.display = 'none';
    return true;
}

function validateCity(){
    let inputCity = document.querySelector('#ville');
    let valueCity = inputCity.value;
    let errorCity = document.querySelector('.ville');
    //trim permet de supprimer les espaces au extremités d'une chaine de caractères
    if ( !valueCity.trim()){
        errorCity.innerText = 'Veuillez remplir ce champ';
        errorCity.style.display = 'block';
        inputCity.value = '';// '' permet de vider le champs entierement
        return false;
    }
    if (valueCity.length < 2)
    {
        errorCity.innerText = 'Veuillez recommencer';
        errorCity.style.display = 'block';
        return false;
    }
    errorCity.style.display = 'none';
    return true;
}
