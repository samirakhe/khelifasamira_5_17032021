//------------------------------------Succès commande----------------

function successOrder() {
    let orderSTR = sessionStorage.getItem('order');
    let order = JSON.parse(orderSTR);
    let recapTotal = document.querySelector('.recapTotal');
    let orderId = document.querySelector('.orderId');
    recapTotal.innerText = `Montant total de votre commande : ${order.total}`;
    orderId.innerText = `Vous pouvez suivre votre commande à l'aide de son numéro : ${order.orderId}`;
  
  }
  successOrder();