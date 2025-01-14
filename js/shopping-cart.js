let productsInCart = JSON.parse(localStorage.getItem("shoppingCart"));
if (!productsInCart) {
  productsInCart = [];
}
const parentElement = document.querySelector("#buyItems");
const cartSumPrice = document.querySelector("#sum-prices");
const products = document.querySelectorAll(".product-under");

const countTheSumPrice = function () {
  // 4
  let sum = 0;
  productsInCart.forEach((item) => {
    sum += item.price;
  });
  return sum;
};

const updateShoppingCartHTML = function () {
  // 3
  localStorage.setItem("shoppingCart", JSON.stringify(productsInCart));
  if (productsInCart.length > 0) {
    let result = productsInCart.map((product) => {
      return `
				<li class="buyItem">
					<img src="${product.image}">
					<div>
						<h5>${product.name}</h5>
						<h6>$${product.price}</h6>
						<div>
							<button class="button-minus" data-id=${product.id}>-</button>
							<span class="countOfProduct">${product.count}</span>
							<button class="button-plus" data-id=${product.id}>+</button>
						</div>
					</div>
				</li>`;
    });
    parentElement.innerHTML = result.join("");
    document.querySelector(".checkout").classList.remove("hidden");
    cartSumPrice.innerHTML = "$" + countTheSumPrice();
  } else {
    document.querySelector(".checkout").classList.add("hidden");
    parentElement.innerHTML =
      '<h4 class="empty">Your shopping cart is empty</h4>';
    cartSumPrice.innerHTML = "";
  }
};

function updateProductsInCart(product) {
  // 2
  for (let i = 0; i < productsInCart.length; i++) {
    if (productsInCart[i].id == product.id) {
      productsInCart[i].count += 1;
      productsInCart[i].price =
        productsInCart[i].basePrice * productsInCart[i].count;
      return;
    }
  }
  productsInCart.push(product);
}

products.forEach((item) => {
  // 1
  item.addEventListener("click", (e) => {
    if (e.target.classList.contains("addToCart")) {
      const productID = e.target.dataset.productId;
      const productName = item.querySelector(".productName").innerHTML;
      const productPrice = item.querySelector(".priceValue").innerHTML;
      const productImage = item.querySelector("img").src;
      let product = {
        name: productName,
        image: productImage,
        id: productID,
        count: 1,
        price: +productPrice,
        basePrice: +productPrice,
      };
      updateProductsInCart(product);
      updateShoppingCartHTML();
    }
  });
});

parentElement.addEventListener("click", (e) => {
  // Last
  const isPlusButton = e.target.classList.contains("button-plus");
  const isMinusButton = e.target.classList.contains("button-minus");
  if (isPlusButton || isMinusButton) {
    for (let i = 0; i < productsInCart.length; i++) {
      if (productsInCart[i].id == e.target.dataset.id) {
        if (isPlusButton) {
          productsInCart[i].count += 1;
        } else if (isMinusButton) {
          productsInCart[i].count -= 1;
        }
        productsInCart[i].price =
          productsInCart[i].basePrice * productsInCart[i].count;
      }
      if (productsInCart[i].count <= 0) {
        productsInCart.splice(i, 1);
      }
    }
    updateShoppingCartHTML();
  }
});

updateShoppingCartHTML();
const checkoutButton = document.querySelector("#checkoutButton");
checkoutButton.addEventListener("click", generateReceipt);
 

function generateReceipt() {
  const receiptWindow = window.open();

  let receiptHTML = `
  <style>
  .body { 
	background-color: black;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
  }
  
  .receipt-container {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
  }
  
  .receipt-box {
	border: 1px solid #ccc;
	padding: 20px;
	font-family: Arial, sans-serif;
	background-color: white;
  }
  
  .receipt-box h2 {
	margin-top: 0;
	margin-bottom: 10px;
  }
  
  .receipt-box ul {
	list-style-type: none;
	padding: 0;
	margin: 0;
  }
  
  .receipt-box li {
	margin-bottom: 5px;
  }
  </style>
  <div class="body">
	<div class="receipt-container">
	  <div class="receipt-box">
		<h2>Receipt</h2>
		<ul>`;

  // Rest of the code remains the same

  productsInCart.forEach((product) => {
    receiptHTML += `<li>${product.name} - $${product.price.toFixed(2)}</li>`;
  });

  receiptHTML += `
      </ul>
    </div>`;

  // Set the receipt HTML as the content of the new window or tab
  receiptWindow.document.body.innerHTML = receiptHTML;
}

function closeCart() {
  const cart = document.querySelector(".producstOnCart");
  cart.classList.toggle("hide");
  document.querySelector("body").classList.toggle("stopScrolling");
}

const openShopCart = document.querySelector(".shoppingCartButton");
openShopCart.addEventListener("click", () => {
  const cart = document.querySelector(".producstOnCart");
  cart.classList.toggle("hide");
  document.querySelector("body").classList.toggle("stopScrolling");
});

const closeShopCart = document.querySelector("#closeButton");
const overlay = document.querySelector(".overlay");
closeShopCart.addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);

// Header
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  header.classList.toggle("shadow", window.scrollY > 0);
});
