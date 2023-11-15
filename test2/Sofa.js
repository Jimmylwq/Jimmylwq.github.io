let iconCart = document.querySelector('.icon-cart');
let closeCart = document.querySelector('.close');
let body = document.querySelector('body');
let listProductHTML = document.querySelector('.ListProduct');
let listCartHTML = document.querySelector('.ListCart');
let iconCartSpan = document.querySelector('.icon-cart span');

let listProducts = [];
let carts = [];
//open and close the window
iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart')
})
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart')
})

//to show out the product in html 
const addDataToHTML = () => {
    listProductHTML.innerHTML = "";
    if (listProducts.length > 0) {
        listProducts.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.dataset.id = product.id
            newProduct.innerHTML = `
            <img src="${product.image}" alt='Cabinet'>
            <h2>${product.name}</h2>
            <div class="price">RM${product.price}</div>
            <button class="addCart">
                Add To cart
            </button>
            `;
            listProductHTML.appendChild(newProduct);
        })
    }
}
listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('addCart')) {
        let product_id = positionClick.parentElement.dataset.id;
        addToCart(product_id);
    }
})
// if still have no quantity, it will add 1 ,if have already,it will add one more 
const addToCart = (product_id) => {
    let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
    if (carts.length <= 0) {
        carts = [{
            product_id: product_id,
            quantity: 1
        }]
    }else if(positionThisProductInCart < 0){
        carts.push({
            product_id: product_id,
            quantity: 1
        });
    }else{
        carts[positionThisProductInCart].quantity = carts[positionThisProductInCart].quantity + 1;
    }
    addCartToHTML();
    //addCartToMemory();
}
// this one is for when i close the computer the quantity will not gone and save as well
//const addCartToMemory = () => {
//    localStorage.setItem('cart', JSON.stringify(carts));
//}
const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    //this one is for my icon to show out how many product in my shopping cart
    let totalQuantity = 0;
    if (carts.length > 0) {
        carts.forEach(cart => {
            //icon show out the shopping cart
            totalQuantity = totalQuantity + cart.quantity;
            let newCart = document.createElement('div');
            newCart.classList.add('item');
            newCart.dataset.id = cart.product_id;
            let positionProduct = listProducts.findIndex((value) => value.id == cart.product_id);
            let info = listProducts[positionProduct];
            // to edit or add the data in the shopping cart
            newCart.innerHTML = `
                <div class="image">
                    <img src="${info.image}" alt="Cabinat">
                </div>
                <div class="name">
                ${info.name}
                </div>
                <div class="totalPrice">
                    ${info.price * cart.quantity}
                </div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span>${cart.quantity}</span>
                    <span class="plus">></span>
                </div>
            `;
        listCartHTML.appendChild(newCart);
        })
    }
    iconCartSpan.innerText = totalQuantity;
    updateTotalPrice();
}


// Calculate the total for the product
const calculateTotalPrice = () => {
    let totalPrice = 0;

    carts.forEach(cart => {
        let positionProduct = listProducts.findIndex(product => product.id == cart.product_id);
        let productInfo = listProducts[positionProduct];

        totalPrice += productInfo.price * cart.quantity;
    });

    return totalPrice;
}
// Update the total price display
const updateTotalPrice = () => {
    let total = calculateTotalPrice();
    // Assuming you have an element with id 'totalPriceDisplay' to show the total price
    document.getElementById('totalPriceDisplay').innerText = `Total Price: RM${total}`;
}

// Call this function whenever you want to update the total price display
updateTotalPrice();

// click the quantity the button left right in shopping cart to reduce or add the quantity
listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if (positionClick.classList.contains('plus')){
            type = 'plus'; 
        }
        changeQuantity(product_id, type);
    }
})

//this one is for the the button left and right in shopping cart, if you reduce the product until 0, it will remove form list.
const changeQuantity = (product_id, type) => {
    let positionItemInCart = carts.findIndex((value) => value.product_id == product_id);
    if(positionItemInCart >= 0){
        switch (type){
            case 'plus':
                carts[positionItemInCart].quantity = carts[positionItemInCart].quantity + 1 ;
                break;
            default:
                let valueChange = carts[positionItemInCart].quantity - 1 ;
                if(valueChange > 0){
                    carts[positionItemInCart].quantity = valueChange;
                }else{
                    carts.splice(positionItemInCart, 1);
                }
                break;
        }
    }
   // addCartToMemory();
    addCartToHTML();
    updateTotalPrice();
}
const initApp = () => {
    //get the data from json
    fetch('Product Sofa.Json')
        .then(response => response.json())
        .then(data => {
            listProducts = data;
            addDataToHTML();

            //get cart from memory
            if(localStorage.getItem('cart')){
                carts = JSON.parse(localStorage.getItem('cart'));
                addCartToHTML();
            }
        })
}
initApp();

