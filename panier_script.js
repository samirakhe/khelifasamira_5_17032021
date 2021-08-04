let container = document.querySelector('.container');


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



console.log(container);