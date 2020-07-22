var removeCartItemButtons = document.getElementsByClassName("btn-danger")
for(i=0;i<removeCartItemButtons.length;i++){
    var button=removeCartItemButtons[i]
    button.addEventListener('click',removeCartItem)
}

var addShopItemButtons = document.getElementsByClassName("shop-item-button")
for(i=0;i<addShopItemButtons.length;i++){
    var addButton = addShopItemButtons[i]
    addButton.addEventListener('click',addToCartClicked)
    
}

var qunatityInputs = document.getElementsByClassName("cart-quantity-input")
for(i=0;i<qunatityInputs.length;i++){
    var input = qunatityInputs[i]
    input.addEventListener('change',quantityChanged)
}

document.getElementsByClassName("btn-purchase")[0].addEventListener('click',purchaseButtonClicked)

var likeButtons = document.getElementsByClassName("likeButton")
for(i=0;i<likeButtons.length;i++){
    var likeButton = likeButtons[i]
    likeButton.addEventListener('click',changeBackgroundColor)
}

function changeBackgroundColor(event){
    likeButton = event.target
    
    if(likeButton.style.color!="red"){
    likeButton.style.color="red"}
    else{
        likeButton.style.color="black"
    }
    

}

function purchaseButtonClicked(){
    alert("Thank you for your purchase, there's a lot of other stuff to check too ")
    var cartItems = document.getElementsByClassName("cart-items")[0]
    while(cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)       
    }
    updateCartTotal()
}

function addToCartClicked(event){
    var addButton = event.target
    var shopItem = addButton.parentElement.parentElement
    var title = shopItem.getElementsByClassName("shop-item-title")[0].innerText
    var price = shopItem.getElementsByClassName("shop-item-price")[0].innerText
    var imageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src

    additemToCart(title,price,imageSrc)
    updateCartTotal()
}

function additemToCart(title,price,imageSrc){
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName("cart-items")[0]
    var cartItemNames = cartItems.getElementsByClassName("cart-item-title")
    for (i=0;i<cartItemNames.length;i++){
        if(cartItemNames[i].innerText == title){
            alert('This item has already been added')
            return
        }
    }
    var cartRowContent = `
    <div class="cart-column-image">
    <span class="cart-item-title"> ${title} </span>
    <img class="cart-item-image" src="${imageSrc}" width="150px" height="150px" alt="Skirt">
</div>  
<span class="cart-price"> ${price} </span>
<div class="cart-quantity">
    <input class="cart-quantity-input" type="number" value="1">
    <button class="btn btn-danger" type="button">REMOVE</button>
</div> `
    cartRow.innerHTML = cartRowContent
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',quantityChanged)
    
}

function quantityChanged(event){
    var input = event.target
    if(isNaN(input.value) || input.value <=0){
        input.value = 1
    }
    updateCartTotal()
}

function removeCartItem(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartItemRows = cartItemContainer.getElementsByClassName("cart-row")
    var total = 0
    for(i=0;i<cartItemRows.length;i++){
        var cartRow = cartItemRows[i]
        var priceElement = cartRow.getElementsByClassName("cart-price")[0]
        var quantityElement = cartRow.getElementsByClassName("cart-quantity-input")[0]
        var price = parseFloat(priceElement.innerText.replace('$',''))
        var quantity = quantityElement.value
        total = total + (quantity*price)
    }
    total = Math.round(total*100)/100
    document.getElementsByClassName("cart-total-price")[0].innerText = '$' + total
    
}
