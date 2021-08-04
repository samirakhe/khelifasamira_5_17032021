//Création de l'objet :

class Nounours 
{
    constructor (price)
        {this.price = price}
}

//Création de la fonction qui nous permettra de récupérer les données
async function test (){
    const response = await fetch ('http://localhost:3000/api/teddies');
    let data = await response.json();
    console.log(data);
    affichage(data);
}

//Création de la fonction qui nous permet d'afficher les données récupérées
function affichage (data){
    let container = document.querySelector('.product_list'); //on appelle la div qui va contenir tous nos "objets" créés
    for (let i = 0; i < data.length; i+=1)//on créé la boucle qui affichera les données en faisant une itération
        {
            let info = data[i];//info correspond à un seul élément de data (l'élément qui est à la position i)
            let peluche = document.createElement('div');//on va créer les éléments qui paramètrent nos objets, et les assigner à leur parents
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
test();














/*for (let i = 0;i < data.length;i +=1)
{
    //let donnee = data[i];
    let teddy = new Nounours (donnee.imageUrl, donnee.name,donnee.price,donnee.colors);
    products.push (teddy);
    let html = document.createElement('p');
    let img = document.createElement ('img');
    let prix = document.createElement ('p');
    let description = document.createElement ('p');
    img.src = donnee.imageUrl;
    html.innerText = teddy.name;
    prix.innerText = donnee.price;
    if (teddy.colors.length > 1){
        description.innerText = 'plusieurs couleurs disponibles'
    }
    let tableau = document.getElementsByClassName('produit')[0];
    html.className = 'rouge';
    tableau.appendChild(html);
    tableau.appendChild(img);
    tableau.appendChild(prix);
    tableau.appendChild(description);

}
*/
