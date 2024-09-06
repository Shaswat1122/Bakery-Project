
let navbar = document.querySelector('.navbar');
document.querySelector('#menu-bar').onclick=() =>{
    navbar.classList.toggle('active');
}



let search = document.querySelector('.search');
document.querySelector('#search').onclick=() =>{
    search.classList.toggle('active');
}


// var swiper = new Swiper(".blogs-row", {
//     spaceBetween: 30,
//     loop:true,
//     centeredSlides:true,
//     autoplay:{
//         delay:5000,
//         disableOnInteraction:false,
//     },
//     pagination: {
//       el: ".swiper-pagination",
//       clickable: true,
//     },
//     navigation:{
//         nextE1 :".swiper-button-next",
//         prevE1 :".swiper-button-prev",
//     },
//     breakpoints: {
//       0: {
//         slidesPerView: 1,
//       },
//       768: {
//         slidesPerView: 1,
//       },
//       1024: {
//         slidesPerView: 1,
//       },
//     },
//   });

  

  const buttons = document.querySelectorAll('.nav-button');
  const itemsContainer = document.getElementById('items-container');
  const clearButton = document.getElementById('clear-cart');
  const cartCount = document.getElementById('cart-count');
  const totalPriceElement = document.getElementById('total-price');
  const searchInput = document.getElementById('search');
  const cart_h2 = document.getElementById('cart-opendiv');
  const closecart = document.getElementById('close-cart');

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let allItems = JSON.parse(localStorage.getItem('allItems')) || [];

  const searchItems = (() => {
    const searchItemsCache = {};

    return (text) => {
      const cacheKey = text.toLowerCase();

      if (cacheKey in searchItemsCache) {
        renderItems(searchItemsCache[cacheKey]);
        return;
      }

      const filteredItems = text
        ? allItems.filter(item => item.name.toLowerCase().includes(cacheKey))
        : allItems;

      searchItemsCache[cacheKey] = filteredItems;
      renderItems(filteredItems);
    };
  })();

  const updateCartInfo = () => {
    const totalItems = cart.length;
    const totalPrice = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);
    cart_h2.innerHTML = `
    <span class="material-symbols-outlined" id="cart-open">shopping_cart</span>
    <span>${totalItems} items - $${totalPrice.toFixed(2)}</span>
`;

    cartCount.textContent = totalItems;
    totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
  };

  const addToCart = (item) => {
    const existingItemIndex = cart.findIndex(cartItem => cartItem.name === item.name);

    if (existingItemIndex > -1) {
        // If item already exists, increase quantity
        cart[existingItemIndex].quantity += 1;
    } else {
        // Otherwise, add new item with quantity 1
        cart.push({ ...item, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartInfo();
    renderCartItems(); // Re-render the cart items after adding
};

  

const renderCartItems = () => {
  const cartContainer = document.getElementById('product-row');
  cartContainer.innerHTML = ''; // Clear the container before rendering

  if (cart.length === 0) {
      cartContainer.innerHTML = '<p>No items found.</p>';
      return;
  }

  // Loop through the cart items and create elements for each one
  cart.forEach((item, index) => {
      const itemElement = document.createElement('div');
      itemElement.classList.add('box');

      const name = document.createElement('h3');
      name.textContent = item.name;
      itemElement.appendChild(name);

      const price = document.createElement('p');
      price.textContent = `Price - $${item.price} x ${item.quantity}`;
      itemElement.appendChild(price);

      // Optionally add a remove button for each cart item
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.addEventListener('click', () => removeFromCart(index));
      itemElement.appendChild(removeButton);

      // Append the item element to the cart container
      cartContainer.appendChild(itemElement);
  });
};

const removeFromCart = (index) => {
  if (cart[index].quantity > 1) {
      // Decrease quantity if more than 1
      cart[index].quantity -= 1;
  } else {
      // Remove item if quantity is 1
      cart.splice(index, 1);
  }
  
  localStorage.setItem('cart', JSON.stringify(cart)); // Update local storage
  updateCartInfo(); // Update cart info display
  renderCartItems(); // Re-render the cart items
};



  const renderItems = (items) => {
    const itemsContainer = document.getElementById('product-row');
    itemsContainer.innerHTML = ''; // Clear the container before rendering

    // Ensure you have an element with id="product-row"

// Iterate over items to create the necessary HTML structure
for (const item of items) {
  // Create the main container div for each item
  const itemElement = document.createElement('div');
  itemElement.classList.add('box');

  // Create and add the image container
  const imageContainer = document.createElement('div');
  imageContainer.classList.add('img');
  const image = document.createElement('img');
  image.src = item.image;
  image.alt = ''; // You might want to set alt text for accessibility
  imageContainer.appendChild(image);
  itemElement.appendChild(imageContainer);

  // Create and add the product content container
  const productContent = document.createElement('div');
  productContent.classList.add('product-content');

  const name = document.createElement('h3');
  name.textContent = item.name;
  productContent.appendChild(name);

  const description = document.createElement('p');
  description.textContent = item.description; // Assuming item.description exists
  productContent.appendChild(description);

  const price = document.createElement('p');
  price.textContent = `Price - $${item.price}`;
  productContent.appendChild(price);

  // Create and add the Add to Cart button
  const addToCartButtonContainer = document.createElement('div');
  addToCartButtonContainer.classList.add('orderNow');
  const addToCartButton = document.createElement('button');
  addToCartButton.textContent = 'Add to Cart';
  addToCartButton.addEventListener('click', () => addToCart(item));
  addToCartButtonContainer.appendChild(addToCartButton);
  productContent.appendChild(addToCartButtonContainer);

  itemElement.appendChild(productContent);

  // Append the item element to the items container
  itemsContainer.appendChild(itemElement);
}

  };

  if (cart_h2) {
    cart_h2.addEventListener('click', () => {
      const cartModal = document.getElementById('cart-info');

      if (cartModal.style.display === 'none' || !cartModal.style.display) {
        cartModal.classList.add('show');
        cartModal.style.display = 'flex';
      } else {
        cartModal.style.display = 'none';
        cartModal.classList.remove('show');
      }
    });
  }

  if (closecart) {
    closecart.addEventListener('click', () => {
      const cartModal = document.getElementById('cart-info');
      cartModal.style.display = 'none';
      cartModal.classList.remove('show');
    });
  }

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      const category = button.getAttribute('data-category');
      const filteredItems = category !== 'all' ? allItems.filter(item => item.category === category) : allItems;
      renderItems(filteredItems);
    });
  });

  // clearButton.addEventListener('click', () => {
  //   cart = [];
  //   localStorage.setItem('cart', JSON.stringify(cart));
  //   updateCartInfo();
  //   renderCartItems(); // Clear the cart items from display
  // });

  searchInput.addEventListener('input', (e) => {
    searchItems(e.target.value);
  });

  searchItems(''); // Initial render of all items
  updateCartInfo(); // Initial update of cart info
  renderCartItems();