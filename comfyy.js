const items = [
  {
    sys: { id: '1' },
    fields: {
      title: 'queen panel bed',
      price: 40.99,
      image: { fields: { file: { url: './images/product-1.jpeg' } } },
    },
  },
  {
    sys: { id: '2' },
    fields: {
      title: 'king panel bed',
      price: 12.99,
      image: { fields: { file: { url: './images/product-2.jpeg' } } },
    },
  },
  {
    sys: { id: '3' },
    fields: {
      title: 'single panel bed',
      price: 12.99,
      image: { fields: { file: { url: './images/product-3.jpeg' } } },
    },
  },
  {
    sys: { id: '4' },
    fields: {
      title: 'twin panel bed',
      price: 22.99,
      image: { fields: { file: { url: './images/product-4.jpeg' } } },
    },
  },
  {
    sys: { id: '5' },
    fields: {
      title: 'fridge',
      price: 88.99,
      image: { fields: { file: { url: './images/product-5.jpeg' } } },
    },
  },
  {
    sys: { id: '6' },
    fields: {
      title: 'dresser',
      price: 32.99,
      image: { fields: { file: { url: './images/product-6.jpeg' } } },
    },
  },
  {
    sys: { id: '7' },
    fields: {
      title: 'couch',
      price: 45.99,
      image: { fields: { file: { url: './images/product-7.jpeg' } } },
    },
  },
  {
    sys: { id: '8' },
    fields: {
      title: 'table',
      price: 33.99,
      image: { fields: { file: { url: './images/product-8.jpeg' } } },
    },
  },
];
const cartBtn = document.querySelector('.cart-btn');
const closeCartBtn = document.querySelector('.close-cart');
const clearCartBtn = document.querySelector('.clear-cart');
const cartDOM = document.querySelector('.cart');
const cartOverlay = document.querySelector('.cart-overlay');
let cartItems = document.querySelector('.cart-items');
let cartTotal = document.querySelector('.cart-total');
let cartContent = document.querySelector('.cart-content');
const productsDOM = document.querySelector('.products-center');
function getProduct() {
  let product = items.map((item) => {
    const { title, price } = item.fields;
    const { id } = item.sys;
    const image = item.fields.image.fields.file.url;
    // console.log(title, image, price, id);
    return { title, image, price, id };
  });
  console.log(cart);
  return product;
}
let cart = [];
let btnDOM = [];

