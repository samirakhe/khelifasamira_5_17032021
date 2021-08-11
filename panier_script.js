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

let produitEnregistresDansLeLocalStorage = JSON.parse(localStorage.getItem('produits'));
console.log(produitEnregistresDansLeLocalStorage);
produits = produitEnregistresDansLeLocalStorage;
//selection de la classe ou je vais inhetcer mon html
const positionsElement3 = document.querySelector('.tbody');
//si le panier est vide : afficher le panier est vide
let structureProduitPanier =  [];
if (produits === null)
{
    const paniervide = `
    <div class = "containerPanierVide">
        <div>Le panier est vide</div>
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
        //structureProduitPanier =  structureProduitPanier 
        structureProduitPanier = structureProduitPanier +  `
       
            <tr>
                <td class="divNomCouleur">${produitEnregistresDansLeLocalStorage[j].name}</td>
                <td class="quantity">${produitEnregistresDansLeLocalStorage[j].quantity}</td>
                <td class="prix">${produitEnregistresDansLeLocalStorage[j].price}</td>
                <td class="coloris">${produitEnregistresDansLeLocalStorage[j].selectedColor}</td>

            </tr>
            `;
  
}

if (j === produitEnregistresDansLeLocalStorage.length);{
positionsElement3.innerHTML = structureProduitPanier;
    }
    console.log('je suis ici ' + nbproduit);
}



//------------------------------------------------------------------------------------------
//FORMULAIRE

//selection du bouton

let btn_envoyerleformulaire = document.querySelector('.bouton_commande');

//adEvenetlistener

btn_envoyerleformulaire.addEventListener('click',function(e){
    e.preventDefault;

    // mettre les valeurs du formulaire dans un objet
validateName();
    const leformulaire = {

        nom : document.querySelector('#votrenom').value,
        prenom : document.querySelector('#prenom').value,
        email : document.querySelector('#email').value,
        date : document.querySelector('#date').value,
        adresse : document.querySelector('#adresse').value,
        code_postal : document.querySelector('#cp').value,
        ville : document.querySelector('#ville').value
    }
    
    console.log(leformulaire);

} )

function validateName(){
    let inputName = document.querySelector('#votrenom');
    let valueName = inputName.value;
    let errorName = document.querySelector('.error');
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







































/*</div>let container = document.querySelector('.container');


// BLOC NOM ET PRENOM 

// CASE NOM

let section1 = document.createElement('div');
section1.classList.add('section1');
container.appendChild(section1);

let coordonnees = document.createElement('h3');
coordonnees.classList.add('h3');
coordonnees.innerText = 'Vos coordonnées';
section1.appendChild(coordonnees);

let form = document.createElement('form');
form.classList.add('form');
section1.appendChild(form);

let nom_et_prenom = document.createElement('div');
nom_et_prenom.classList.add('nom_et_prenom');
form.appendChild(nom_et_prenom);

let div_name = document.createElement('div');
div_name.classList.add('div_name');
nom_et_prenom.appendChild(div_name);

let name_label = document.createElement('label');
name_label.classList.add('name_label');
name_label.innerText = 'Nom';
nom_et_prenom.appendChild(name_label);

let name_input = document.createElement('input');
name_input.classList.add('name_input')
name_input.type = 'text';
nom_et_prenom.appendChild(name_input);

//CASE PRENOM

let div_prenom = document.createElement('div');
div_prenom.classList.add('div_prenom');
nom_et_prenom.appendChild(div_prenom);

let prenom_label = document.createElement('label');
prenom_label.classList.add('prenom_label');
prenom_label.innerText = 'Prénom';
nom_et_prenom.appendChild(prenom_label);

let prenom_input = document.createElement('input');
prenom_input.classList.add('prenom_input')
prenom_input.type = 'text';
nom_et_prenom.appendChild(prenom_input);

// CASE EMAIL


let div_email = document.createElement('div');
div_email.classList.add('div_email');
form.appendChild(div_email);

let email_label = document.createElement('label');
email_label.classList.add('email_label');
email_label.innerText = 'Email';
div_email.appendChild(email_label);

let email_input = document.createElement('input');
email_input.classList.add('email_input')
email_input.type = 'email';
div_email.appendChild(email_input);


// CASE DATE DE NAISSANCE

let date_de_naissance = document.createElement('div');
container.appendChild(date_de_naissance);

let div_date_de_naissance = document.createElement('div');
div_date_de_naissance.classList.add('div_date_de_naissance');
form.appendChild(div_date_de_naissance);

let date_de_naissance_label = document.createElement('label');
date_de_naissance_label.classList.add('date_de_naissance_label');
date_de_naissance_label.innerText = 'Date de naissance';
div_date_de_naissance.appendChild(date_de_naissance_label);

let date_de_naissance_input = document.createElement('input');
date_de_naissance_input.classList.add('date_de_naissance_input')
date_de_naissance_input.type = 'date';
div_date_de_naissance.appendChild(date_de_naissance_input);

// CASE ADRESSE

let adresse = document.createElement('div');
container.appendChild(adresse);

let div_adresse = document.createElement('div');
div_adresse.classList.add('div_adresse');
form.appendChild(div_adresse);

let adresse_label = document.createElement('label');
adresse_label.classList.add('adresse_label');
adresse_label.innerText = 'Adresse';
div_adresse.appendChild(adresse_label);

let adresse_input = document.createElement('input');
adresse_input.classList.add('adresse_input')
adresse_input.type = 'text';
div_adresse.appendChild(adresse_input);


//BLOC CODE POSTAL ET VILLE

//CASE CODE POSTAL

let cp_ville = document.createElement('div');
form.appendChild(cp_ville);

let div_cp = document.createElement('div');
div_cp.classList.add('div_cp');
cp_ville.appendChild(div_cp);

let cp_label = document.createElement('label');
cp_label.classList.add('cp_label');
cp_label.innerText = 'Code Postal';
div_cp.appendChild(cp_label);

let cp_input = document.createElement('input');
cp_input.classList.add('cp_input')
cp_input.type = 'number';
div_cp.appendChild(cp_input);

// CASE VILLE

let div_ville = document.createElement('div');
div_ville.classList.add('div_ville');
cp_ville.appendChild(div_ville);

let ville_label = document.createElement('label');
ville_label.classList.add('cp_label');
ville_label.innerText = 'Ville';
div_ville.appendChild(ville_label);

let ville_input = document.createElement('input');
ville_input.classList.add('ville_input');
ville_input.type = 'text';
div_ville.appendChild(ville_input);


//SECTION 2

let section2 = document.createElement('div');
section2.classList.add('section2');
container.appendChild(section2);

let recap = document.createElement('h3');
recap.classList.add('h3');
recap.innerText = 'Récapitulatif de votre commande';
section2.appendChild(recap);

let bouton_commande = document.createElement('button');
bouton_commande.classList.add('bouton_commande');
bouton_commande.innerText = 'Valider la commande et Payer';
section2.appendChild(bouton_commande);



console.log(container);*/
