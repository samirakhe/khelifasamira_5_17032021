//récupération de la chaine de requete

const queryString_url_id = window.location.search;
console.log(queryString_url_id);

const IdPeluche = queryString_url_id.slice(4);//on isole l'id sans le préfixe

console.log(IdPeluche);
 
async function test (){
    const response = await fetch (`http://localhost:3000/api/teddies/${IdPeluche}`);
    let data = await response.json();
    maPeluche(data);//on appelle la fonction de construction mapeluche et on y place data   
}//on récupère les données de chaque produit avec le suffixe `${}`
test();


let body = document.querySelector('body');
let lebody = document.createElement('div');
lebody.classList.add('lebody');
let retour = document.createElement('a');
retour.href = "index.html";
let button2 = document.createElement('button2');
button2.innerText = 'Retour à la page précédente';
body.appendChild(lebody);
lebody.appendChild(retour);
retour.appendChild(button2);
console.log(lebody)


function maPeluche(data) {
 
    let container = document.querySelector('.container');
           
            let img =  document.createElement('img');
            img.src = data.imageUrl;
            img.classList.add('image_produit');
            img.alt = data.name;
            container.appendChild(img);
            let info_produit = document.createElement('div');
            info_produit.classList.add('info_produit');
            container.appendChild(info_produit);
            let h1 = document.createElement('h1');
            h1.innerText = data.name;
            info_produit.appendChild(h1);
            let description = document.createElement('p');
            description.classList.add('description');
            description.innerText = data.description;
            info_produit.appendChild(description);
            let price = document.createElement('p');
            price.classList.add('price');
            price.innerText = data.price + '€';
            info_produit.appendChild(price);
            let lien = document.createElement('a');
            lien.href = "#";
            let button = document.createElement('button');
            button.innerText = 'Ajouter au panier';
            lien.appendChild(button);
            info_produit.appendChild(lien);
};








/*//Création de la fonction qui nous permettra de récupérer les données
async function test (){
    const response = await fetch ('http://localhost:3000/api/teddies?id');
    let data = await response.json();
    console.log(data);
  
}
test();

let data = test;
function maPeluche() {
    let container = document.querySelector('.container');
    let info = data;
    let nom = document.createElement('p');
    nom.innerText = 'Arnold';
    container.appendChild(nom);
    let price = document.createElement('p');
    price.innerText = '55€';
    container.appendChild(price);
    let lien = document.createElement('a');
    lien.href = "#";
    let button = document.createElement('button');
    button.innerText = 'Ajouter au panier';
    lien.appendChild(button);
    container.appendChild(lien);


}
maPeluche();












//Création de la fonction qui nous permet d'afficher les données récupérées
function affichage (data){
    let container = document.querySelector('.container'); //on appelle la div qui va contenir tous nos "objets" créés
    for (let i = 0; i < data.length; i+=1)//on créé la boucle qui affichera les données en faisant une itération
        {
            let info = data[i];//info correspond à un seul élément de data (l'élément qui est à la position i)
            let peluche = document.createElement('div');//on va créer les éléments qui paramètrent nos objets, et les assigner à leur parents
            peluche.classList.add('peluche');
            peluche.id = info._id;
            let img =  document.createElement('img');
            img.src = info.imageUrl;
            img.classList.add('image_produit');
            img.alt = info.name;
            peluche.appendChild(img);
            let h2 = document.createElement('h2');
            h2.innerText = info.name;
            peluche.appendChild(h2);
            let description_courte = document.createElement('p');
            description_courte.classList.add('description_courte');
            description_courte.innerText = 'Plusieurs coloris disponibles';
            peluche.appendChild(description_courte);
            let price = document.createElement('p');
            price.classList.add('price');
            price.innerText = info.price + '€';
            peluche.appendChild(price);
            let lien = document.createElement('a');
            lien.href = "page_produit.html?id="+ info._id;//concaténation qui permet d'afficher l'id de chaque objet dans le permalien
            let button = document.createElement('button');
            button.innerText = 'Voir le produit';
            lien.appendChild(button);
            peluche.appendChild(lien);
            container.appendChild(peluche);

        }
 
}
test();*/