function showProduct() {
  let products = getProduct();
  Storage.saveToLocalStorage(products);
  let result = '';
  products.forEach((product) => {
    // console.log(product);
    const { title, image, price, id } = product;
    result += `<!-- single product -->
    <article class="product">
                <div class="img-container">
                    <img src=${image} alt="product" class="product-img">
                    <button class="bag-btn" data-id=${id}>
                        <i class="fas fa-shopping-cart"></i>
                        add to Cart
                    </button>
                </div>
                <h3>${title}</h3>
                <h4>$${price}</h4>
            </article>
             <!-- end of single product -->`;
    productsDOM.innerHTML = result;
  });
}
class Storage {
  static saveToLocalStorage(product) {
    localStorage.setItem('comfyy', JSON.stringify(product));
  }
  static getFromLocalStorage(id) {
    let get = JSON.parse(localStorage.getItem('comfyy'));
    return get.find((g) => g.id === id);
  }
  static saveToCart(carts) {
    localStorage.setItem('fCarts', JSON.stringify(carts));
  }
  static getFromCart() {
    return localStorage.getItem('fCarts')
      ? JSON.parse(localStorage.getItem('fCarts'))
      : [];
  }
}
function solveCarts(save) {
  let itemAmount = 0;
  let viewedAmount = 0;
  save.forEach((val) => {
    itemAmount += val.price * val.amount;
    viewedAmount += val.amount;
  });
  cartTotal.innerText = parseFloat(itemAmount.toFixed(2));
  cartItems.innerText = viewedAmount;
}
function makeCart(cart) {
  const { title, price, id, image, amount } = cart;
  const div = document.createElement('div');
  div.classList.add('cart-item');
  div.innerHTML = ` <img src=${image} alt="product" srcset="">
                    <div>
                        <h4>${title}</h4>
                        <h5>$${price}</h5>
                        <span class="remove-item" data-id=${id}>remove</span>
                    </div>
                     <div>
                        <i class="fas fa-chevron-up" data-id=${id}></i>
                        <p class="item-amount">${amount}</p>
                        <i class="fas fa-chevron-down" data-id=${id}></i>
                    </div>`;

  cartContent.appendChild(div);
}
function showCart() {
  cartOverlay.classList.add('transparentBcg');
  cartDOM.classList.add('showCart');
}
function hideCart() {
  cartOverlay.classList.remove('transparentBcg');
  cartDOM.classList.remove('showCart');
}
function removeItem(id) {
  let savedCart = Storage.getFromCart();
  savedCart = savedCart.filter((save) => save.id !== id);
  Storage.saveToCart(savedCart);
  solveCarts(savedCart);
  let button = getSingleBtn(id);
  button.disabled = false;
  button.innerHTML = `<i class="fas fa-shopping-cart"></i>
                    add to Cart`;
}
function getSingleBtn(id) {
  return btnDOM.find((btn) => btn.dataset.id === id);
}
function cartLogic() {
  cart = Storage.getFromCart();
  solveCarts(cart);
  cart.forEach((c) => makeCart(c));
}
function buttonLogic() {
  const btns = [...document.querySelectorAll('.bag-btn')];
  btnDOM = btns;
  btns.forEach((btn) => {
    const id = btn.dataset.id;
    let inCart = cart.find((item) => item.id === id);
    if (inCart) {
      btn.innerText = 'In Cart';
      btn.disabled = true;
    }
    btn.addEventListener('click', function (fr) {
      fr.currentTarget.innerText = 'In Cart';
      btn.disabled = true;
      console.log(id);
      let cartItem = { ...Storage.getFromLocalStorage(id), amount: 1 };
      cart = [...cart, cartItem];
      console.log(cart);
      Storage.saveToCart(cart);
      solveCarts(cart);
      makeCart(cartItem);
      showCart();
    });
  });
}
function itemLogic() {
  const items = [...document.querySelectorAll('.cart-item')];
  console.log(items);
  items.forEach((item) => {
    item.addEventListener('click', function (e) {
      const tar = e.target;
      const id = tar.dataset.id;
      if (tar.classList.contains('remove-item')) {
        const parent = tar.parentElement.parentElement;
        cartContent.removeChild(parent);
        removeItem(id);
      } else if (tar.classList.contains('fa-chevron-up')) {
        let item = cart.find((c) => c.id === id);
        item.amount += 1;
        Storage.saveToCart(cart);
        solveCarts(cart);
        tar.nextElementSibling.innerText = item.amount;
      } else if (tar.classList.contains('fa-chevron-down')) {
        let item = cart.find((c) => c.id === id);
        item.amount = item.amount - 1;
        if (item.amount > 0) {
          Storage.saveToCart(cart);
          solveCarts(cart);
          tar.previousElementSibling.innerText = item.amount;
        } else {
          const parent = tar.parentElement.parentElement;
          cartContent.removeChild(parent);
          removeItem(id);
        }
      }
    });
  });
  cartBtn.addEventListener('click', showCart);
  const cartClose = document.querySelector('.fa-window-close');
  cartClose.addEventListener('click', hideCart);
}
function clearAll() {
  let cartItems = cart.map((item) => item.id);
  cartItems.forEach((id) => removeItem(id));
  if (cartContent.children.length > 0) {
    let c = [...cartContent.children];
    c.forEach((child) => cartContent.removeChild(child));
  }
  hideCart();
}
document.addEventListener('DOMContentLoaded', function () {
  showProduct();
  cart = Storage.getFromCart();
  console.log(cart);
  solveCarts(cart);
  cart.forEach((c) => makeCart(c));
  const btns = [...document.querySelectorAll('.bag-btn')];
  btnDOM = btns;
  btns.forEach((btn) => {
    const id = btn.dataset.id;
    let inCart = cart.find((item) => item.id === id);
    if (inCart) {
      btn.innerText = 'In Cart';
      btn.disabled = true;
    }
    btn.addEventListener('click', function (fr) {
      fr.currentTarget.innerText = 'In Cart';
      btn.disabled = true;
      // console.log(id);
      console.log(cart);
      let cartItem = { ...Storage.getFromLocalStorage(id), amount: 1 };
      cart = [...cart, cartItem];
      console.log(cart);
      Storage.saveToCart(cart);
      solveCarts(cart);
      makeCart(cartItem);
      showCart();
    });
  });
  cartContent.addEventListener('click', function (e) {
    console.log(cart);
    const tar = e.target;
    const id = tar.dataset.id;
    if (tar.classList.contains('remove-item')) {
      const parent = tar.parentElement.parentElement;
      cartContent.removeChild(parent);
      removeItem(id);
    } else if (tar.classList.contains('fa-chevron-up')) {
      let item = cart.find((c) => c.id === id);
      item.amount += 1;
      Storage.saveToCart(cart);
      solveCarts(cart);
      tar.nextElementSibling.innerText = item.amount;
    } else if (tar.classList.contains('fa-chevron-down')) {
      let item = cart.find((c) => c.id === id);
      item.amount = item.amount - 1;
      if (item.amount > 0) {
        Storage.saveToCart(cart);
        solveCarts(cart);
        tar.previousElementSibling.innerText = item.amount;
      } else {
        const parent = tar.parentElement.parentElement;
        cartContent.removeChild(parent);
        removeItem(id);
      }
    }
  });
  cartBtn.addEventListener('click', showCart);
  const cartClose = document.querySelector('.fa-window-close');
  cartClose.addEventListener('click', hideCart);
  clearCartBtn.addEventListener('click', clearAll);
});
