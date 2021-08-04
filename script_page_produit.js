//récupération de la chaine de requete

const queryString_url_id = window.location.search;
console.log(queryString_url_id);

const IdPeluche = queryString_url_id.slice(4);//on isole l'id sans le préfixe


 
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

