//récupération de la chaine de requete

const queryString_url_id = window.location.search;
console.log(queryString_url_id);

const IdPeluche = queryString_url_id.slice(4);//on isole l'id sans le préfixe


 
async function test (){
    const response = await fetch (`http://localhost:3000/api/teddies/${IdPeluche}`);
    let data = await response.json();
    maPeluche(data);
    console.log(data)//on appelle la fonction de construction mapeluche et on y place data   
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
            let price = document.createElement('p');
            price.classList.add('price');
            price.innerText = data.price + '€';
            info_produit.appendChild(price);
            let description = document.createElement('p');
            description.classList.add('description');
            description.innerText = data.description;
            info_produit.appendChild(description);
            let color = document.createElement('select');//CREATION DU MENU DEROULANT
            color.classList.add('color');//LE MENU SAPEL COLOR
            let alerte = document.createElement('small');//TEXT DERREUR
            alerte.id = 'alerte'; //ON LUI DONNE UN ID ALERTE
            info_produit.appendChild(color);
            info_produit.appendChild(alerte);
            let option = document.createElement('option'); // CREATION DU CHOIX PAR DEFAULT
            option.innerText = 'choix des couleurs';
            option.value = '';// cette option n'a pas de value donc quand elle est selecitonné elle est nulle
            color.appendChild(option);
            for (let i = 0; i < data.colors.length; i+=1)
                {
                    let info = data.colors[i]; //dans les données du produits on veut la clé colors
                    let color1 = document.createElement('option');// ON CREE COLOR1 QUI CORRESPONDRA A CHAUQE COULEUR
                    color1.classList.add('color1');
                    color1.innerText = info;//COLOR1 CORRESPOND A INFO QUI LUI MEME CORRESPOND A DATA COLORS
                    color1.value = info;//sa valeur c'est celle de info
                    color.appendChild(color1);//on lui donne comme parent le menu deroulant 
                };
            color.addEventListener('change', function (e){ 
                console.log(e);
                let valeur = e.target.value; // le e correspond au type change, target correspond a lelement html donc ici c'est select, et value correspond à color
                if (valeur){
                    alerte.innerText = '';
                }

           })
            let lien = document.createElement('a');
            lien.href = "#";
            let button = document.createElement('button');
            button.innerText = 'Ajouter au panier';
            lien.appendChild(button);
            info_produit.appendChild(lien);
            button.addEventListener('click', function (e){ 
                e.preventDefault();
                
               let selectedColor = color.value;//variable pour la couleur choisi avec la valeur du menu deroulant
                console.log(selectedColor);
                if (!selectedColor){ // si différents de selectedcolor alors on affiche ce message
                    alerte.innerText = "Veuillez sélectionner une couleur";
                }
                else 
                {
                    let produit = data;//produit equivant aux donnée du produit
                    produit.selectedColor = selectedColor;
                    let datas = localStorage.getItem('produits');
                    //let panier = localStorage.getItem('produits') || [] pareil que ligne 77 sauf que l'on ne converti pas
                    let panier = datas? JSON.parse(datas) : [];//: signifie if; data? signifie que si cette donnée est défini alors ca converti en json sinon ca renvoi un tableau vide
                    let index = panier.findIndex(function (element){
                        return element._id === produit._id && element.selectedColor === produit.selectedColor;

                })
                    console.log(index);
                    if (index >= 0){
                        let exist = panier[index];
                        exist.quantity = exist.quantity +1;
                        panier[index] = exist; //pour remplacer le produit qui a été incrémenter, passer de 1 à 2 3 4..
                    }
                    else {
                        produit.quantity = 1;
                        panier.push(produit);//rentre les données du produits (data)dans le tableau "panier"

                    }
                    
                    localStorage.setItem('produits', JSON.stringify(panier))
                }   
                
                window.location.href = 'panier.html';
            })
};

