let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

//click the icon shopcar will come out
openShopping.addEventListener('click',()=>{
    body.classList.add('active');
})
//click the close will close
closeShopping.addEventListener('click',()=>{
    body.classList.remove('active');
})

let product = [
    {
        id:1,
        name: '2 Door Sliding Wadrode',
        image: 'Cabinat/1)2 Door Sliding Wadrode.webp',
        price: 600
    },
    {
        id:2,
        name: '2 Door Wadrode',
        image: 'Cabinat/1)2 Door Wadrode.jpg',
        price: 699
    },
    {
        id:3,
        name: 'Display  cabinet',
        image: 'Cabinat/1)Display  cabinet.jpeg',
        price: 899
    },
    {
        id:4,
        name: 'Display wall - mounted cabinet',
        image: 'Cabinat/1)Display wall - mounted cabinet.jpeg',
        price: 1050
    },
    {
        id:5,
        name: 'Multi Cabinat',
        image: 'Cabinat/1)Multi Cabinat.webp',
        price: 500
    },
    {
        id:6,
        name: 'Shoe cabinet with drawer',
        image: 'Cabinat/1)Shoe cabinet with drawer.webp',
        price: 399
    },
    {
        id:7,
        name: 'Sliding Barn Door Accent Cabinet, Buffet Cabinet Storage Table for Bathroom and home kitchen',
        image: 'Cabinat/1)Sliding Barn Door Accent Cabinet, Buffet Cabinet Storage Table for Bathroom and home kitchen.webp',
        price: 499
    },
    {
        id:8,
        name: 'TV Cabinet',
        image: 'Cabinat/1)TV Cabinet.webp',
        price: 359
    },
    {
        id:9,
        name: 'Wall - mounted cabinet',
        image: 'logo 家具.png',
        price: 700
    }
];
let listCards = [];
function initApp(){
    product.forEach((value,key)=>{
        let newDiv = document.createElement('div');
        newDiv.innerHTML = `
            <img src = "image/${value.image}"/>
            <div class="title">${value.name}</div>
            <div class = "price">${value.price.toLocaleString()}</div>
            <button onclick = "addToCard(${key})">Add To Card</button>
        `;
        list.appendChild(newDiv);
    })
}

/*Shopping Car*/
.shopping img{
    width: 33px;
  
  }
  
  .shopping span{
    background-color: red;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    position: absolute;
    top: 5px;
    left: 95%;
    font-size: 60%;
    padding:3px 10px;
  }
  
  .list{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 20px;
    row-gap: 20px;
    margin-top: 50px;
  }
  
  .card{
    position: fixed;
    top: 0;
    left: 100%;
    width: 500px;
    background-color:#340000 ;
    height: 100vh;
    transition: 0.5s;
  }
  
  .card h1{
    color: #eeb161;
    font-weight: 100;
    margin: 0;
    padding: 0 20px;
    height: 80px;
    display: flex;
    align-items: center;
  }
  
  .card .checkOut{
    position: absolute;
    bottom: 0;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2,1fr);
  }
  /*button*/
  .card .checkOut div{
    background-color: #ebd751;
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    cursor: pointer;
  }
  
  .card .checkOut div:nth-child(2){
    background-color: #454545;
    color: #ffffff;
  }
  
  .active .card{
    left:calc(100% - 500px);
  }
  
  .active .w3-container {
    transform: translateX(-200px);
  }

  <div class="shopping">
  <img src="shoppingcart_80945.svg"><span id="quantity">0</span>
</div>
<div class="list"></div>

<div class="card">
                    <h1>Card</h1>
                    <ul class="listCard"></ul>
                    <div class="checkOut">
                        <div class="total">0</div>
                        <div class="closeShopping">Close</div>
                    </div>