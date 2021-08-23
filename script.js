//Création de la fonction qui nous permettra de récupérer les données des objets
async function shop (){
    const response = await fetch ('http://localhost:3000/api/teddies');
    let data = await response.json();
    affichage(data);
};

//Création de la fonction qui nous permet d'afficher les données récupérées
function affichage (data){
    let container = document.querySelector('.product_list'); //Div contenant tous nos "objets" créés
    for (let i = 0; i < data.length; i+=1)//Itération des données
        {
            let info = data[i];//Info correspond à un seul élément de data (l'élément qui est à la position i)
            
            //Création des éléments qui paramètrent nos objets - Assignation à leur parents
            let peluche = document.createElement('div');
            peluche.classList.add('peluche');
            peluche.id = info._id;
            let lien_produit = document.createElement('a');
            lien_produit.href = "page_produit.html?id="+ info._id;
            let img =  document.createElement('img');
            img.src = info.imageUrl;
            img.classList.add('image_produit');
            img.alt = info.name;
            lien_produit.appendChild(img);
            peluche.appendChild(lien_produit);
            let h2 = document.createElement('h2');
            h2.innerText = info.name;
            peluche.appendChild(h2);
            let description_courte = document.createElement('p');
            description_courte.classList.add('description_courte');
            description_courte.innerText = 'Plusieurs coloris disponibles';
            peluche.appendChild(description_courte);
            let price = document.createElement('p');
            price.classList.add('price');
            price.innerText = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(info.price/100);
            peluche.appendChild(price);
            let lien = document.createElement('a');
            lien.href = "page_produit.html?id="+ info._id;//Concaténation qui permet d'afficher l'id de chaque objet dans le permalien
            let button = document.createElement('button');
            button.innerText = 'Voir le produit';
            lien.appendChild(button);
            peluche.appendChild(lien);
            container.appendChild(peluche);
        }
}
shop();