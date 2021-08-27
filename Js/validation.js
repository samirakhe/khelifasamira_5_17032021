//------------------------------------Succès commande----------------
//Fonction permettant d'afficher un message de remerciements , le total de la commande et l'id de la commande
function successOrder() {
    let orderSTR = sessionStorage.getItem('order');
    let order = JSON.parse(orderSTR);
    
    let recapTotal = document.querySelector('.recapTotal');
    let orderId = document.querySelector('.orderId');
    
    recapTotal.innerText = `Montant total de votre commande : ${order.total}`;
    orderId.innerText = `La commande n° : ${order.orderId} a bien été enregistrée.` ;
  
  }
  successOrder();